let projectData = [];
let projecturl = window.location.search.slice(1);
let lang;

window.onload = () => {
  // fetch("data.json")
  //   .then((response) => response.json())
  //   .then((data) => {
  // filter for category
  projectData = data.filter((project) => project.url == projecturl)[0];
  lang = localStorage.getItem("lang") || "es";

  if (lang == "en") {
    document.getElementById("film_menutag").innerHTML = "Film";
    document.getElementById("photo_menutag").innerHTML = "Photography";
  } else {
    document.getElementById("film_menutag").innerHTML = "Cinematografía";
    document.getElementById("photo_menutag").innerHTML = "Fotografía";
  }

  loadContent(lang);
  // });
};

function loadContent(lang) {
  //
  // put header img
  let headerdiv = document.getElementById("projectheader");
  if (projectData.banner == "" || projectData.banner == " ") {
    headerdiv.style.display = "none";
  }
  headerdiv.innerHTML = `
  <img src="${projectData.folder + projectData.banner}" />`;
  //
  // put title
  let titlediv = document.getElementById("projecttitle");
  if (lang == "en") {
    if (projectData.title == "" || projectData.title == " ") {
      titlediv.style.display = "none";
    }
    titlediv.innerHTML = `<p>${projectData.title}</p>`;
  } else {
    if (projectData.title_es != "" && projectData.title_es != undefined) {
      titlediv.innerHTML = `<p>${projectData.title_es}</p>`;
    } else {
      titlediv.innerHTML = `<p>${projectData.title}</p>`;
    }
  }
  //
  // put year
  let yeardiv = document.getElementById("projectyear");
  if (projectData.year == "" || projectData.year == " ") {
    yeardiv.style.display = "none";
  }
  yeardiv.innerHTML = `<p>${projectData.year}</p>`;
  //
  // put tags
  let tagsdiv = document.getElementById("projecttags");

  if (projectData.tags.length > 0 && projectData.tags.length != undefined) {
    let code = "";
    projectData.tags.forEach((pair) => {
      if (lang == "en") {
        if (pair.en !== "" && pair.en !== " ") {
          code =
            code +
            `<div class="proj-singletag"><a href="/index.html?${pair.en
              .replace(/\s/g, "")
              .toLowerCase()}">${pair.en}</a></div>`;
        }
      } else {
        if (pair.es !== "" && pair.es !== " ") {
          code =
            code +
            `<div class="proj-singletag"><a href="/index.html?${pair.es
              .replace(/\s/g, "")
              .toLowerCase()}">${pair.es}</a></div>`;
        }
      }
    });
    tagsdiv.innerHTML = code;
  }

  // put genre (opt)
  let genrediv = document.getElementById("projectgenre");
  if (lang == "en") {
    if (projectData.genre == "" || projectData.genre == " ") {
      genrediv.style.display = "none";
    } else {
      genrediv.style.display = "block";
      genrediv.innerHTML = `<p>${projectData.genre}</p>`;
    }
  } else {
    if (projectData.genre_es == "" || projectData.genre_es == " ") {
      if (projectData.genre == "" || projectData.genre == " ") {
        genrediv.style.display = "none";
      } else {
        genrediv.style.display = "block";
        genrediv.innerHTML = `<p>${projectData.genre}</p>`;
      }
    } else {
      genrediv.style.display = "block";
      genrediv.innerHTML = `<p>${projectData.genre_es}</p>`;
    }
  }

  // put length
  let lengthdiv = document.getElementById("projectlength");
  if (projectData.length == "" || projectData.length == " ") {
    lengthdiv.style.display = "none";
  }
  lengthdiv.innerHTML = `<p>${projectData.length}</p>`;
  // put description
  let descdiv = document.getElementById("projectdesc");
  if (lang == "en") {
    if (projectData.desc == "" || projectData.desc == " ") {
      descdiv.style.display = "none";
    } else {
      descdiv.style.display = "block";
      descdiv.innerHTML = `<p>${projectData.desc}</p>`;
    }
  } else {
    if (projectData.desc_es == "" || projectData.desc_es == " ") {
      if (projectData.desc == "" || projectData.desc == " ") {
        descdiv.style.display = "none";
      } else {
        descdiv.style.display = "block";
        descdiv.innerHTML = `<p>${projectData.desc}</p>`;
      }
    } else {
      descdiv.style.display = "block";
      descdiv.innerHTML = `<p>${projectData.desc_es}</p>`;
    }
  }
  // put images
  let imgsdiv = document.getElementById("projectimgs");
  if (projectData.img.length > 0 && projectData.img.length != undefined) {
    let columnnr = "";
    for (let i = 0; i < projectData.columnnr; i++) {
      columnnr = columnnr + "1fr ";
    }
    imgsdiv.style["grid-template-columns"] = columnnr;
    console.log(columnnr);
    let code = "";
    projectData.img.forEach((img) => {
      if (img !== "" && img !== " ") {
        code =
          code +
          `<div class="proj-singleimg"><img src="${
            projectData.folder + img
          }"/></div>`;
      }
    });
    imgsdiv.innerHTML = code;
  }
  // put video
  let videodiv = document.getElementById("projectvid");
  if (projectData.video.length > 0 && projectData.video.length != undefined) {
    let code = "";
    if (
      projectData.video[0] == "youtube" ||
      projectData.video[0] == "Youtube"
    ) {
      code = `<iframe style="aspect-ratio: ${projectData.video[1]};" src=${projectData.video[2]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    } else if (
      projectData.video[0] == "vimeo" ||
      projectData.video[0] == "Vimeo"
    ) {
      code = `<iframe style="aspect-ratio: ${projectData.video[1]};" title="vimeo-player" src=${projectData.video[2]} frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>`;
    } else if (
      projectData.video[0] == "drive" ||
      projectData.video[0] == "Drive"
    ) {
      code = `<iframe style="aspect-ratio: ${projectData.video[1]};" src=${projectData.video[2]} title = "Google Drive video player"></iframe>`;
    }

    videodiv.innerHTML = code;
  }
}

function changeLang(language) {
  lang = language;
  localStorage.setItem("lang", language);
  loadContent(language);

  if (lang == "en") {
    document.getElementById("film_menutag").innerHTML = "Film";
    document.getElementById("photo_menutag").innerHTML = "Photography";
  } else {
    document.getElementById("film_menutag").innerHTML = "Cinematografía";
    document.getElementById("photo_menutag").innerHTML = "Fotografía";
  }
}
