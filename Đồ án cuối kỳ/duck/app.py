from flask import Flask, request, jsonify, send_file
from PIL import Image
import io
import base64
from flask_cors import CORS
from ultralytics import YOLO
import numpy as np
import os
import json
from flask_caching import Cache
import cv2
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = "static"

# Cấu hình Flask-Caching
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files["file"]
    img_array = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    model_yolo = YOLO(r"C:\Users\ACER\Desktop\Hoctap\Ki2nam2\Nhandang\Doan\weight\best.pt")
    predicted_label = model_yolo(image)
    predicted_label = predicted_label[0].plot()
    predicted_label = cv2.cvtColor(predicted_label, cv2.COLOR_BGR2RGB)
    predicted_label_image = Image.fromarray(predicted_label)

    # Lưu ảnh vào bộ nhớ cache của Flask
    cache.set('predicted_image', predicted_label_image)

    # Chuyển đổi ảnh thành base64
    buffered = io.BytesIO()
    predicted_label_image.save(buffered, format='PNG')
    encoded_image = base64.b64encode(buffered.getvalue()).decode('utf-8')

    # Trả về tên khóa của ảnh trong bộ nhớ cache và ảnh đã mã hóa base64
    response = {
        "cacheKey": 'predicted_image',
        "encodedImage": encoded_image
    }
    return json.dumps(response)
@app.route('/image/<key>', methods=['GET'])
def get_image(key):
    # Lấy ảnh từ bộ nhớ cache theo tên khóa
    predicted_image = cache.get(key)

    # Kiểm tra xem ảnh có tồn tại trong cache hay không
    if predicted_image is not None:
        # Chuyển đổi ảnh thành dạng bytes
        image_bytes = io.BytesIO()
        predicted_image.save(image_bytes, format='PNG')
        image_bytes.seek(0)

        # Trả về ảnh như là một tệp tin động
        return send_file(image_bytes, mimetype='image/png')
    else:
        return jsonify({'error': 'Image not found in cache'})

if __name__ == '__main__':
    app.run()
