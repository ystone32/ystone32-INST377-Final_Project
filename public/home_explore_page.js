async function createCustomer() {
  await fetch(`/customer`, {
    method: 'POST',
    body: JSON.stringify({
      firstName: `${document.getElementById('firstName').value}`,
      lastName: `${document.getElementById('lastName').value}`,
      state: `${document.getElementById('state').value}`,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((result) => result.json());

  await loadCustomerData();
}

async function loadCustomerData() {
  await fetch(`/customers`)
    .then((result) => result.json())
    .then((resultJson) => {
      const table = document.createElement('table');
      table.setAttribute('id', 'customerInfo');

      const tableRow = document.createElement('tr');

      const tableHeadingFirstName = document.createElement('th');
      tableHeadingFirstName.innerHTML = 'First Name';
      tableRow.appendChild(tableHeadingFirstName);

      const tableHeadingLastName = document.createElement('th');
      tableHeadingLastName.innerHTML = 'Last Name';
      tableRow.appendChild(tableHeadingLastName);

      const tableHeadingState = document.createElement('th');
      tableHeadingState.innerHTML = 'State';
      tableRow.appendChild(tableHeadingState);

      table.appendChild(tableRow);

      resultJson.forEach((customer) => {
        const customerTableRow = document.createElement('tr');
        const customerTableFirstName = document.createElement('td');
        const customerTableLastName = document.createElement('td');
        const customerTableState = document.createElement('td');

        customerTableFirstName.innerHTML = customer.customer_first_name;
        customerTableLastName.innerHTML = customer.customer_last_name;
        customerTableState.innerHTML = customer.customer_state;

        customerTableRow.appendChild(customerTableFirstName);
        customerTableRow.appendChild(customerTableLastName);
        customerTableRow.appendChild(customerTableState);

        table.appendChild(customerTableRow);
      });

      const preExistingTable = document.getElementById('customerInfo');
      if (preExistingTable) {
        preExistingTable.remove();
      }

      document.getElementById('cool_content').appendChild(table);
    });
}
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

async function createMap(){
  const stateCoords = {
    "AL": [32.8067, -86.7911], "AK": [61.3707, -152.4044], "AZ": [33.7298, -111.4312],
    "AR": [34.9697, -92.3731], "CA": [36.1162, -119.6816], "CO": [39.0598, -105.3111],
    "CT": [41.5978, -72.7554], "DE": [39.3185, -75.5071], "FL": [27.7663, -81.6868],
    "GA": [33.0406, -83.6431], "HI": [21.0943, -157.4983], "ID": [44.2405, -114.4788],
    "IL": [40.3495, -88.9861], "IN": [39.8494, -86.2583], "IA": [42.0115, -93.2105],
    "KS": [38.5266, -96.7265], "KY": [37.6681, -84.6701], "LA": [31.1695, -91.8678],
    "ME": [44.6939, -69.3819], "MD": [39.0639, -76.8021], "MA": [42.2302, -71.5301],
    "MI": [43.3266, -84.5361], "MN": [45.6945, -93.9002], "MS": [32.7416, -89.6787],
    "MO": [38.4561, -92.2884], "MT": [46.9219, -110.4544], "NE": [41.1254, -98.2681],
    "NV": [38.3135, -117.0554], "NH": [43.4525, -71.5639], "NJ": [40.2989, -74.5210],
    "NM": [34.8405, -106.2485], "NY": [42.1657, -74.9481], "NC": [35.6301, -79.8064],
    "ND": [47.5289, -99.7840], "OH": [40.3888, -82.7649], "OK": [35.5653, -96.9289],
    "OR": [44.5720, -122.0709], "PA": [40.5908, -77.2098], "RI": [41.6809, -71.5118],
    "SC": [33.8569, -80.9450], "SD": [44.2998, -99.4388], "TN": [35.7478, -86.6923],
    "TX": [31.0545, -97.5635], "UT": [40.1500, -111.8624], "VT": [44.0459, -72.7107],
    "VA": [37.7693, -78.1700], "WA": [47.4009, -121.4905], "WV": [38.4912, -80.9545],
    "WI": [44.2685, -89.6165], "WY": [42.7559, -107.3025]
  };


  var map = L.map('map').setView([38.9869, -76.937759], 3);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    window.customerMarkers = [];

    await fetch(`/customers`)
    .then((result) => result.json())
    .then((resultJson) => {
      document.getElementById("uCount").textContent = `Sign Ups: ${resultJson.length}`;
      resultJson.forEach((customer) => {
        const state = customer.customer_state;
        const coords = stateCoords[state];
        console.log(state, coords);


      if (coords) {
        const marker = L.marker(coords)
          .addTo(map);
        window.customerMarkers.push(marker);
      }

        
      });

    });

}



function theCall() {
  loadCustomerData;
  createMap();
  peopleCarousel();
  obesitySubmission();
}
window.onload = theCall;