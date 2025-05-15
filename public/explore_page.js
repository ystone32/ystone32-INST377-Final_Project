function peopleCarousel() {
    const randPeople = document.getElementById("randPeople");
    simpleslider.getSlider({
        container: randPeople,
        transitionTime:1,
        delay:3.5
        });
  }

  function obesitySubmission(event) {
    event.preventDefault(); 
  
    const city = document.getElementById("city_opt").value;
    const url = `https://data.cdc.gov/resource/6vp6-wxuq.json?year=2017&cityname=${city}&measureid=OBESITY`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.length > 0) {
          const rate = data[0].data_value;
          console.log(`whatever: ${rate}`);
          document.getElementById("city_name").textContent = `City: ${city}`;
          document.getElementById("obesity_rate").textContent = `Obesity Rate: ${rate}%`;
        } else {
          document.getElementById("city_name").textContent = `City: ${city}`;
          document.getElementById("obesity_rate").textContent = `Obesity Rate: Data not available`;
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
 
  
  
  
  
  
  
  
  

  function theCall(){
    peopleCarousel();
    obesitySubmission();
  }
  window.onload = theCall;