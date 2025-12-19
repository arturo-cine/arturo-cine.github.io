class Lightbox {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.folder;
    this.overlay = null;
    this.init();
  }
  init() {
    this.createOverlay();

    const galleryItems = document.querySelectorAll(".proj-singleimg");

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.open(index);
      });
    });

    this.images = data.find(
      (project) => project.url == window.location.search.slice(1)
    ).img;

    this.folder = data.find(
      (project) => project.url == window.location.search.slice(1)
    ).folder;

    document.addEventListener("keydown", (e) => {
      if (!this.overlay.classList.contains("active")) return;

      switch (e.key) {
        case "Escape":
          this.close();
          break;
        case "ArrowLeft":
          this.prev();
          break;
        case "ArrowRight":
          this.next();
          break;
      }
    });
  }
  createOverlay() {
    const overlay = document.querySelector("#gallery-lightbox");
    this.overlay = overlay;
    overlay
      .querySelector("#gallery-left")
      .addEventListener("click", () => this.prev());
    overlay
      .querySelector("#gallery-right")
      .addEventListener("click", () => this.next());
    overlay
      .querySelector("#gallery-close")
      .addEventListener("click", () => this.close());

    this.overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        this.close();
      }
    });
  }

  open(index) {
    this.currentIndex = index;
    this.updateImage();
    this.overlay.classList.add("active");
  }

  close() {
    this.overlay.classList.remove("active");
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }
  updateImage() {
    const image = this.images[this.currentIndex];
    const imgElement = this.overlay.querySelector("#gallery-item");

    imgElement.src = this.folder + image;
  }
}
