let scrollAmount = 15;

setInterval(function() {
  heading.style.left = `-${scrollAmount}px`;
  scrollAmount += 15;
  if (scrollAmount > heading.offsetWidth) {
    scrollAmount = 0;
  }
}, 90);

window.onload = function () {
  const links = document.querySelectorAll("a.cipher");
  const solveMilliseconds = 800;
  const characterSelectionMilliseconds = 40;
  const delayMilliseconds = 250;
  const characters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^"];

  const randomArrayElement = (arr) => {
    return arr[(arr.length * Math.random()) | 0];
  };

  links.forEach((element) => {
    element.addEventListener("mouseenter", (e) => {
      const element = e.target;
      scrambleText(element);
      e.preventDefault();
    });
  });

  function scrambleText(element) {
    if (element.classList.contains("active") == false) {
      let delay = 0;
      const elementText = element.innerText;
      const elementCharacters = [...elementText];
      const lockMilliseconds =
        delayMilliseconds * elementCharacters.length + solveMilliseconds;

      element.classList.add("active");

      setTimeout(() => {
        element.classList.remove("active");
      }, lockMilliseconds);

      elementCharacters.forEach((character, index) => {
        setTimeout(
          () => {
            let intervalId = setInterval(() => {
              const randomCharacter = randomArrayElement(characters);
              element.innerText = replaceCharacter(
                element.innerText,
                index,
                randomCharacter
              );

              setTimeout(() => {
                clearInterval(intervalId);
                element.innerText = replaceCharacter(
                  element.innerText,
                  index,
                  elementCharacters[index]
                );
              }, solveMilliseconds);
            }, characterSelectionMilliseconds);
          },
          delay === 0 ? (delay += 1) : (delay += delayMilliseconds)
          );
        });
      }
    }
  
    function replaceCharacter(str, index, chr) {
      return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
    }
  
    document.querySelector("a.intro").addEventListener("mouseenter", function(e) {
      const element = e.target;
      scrambleText(element);
      e.preventDefault();
    });
  
    document.querySelector("a.intro-title2").addEventListener("mouseenter", function(e) {
      const element = e.target;
      scrambleText(element);
      e.preventDefault();
    });
  };
  
