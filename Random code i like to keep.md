* ###### ***The following example uses getCurrentPosition() method to get your position in latitude and longitude and determine a geographic region of the world.***



const button = document.querySelector("#location-button");

const location = document.querySelector(".location");

&#x20;       

button.addEventListener("click", function () {

&#x20; if (navigator.geolocation) {

&#x20;   navigator.geolocation.getCurrentPosition(

&#x20;     function (position) {

&#x20;       const latitude = position.coords.latitude;

&#x20;       const longitude = position.coords.longitude;

&#x20;       // output

&#x20;       location.innerHTML = `Latitude: ${latitude} 🧭 Longitude: ${longitude}`;

&#x20;       location.innerHTML += `Region: ${getRegion(latitude, longitude)}`;

&#x20;     },

&#x20;     function (error) {

&#x20;       location.textContent = `Error: ${error.message}`;

&#x20;     }

&#x20;   );  

&#x20;   } else {

&#x20;     location.textContent = "Geolocation is not supported by this browser.";

&#x20;   }

});



function getRegion(lat, lon) {

&#x20; if (lon > 180) lon -= 360; //normalize to -180..180



&#x20; switch (true) {

&#x20;   // North America (excl. Mexico/Central America)

&#x20;   case lat >= 24 \&\& lat <= 83 \&\& lon >= -172 \&\& lon <= -52:

&#x20;     return "North America" ;

&#x20;   // Mexico and Central America

&#x20;   case lat >= 7 \&\& lat < 24 \&\& lon >= -118 \&\& lon <= -77:

&#x20;     return "Mexico and Central America";

&#x20;   // South America

&#x20;   case lat >= -56 \&\& lat <= 13 \&\& lon >= -82 \&\& lon <= -34:

&#x20;     return "South America";

&#x20;   // Europe

&#x20;   case lat>= 35 \&\& lat <= 71 \&\& lon >= -25 \&\& lon <= 45:

&#x20;     return "Europe";

&#x20;   // Africa

&#x20;   case lat >= -35 \&\& lat <= 37 \&\& lon >= -17 \&\& lon <= 52:

&#x20;     return "Africa";

&#x20;   // Asia

&#x20;   case lat >= 5 \&\& lat <= 80 \&\& lon >= 45 \&\& lon <= 180:

&#x20;     return "Asia";

&#x20;   // Oceania

&#x20;   case lat >= -50 \&\& lat <= 0 \&\& lon >= 110 \&\& lon <= 180:

&#x20;     return "Oceania";

&#x20;   default:

&#x20;     return "Not mapped";

&#x20; }

}







* #### **This helps delay code from happening with the setInterval or setTimeout**



const countdownDisplay = document.getElementById('countdown');

const startButton = document.getElementById('startButton');



let timeLeft = 10;



startButton.addEventListener('click', () => {

&#x20; setInterval(() => {

&#x20;   if (timeLeft >= 0) {

&#x20;     countdownDisplay.textContent = timeLeft;

&#x20;     timeLeft--;

&#x20;   } else {

&#x20;     // Stop the countdown and display a message

&#x20;   }

&#x20; }, 1000); 

});





* ##### **Lazy load this element by TEMPLATE**



<template id="product-card">

&#x20; <section class="card">

&#x20;   <h2></h2>

&#x20;   <p></p>

&#x20;   <p></p>

&#x20;   <img class="tn" src="" alt="" loading="lazy" width="100" height="200">

&#x20; </section>

</template>





const template = document.getElementById("product-card");

const productList = document.getElementById("product-list");

&#x20;   

products.forEach((product) => {

&#x20; const clone = template.content.cloneNode(true);

&#x20; const \[title, desc, price, img] = clone.querySelectorAll("h2, p, p, img");

&#x20;   

&#x20; title.textContent = product.name;

&#x20; desc.textContent = product.description;

&#x20; price.textContent = product.price;

&#x20; img.src = product.image;

&#x20; img.alt = product.name;

&#x20;   

&#x20; productList.appendChild(clone);

});

