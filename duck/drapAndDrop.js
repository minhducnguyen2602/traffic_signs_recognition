let dropArea = document.querySelector('.input-area');
let dropImage = document.querySelector('.input-image');
let file;

// If user Drap File Over DropArea
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add('active');
})

// If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove('active');
})

// If user drop File on DropArea
dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    // getting user select file and [0] this mean if user select multiple files then we'll select only the first one
    file = e.dataTransfer.files[0]
    let fileType = file.type

    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]
    if (validExtensions.includes(fileType)) {
        dropArea.style.display = "none"
        console.log("fileType")
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
            inputArea.style.display = "none";
        }
        
    }
    else {
        alert("This is not an image file")
        dropArea.classList.remove('active');
    }
})

dropImage.addEventListener("drop", (e) => {
    e.preventDefault();
    // getting user select file and [0] this mean if user select multiple files then we'll select only the first one
    file = e.dataTransfer.files[0]
    let fileType = file.type

    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]
    if (validExtensions.includes(fileType)) {
        dropArea.style.display = "none"
        console.log("fileType")
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
            inputArea.style.display = "none";
        }
        
    }
    else {
        alert("This is not an image file")
        dropArea.classList.remove('active');
    }
})