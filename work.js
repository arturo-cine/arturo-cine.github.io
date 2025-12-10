let projectData = [];

let projecturl = window.location.search.slice(1);

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // filter for category
    projectData = data.filter((project) => project.url == projecturl)[0];

    loadContent();
  });

function loadContent() {
  // put header img
  let headerdiv = document.getElementById("projectheader");
  if (projectData.banner == "" || projectData.banner == " ") {
    headerdiv.style.display = "none";
  }
  headerdiv.innerHTML = `
  <img src="${projectData.folder + projectData.banner}" />`;
  // put title
  let titlediv = document.getElementById("projecttitle");
  if (projectData.title == "" || projectData.title == " ") {
    titlediv.style.display = "none";
  }
  titlediv.innerHTML = `<p>${projectData.title}</p>`;
  // put year
  let yeardiv = document.getElementById("projectyear");
  if (projectData.year == "" || projectData.year == " ") {
    yeardiv.style.display = "none";
  }
  yeardiv.innerHTML = `<p>${projectData.year}</p>`;
  // put tags
  let tagsdiv = document.getElementById("projecttags");
  if (projectData.tags.length > 0 && projectData.tags.length != undefined) {
    let code = "";
    projectData.tags.forEach((t) => {
      if (t !== "" && t !== " ") {
        code = code + `<div class="proj-singletag">${t}</div>`;
      }
    });
    tagsdiv.innerHTML = code;
  }

  // put genre (opt)
  let genrediv = document.getElementById("projectgenre");
  if (projectData.genre == "" || projectData.genre == " ") {
    genrediv.style.display = "none";
  }
  genrediv.innerHTML = `<p>${projectData.genre}</p>`;
  // put length
  let lengthdiv = document.getElementById("projectlength");
  if (projectData.length == "" || projectData.length == " ") {
    lengthdiv.style.display = "none";
  }
  lengthdiv.innerHTML = `<p>${projectData.length}</p>`;
  // put description
  let descdiv = document.getElementById("projectdesc");
  if (projectData.desc == "" || projectData.desc == " ") {
    descdiv.style.display = "none";
  }
  descdiv.innerHTML = `<p>${projectData.desc}</p>`;
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
}
