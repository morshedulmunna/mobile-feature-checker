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
  const detailsWrapper = document.querySelector("#detailsWrapper");
  detailsWrapper.innerHTML = "";
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
  const detailsWrapper = document.querySelector("#detailsWrapper");
  detailsWrapper.innerHTML = "";

  const mobiledetailsview = document.createElement("div");
  mobiledetailsview.classList.add("wrapper", "w-75");

  const { image, name, brand, releaseDate, slug } = phoneDetailsInfo;
  console.log(slug);

  const { storage, displaySize, chipSet, memory } =
    phoneDetailsInfo.mainFeatures;
  const sensors = phoneDetailsInfo.mainFeatures.sensors;
  const { WLAN, Bluetooth, GPS, Radio, NFC, USB } = phoneDetailsInfo.others;

  console.log(phoneDetailsInfo.others);

  /* if (phoneDetailsInfo.others === null) {
    mobiledetailsview.innerHTML = `
    <div class="others">
      <p>Others Feature Not now</p>
    </div>
    `;
    detailsWrapper.appendChild(mobiledetailsview);
  } */
  mobiledetailsview.innerHTML = `
     <div class="Basic">
          <img
            class=" w-75 img-fluid"
            src="${image ? image : "Image not found"}"
            alt=""
          />
          <p><strong>Name</strong>: ${name ? name : "No Name"}</p>
          <p><strong>Brand</strong>: ${brand ? brand : "Unknown Brand"}</p>
          <p"><strong>Release</strong>: ${
            releaseDate ? releaseDate : "Comming Soon...."
          }</p>
        </div>

        <div class="mainFeature">
          <h4>Main Feature</h4>
          <ul>
            <li><strong>Storage</strong>: ${
              storage ? storage : "Not Specified"
            }</li>
            <li>
              <strong>Display</strong> ${
                displaySize ? displaySize : "Not Specified"
              })
            </li>
            <li><strong>chipSet</strong>: ${chipSet ? chipSet : "Unknown"} </li>
            <li>
              <strong>Memory</strong>: ${memory ? memory : "Not Release"}
            </li>
            <li>
              <strong>Sensors</strong>: ${sensors ? sensors : "Not Specified"}
            </li>
          </ul>
        </div>
        <div class="others">
          <h4>Others Feature</h4>
          <ul>
            <li><strong>WLAN</strong>: ${WLAN ? WLAN : "Not Specified"} </li>
            <li><strong>Bluetooth</strong>:${
              Bluetooth ? Bluetooth : "Not Available"
            } </li>
            <li><strong>GPS</strong>: ${GPS ? GPS : "Not Available"} </li>
            <li><strong>NFC</strong>: ${NFC ? NFC : "NO"} </li>
            <li><strong>Radio</strong>: ${Radio ? Radio : "NO"} </li>
            <li><strong>USB</strong>: ${USB ? USB : "Not Available"} </li>
          </ul>
        </div>
        
  `;
  detailsWrapper.appendChild(mobiledetailsview);
};
