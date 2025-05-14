function peopleCarousel() {
    const randPeople = document.getElementById("randPeople");
    simpleslider.getSlider({
        container: randPeople,
        transitionTime:1,
        delay:3.5
        });
  }

  function theCall(){
    peopleCarousel();
  }
  window.onload = theCall;