document.addEventListener("DOMContentLoaded", function () {
  btn_us.addEventListener(
    "click",
    () => {
      fetch("dane/su.txt")
        .then((response) => {
          return response.text();
        })
        .then((article) => {
          trescArtykulu.innerHTML = article;
        });
    },
    false
  );

  btn_slonce.addEventListener(
    "click",
    () => {
      fetch("dane/slonce.txt")
        .then((response) => {
          return response.text();
        })
        .then((article) => {
          trescArtykulu.innerHTML = article;
        });
    },
    false
  );

  btn_merkury.addEventListener(
    "click",
    () => {
      fetch("dane/merkury.txt")
        .then((response) => {
          return response.text();
        })
        .then((article) => {
          trescArtykulu.innerHTML = article;
        });
    },
    false
  );

  btn_wenus.addEventListener(
    "click",
    () => {
      fetch("dane/wenus.txt")
        .then((response) => {
          return response.text();
        })
        .then((article) => {
          trescArtykulu.innerHTML = article;
        });
    },
    false
  );

  btn_ziemia.addEventListener(
    "click",
    () => {
      fetch("dane/ziemia.txt")
        .then((response) => {
          return response.text();
        })
        .then((article) => {
          trescArtykulu.innerHTML = article;
        });
    },
    false
  );

  btn_mars.addEventListener(
    "click",
    () => {
      fetch("dane/mars.txt")
        .then((response) => {
          return response.text();
        })
        .then((article) => {
          trescArtykulu.innerHTML = article;
        });
    },
    false
  );

  btn_saturn.addEventListener(
    "click",
    () => {
      fetch("dane/saturn.txt")
        .then((response) => {
          return response.text();
        })
        .then((article) => {
          trescArtykulu.innerHTML = article;
        });
    },
    false
  );

  btn_jowisz.addEventListener(
    "click",
    () => {
      fetch("dane/jowisz.txt")
        .then((response) => {
          return response.text();
        })
        .then((article) => {
          trescArtykulu.innerHTML = article;
        });
    },
    false
  );

  articleSubject.addEventListener(
    "click",
    () => {
      trescArtykulu.innerHTML = "";
    },
    false
  );
});
