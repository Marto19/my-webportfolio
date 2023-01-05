let scrollAmount = 15;
const heading = document.getElementById("myHeading");


setInterval(function() {
  heading.style.left = `-${scrollAmount}px`;
  scrollAmount += 15;
  if (scrollAmount > heading.offsetWidth) {
    scrollAmount = 0;
  }
}, 90);

