let projectsData = [];
let alltags = [];
let lang = "es";

window.onload = () => {
  lang = localStorage.getItem("lang") || "es";
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // filter for category
      projectsData = data;

      // make a list of all possible tags (p = project)
      data.forEach((p) => {
        p.tags.forEach((t) => {
          alltags.push(t);
        });
      });

      // check if filtered by tag
      // for (let i = 0; i < alltags.length; i++) {
      //   if (alltags[i] !== "") {
      //     let tag = alltags[i].replace(/\s/g, "");
      //     if (window.location.search == `?${tag.toLowerCase()}`) {
      //       filterByTag(alltags[i]);
      //     }
      //   }
      // }

      // if (window.location.search == "?photography") {
      //   filterPhoto();
      // } else if (window.location.search == "?film") {
      //   filterFilm();
      // } else if (window.location.search == "") {
      //   filterAll();
      // }

      loadUrl();
    });
};

function loadUrl() {
  for (let i = 0; i < alltags.length; i++) {
    if (alltags[i] !== "") {
      let tag = alltags[i].replace(/\s/g, "");
      if (window.location.search == `?${tag.toLowerCase()}`) {
        filterByTag(alltags[i]);
      }
    }
  }

  if (window.location.search == "?photography") {
    filterPhoto();
  } else if (window.location.search == "?film") {
    filterFilm();
  } else if (window.location.search == "") {
    filterAll();
  }
}

function filterAll() {
  loadProjects(projectsData, "");
  history.pushState([projectsData, ""], "", "index.html");
}

// PAGE FILTERS: there is only one page and we filter the content based on if it is a film or photography project

function filterFilm() {
  let filterData = projectsData.filter((project) => project.category == "film");
  //console.log(filterData);

  // const categoryTitle = document.getElementById("categorytitle");
  // categoryTitle.innerHTML = "<p>Film Projects</p>";

  let title = lang == "es" ? "Proyectos Cinematográficos" : "Film Projects";

  loadProjects(filterData, title);
  history.pushState([filterData, title], "", "index.html?film");
}

function filterPhoto() {
  let filterData = projectsData.filter(
    (project) => project.category == "photo"
  );

  let title = lang == "es" ? "Fotografía" : "Photography Projects";

  // const categoryTitle = document.getElementById("categorytitle");
  // categoryTitle.innerHTML = "<p>Photography Projects</p>";

  loadProjects(filterData, title);
  history.pushState([filterData, title], "", "index.html?photography");
}

function filterByTag(tag) {
  let filterData = projectsData.filter((project) => project.tags.includes(tag));

  // const categoryTitle = document.getElementById("categorytitle");
  // categoryTitle.innerHTML = `<p>${tag}</p>`;

  loadProjects(filterData, tag);
  let url = tag.replace(/\s/g, "");
  history.pushState([filterData, tag], "", `index.html?${url.toLowerCase()}`);
}

// PROJECT PAGE: loads html and fills it with data for homepage

function loadProjects(data, title) {
  const categoryTitle = document.getElementById("categorytitle");
  categoryTitle.innerHTML = `<p>${title}</p>`;

  const projectsGallery = document.getElementById("projectsgallery");
  let gallery = "";

  data.forEach((project) => {
    let innerHTML = `
    <div class="gallery-item">
        
        <a href="/project.html?${project.url}">
            <div class="gallery-image">
                <img src=${project.folder + project.cover}
                style="height:100%" />
            </div>
        </a>

     <div class="gallery-item-title">
          <p>${project.title}</p>
      </div>
     </div>
    `;
    gallery = gallery + innerHTML;
  });
  projectsGallery.innerHTML = gallery;
}

window.addEventListener("popstate", (event) => {
  if (event.state) {
    loadProjects(event.state[0], event.state[1]);
  }
});

function changeLang(language) {
  lang = language;
  localStorage.setItem("lang", language);
  loadUrl();
}
