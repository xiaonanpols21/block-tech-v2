console.log("form.js doet het");

// Upload img
function PreviewImage() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

  oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview").src = oFREvent.target.result;
  };
}

// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#examples
/*
function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
document.querySelector("#find-me").addEventListener("click", geoFindMe);
*/

// Bron: https://www.youtube.com/watch?v=916M64DuRnk&ab_channel=dcode
/*
const SuccessCallback = (position) => {
  console.log(position);
}

const errorCallback = (error) => {
  console.error(error);
}

navigator.geolocation.getCurrentPosition(SuccessCallback, errorCallback);
*/

// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  let crd = pos.coords;
  fetch("http://localhost:3000/data/capitals.json")
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter(
        (capital) =>
          +capital.CapitalLatitude >= crd.latitude - 0.2 &&
          +capital.CapitalLatitude <= crd.latitude + 0.2 &&
          +capital.CapitalLongitude >= crd.longitude - 0.2 &&
          +capital.CapitalLongitude <= crd.longitude + 0.2
      );
      console.log(filteredData[0].CapitalName);
      let location = document.getElementById("location");
      location.value = filteredData[0].CapitalName;
      return data;
    });

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

// TODO: location in input plaatsen
// Bron: https://stackoverflow.com/questions/30056002/how-to-get-geolocation-and-return-value-in-html-form
// Bron: Student assistent
