const heading = document.getElementById("myHeading");
let scrollAmount = 15;

setInterval(function() {
  heading.style.left = `-${scrollAmount}px`;
  scrollAmount += 15;
  if (scrollAmount > heading.offsetWidth) {
    scrollAmount = 0;
  }
}, 50);