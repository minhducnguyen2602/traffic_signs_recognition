url = "http://127.0.0.1:5000/"
document.addEventListener("DOMContentLoaded", function () {
  var imageUpload = document.getElementById("imageUpload");
  var preview = document.getElementById("preview");
  var predictButton = document.getElementById("predictButton");
  var predictionImage = document.getElementById("predictionImage");

  imageUpload.addEventListener("change", function () {
    var file = imageUpload.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  predictButton.addEventListener("click", function () {
    var file = imageUpload.files[0];
    var formData = new FormData();
    formData.append("file", file);
  
    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {

        if (result.cacheKey) {
          // Tạo URL đầy đủ cho ảnh
          var imageUrl =  'data:image/png;base64,' + result.encodedImage;
          // Cập nhật thuộc tính src của phần tử predictionImage
          predictionImage.src = imageUrl;
          predictionImage.width = auto;
          predictionImage.height = auto;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  });
  
});
