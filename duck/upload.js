url = "http://127.0.0.1:5000/"
document.addEventListener("DOMContentLoaded", function () {
  var imageUpload = document.getElementById("imageUpload");
  var preview = document.getElementById("preview");
  var predictButton = document.getElementById("predictButton");
  var predictionImage = document.getElementById("predictionImage");
  let inputArea = document.querySelector(".input-area");
  let outputArea = document.querySelector(".output-area");

  let dropArea = document.querySelector('.input-area');
  let dropImage = document.querySelector('#preview');

  let filedrop;
  let drop = 0;
  
  imageUpload.addEventListener("change", function () {
    var file = imageUpload.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
      inputArea.style.display = "none";
      drop = 1
    }
  });


  // If user Drap File Over DropArea
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add('active');
  })

  // If user leave dragged File from DropArea
  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove('active');
  })

  dropArea.addEventListener("drop", (e) => {
    console.log("hello")
    e.preventDefault();
    // getting user select file and [0] this mean if user select multiple files then we'll select only the first one
    filedrop = e.dataTransfer.files[0]
    let fileType = filedrop.type

    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]
    if (validExtensions.includes(fileType)) {
      dropArea.style.display = "none"
      console.log("fileType")
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        preview.src = reader.result;
      }, false);

      if (filedrop) {
        reader.readAsDataURL(filedrop);
        inputArea.style.display = "none";
        drop = 2
      }

    }
    else {
      alert("This is not an image file")
      dropArea.classList.remove('active');
    }
  })

  // If user Drap File Over DropArea
  dropImage.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropImage.classList.add('active');
  })

  // If user leave dragged File from DropArea
  dropImage.addEventListener("dragleave", () => {
    dropImage.classList.remove('active');
  })

  dropImage.addEventListener("drop", (e) => {
    console.log("hello")
    e.preventDefault();
    // getting user select file and [0] this mean if user select multiple files then we'll select only the first one
    filedrop = e.dataTransfer.files[0]
    let fileType = filedrop.type

    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]
    if (validExtensions.includes(fileType)) {
      console.log("fileType")
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        preview.src = reader.result;
      }, false);

      if (filedrop) {
        reader.readAsDataURL(filedrop);
        inputArea.style.display = "none";
        drop = 2
      }

    }
    else {
      alert("This is not an image file")
      dropImage.classList.remove('active');
    }
  })

  predictButton.addEventListener("click", function () {
    var file = imageUpload.files[0];
    var formData = new FormData();
    formData.append("file", file);

    var formDataFileDrop = new FormData();
    formDataFileDrop.append("file", filedrop);

    if (drop === 1){
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
            var imageUrl = 'data:image/png;base64,' + result.encodedImage;
            // Cập nhật thuộc tính src của phần tử predictionImage
            predictionImage.src = imageUrl;
            predictionImage.width = auto;
            predictionImage.height = auto;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    if (drop === 2) {
      fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formDataFileDrop
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
  
          if (result.cacheKey) {
            // Tạo URL đầy đủ cho ảnh
            var imageUrl = 'data:image/png;base64,' + result.encodedImage;
            // Cập nhật thuộc tính src của phần tử predictionImage
            predictionImage.src = imageUrl;
            predictionImage.width = auto;
            predictionImage.height = auto;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    outputArea.style.display = 'none';

  });

});
