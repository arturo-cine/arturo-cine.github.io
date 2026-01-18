function myFunction() {
  var x = document.getElementById("nav-right");
  if (x.className === "nav-right") {
    x.className += "-responsive";
  } else {
    x.className = "nav-right";
  }
}
