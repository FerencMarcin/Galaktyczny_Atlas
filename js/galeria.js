var dest1 = document.querySelector("#galeria_ksiezyc");
var dest2 = document.querySelector("#galeria_niebo");
var dest3 = document.querySelector("#galeria_zorza");
var dest4 = document.querySelector("#galeria_ziemia");

function addGallery(destination, size, topic) {
  for (let index = 1; index <= size; index++) {
    var obj = document.createElement("div");
    obj.classList.add(
      "col-xxl-2",
      "col-xl-3",
      "col-lg-4",
      "col-md-5",
      "col-sm-9",
      "mb-3",
      "px-5",
      "px-sm-2"
    );
    var zdj = document.createElement("div");
    zdj.classList.add("galleryObj");
    var linkToImg = document.createElement("a");
    linkToImg.setAttribute("data-fslightbox", "galeria_" + topic);
    linkToImg.setAttribute("href", "assets/img/galeria/" + topic + index + ".jpg");
    linkToImg.setAttribute("data-alt", "Zdjęcie " + topic + index);
    var img = document.createElement("img");
    img.classList.add("rounded");
    img.setAttribute(
      "src",
      "assets/img/miniaturki/min_" + topic + index + ".jpg"
    );
    img.setAttribute("alt", topic + index);
    linkToImg.appendChild(img);
    zdj.appendChild(linkToImg);
    obj.appendChild(zdj);
    destination.appendChild(obj);
  }
}
addGallery(dest1, 5, "ksiezyc");
addGallery(dest2, 5, "niebo");
addGallery(dest3, 5, "zorza");
addGallery(dest4, 4, "ziemia");

// var obj = document.createElement("div");
// obj.classList.add(
//   "col-xxl-2",
//   "col-xl-3",
//   "col-lg-4",
//   "col-md-5",
//   "col-sm-9",
//   "mb-3",
//   "px-5",
//   "px-sm-2"
// );
// var zdj = document.createElement("div");
// zdj.classList.add("galleryObj");
// var link = document.createElement("a");
// link.setAttribute("data-fslightbox", "galeriaKsiezyc");
// link.setAttribute("href", "/assets/img/galeria/ksiezyc2.jpg");
// link.setAttribute("data-alt", "Zdjęcie księżyc 2");
// var img = document.createElement("img");
// img.classList.add("rounded");
// img.setAttribute("src", "/assets/img/miniaturki/min_ksiezyc2.jpg");
// img.setAttribute("alt", "księżyc 2");
// link.appendChild(img);
// zdj.appendChild(link);
// obj.appendChild(zdj);
// dest1.appendChild(obj);
