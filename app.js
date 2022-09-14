window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temp-description");
  let tempDegree = document.querySelector(".temp-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let tempSection = document.querySelector(".temperature");
  const tempSpan = document.querySelector(".temperature span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const apiKey = config.MY_API_KEY;

      const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=${apiKey}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { conditions, icon, feelslike } = data.currentConditions;
          tempDegree.textContent = feelslike;
          tempDescription.textContent = data.description;
          locationTimezone.textContent = data.timezone;

          let celsius = (feelslike - 32) * (5 / 9);

          setIcons(icon, document.querySelector(".icon"));

          // Change to Celsius/Farenheit
          tempSection.addEventListener("click", () => {
            if (tempSpan.textContent === "F") {
              tempSpan.textContent = "C";
              tempDegree.textContent = Math.floor(celsius);
            } else {
              tempSpan.textContent = "F";
              tempDegree.textContent = feelslike;
            }
          });
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
