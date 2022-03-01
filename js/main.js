// Data Load Phones when click search
const dataLoading = () => {
  const searchResult = document
    .querySelector("#search-field")
    .value.toLowerCase();
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchResult}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displaySearchResult(data.data.slice(0, 20));
    });

  document.querySelector("#search-field").value = "";
};

//=======================
//
//
// Display Search Result Phone Collection Funtions
const displaySearchResult = (phones) => {
  const phoneList = document.querySelector("#phone-list");
  phoneList.innerHTML = "";
  phones.forEach((phone) => {
    // console.log(phone);
    const { image, phone_name, brand, slug } = phone;
    showAllPhones(image, phone_name, brand, slug, phoneList);
  });
};

// Disply All Phones When Search with Name;
const showAllPhones = (image, phone_name, brand, slug, phoneList) => {
  const phoneItemDiv = document.createElement("div");
  phoneItemDiv.classList.add("card", "card-wrapper", "col-md-4", "col-sm-6");
  phoneItemDiv.innerHTML = `
            <div
              class="bg-image hover-overlay ripple"
              data-mdb-ripple-color="light">
              <img src="${image}"/>
            </div>
            <div class="card-body">
              <h5 class="card-title font-weight-bold">${phone_name}</h5>
              <p class="mb-2">Brand: ${brand}</p>
              <button 
              class="btn phoneDetailsbtn btn-color"
              onclick="loadDataWithSlug('${slug}')"
              >See Details</button>
            </div>  `;
  phoneList.appendChild(phoneItemDiv);
};

//==========================
//
//
// Load Data with specified Phone ID
const loadDataWithSlug = (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showPhoneDetails(data.data));
};

// Show Phone Details with specified Id
const showPhoneDetails = (phoneDetailsInfo) => {
  const { image, name, brand, releaseDate, slug } = phoneDetailsInfo;
  const { storage, displaySize, chipSet, memory } =
    phoneDetailsInfo.mainFeatures;
  const { WLAN, Bluetooth, GPS, Radio, USB } = phoneDetailsInfo.others;
  console.log(USB);

  const sensors = phoneDetailsInfo.mainFeatures.sensors;
  sensors.forEach((sensor) => sensor);
};
