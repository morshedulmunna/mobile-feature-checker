// Data Load Phones when click search
const dataLoading = () => {
  const searchResult = document
    .querySelector("#search-field")
    .value.toLowerCase();
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchResult}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == false) {
        const alartDiv = document.querySelector("#alartDiv");
        alartDiv.classList.add("alert", "alert-danger");
        showError();
        htmlEmpty();
      } else {
        displaySearchResult(data.data.slice(0, 20));
        alartDiv.classList.remove("alert", "alert-danger");
        const AlartText = document.querySelector("#AlartText");
        AlartText.innerText = "";
      }
    });

  document.querySelector("#search-field").value = "";
};

// Error Alart Show When get Error
const showError = () => {
  const AlartText = document.querySelector("#AlartText");
  AlartText.innerText = "Hy Stop!! No Result Found. Try Again";
};

// Result Empty When Search Again
const htmlEmpty = () => {
  document.querySelector("#search-field").value = "";
  const detailsWrapper = document.querySelector("#detailsWrapper");
  detailsWrapper.innerHTML = "";
  const phoneList = document.querySelector("#phone-list");
  phoneList.innerHTML = "";
};

//===============================
//                           ====
//===============================
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

//===============================
//                           ====
//===============================
// Load Data with specified Phone ID
const loadDataWithSlug = (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showPhoneDetails(data.data));
};
// Show Phone Details with specified Id
const showPhoneDetails = (phoneDetailsInfo) => {
  window.scrollTo(0, 300);
  const detailsWrapper = document.querySelector("#detailsWrapper");
  detailsWrapper.innerHTML = "";

  const mobiledetailsview = document.createElement("div");
  mobiledetailsview.classList.add("wrapper", "row", "p-5");

  const { image, name, brand, releaseDate, slug } = phoneDetailsInfo;

  const { storage, displaySize, chipSet, memory } =
    phoneDetailsInfo.mainFeatures;
  const phoneSensors = phoneDetailsInfo.mainFeatures.sensors;

  mobiledetailsview.innerHTML = `
     <div class="col-md-4 col-sm-6">
          <img
            class=" w-50 img-fluid"
            src="${image ? image : "Image not found"}"
            alt=""
          />
          <p><strong>Name</strong>: ${name ? name : "No Name"}</p>
          <p><strong>Brand</strong>: ${brand ? brand : "Unknown Brand"}</p>
          <p"><strong>Release</strong>: ${
            releaseDate ? releaseDate : "Comming Soon...."
          }</p>
        </div>

        <div class="col-md-4 col-sm-6">
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
              <strong>Sensors</strong>:
              <ul>
                 <p>${phoneSensors[0]}</p>
                 <p>${phoneSensors[1]}</p>
                 <p>${phoneSensors[2]}</p>
                 <p>${phoneSensors[3]}</p>
                 <p>${phoneSensors[4]}</p>
                 <p>${phoneSensors[5]}</p>
              </ul>
            </li>
          </ul>
        </div>
        <div class="col-md-4 col-sm-6">
          <h4>Others Feature</h4>
          <ul>
            <li><strong>WLAN</strong>: ${
              phoneDetailsInfo?.others?.WLAN
                ? phoneDetailsInfo?.others?.WLAN
                : "Not Specified"
            } </li>
            <li><strong>Bluetooth</strong>:${
              phoneDetailsInfo.others?.Bluetooth
                ? phoneDetailsInfo?.others?.Bluetooth
                : "Not Available"
            } </li>
            <li><strong>GPS</strong>: ${
              phoneDetailsInfo.others?.GPS
                ? phoneDetailsInfo?.others?.GPS
                : "Not Available"
            } </li>
            <li><strong>NFC</strong>: ${
              phoneDetailsInfo.others?.NFC
                ? phoneDetailsInfo?.others?.NFC
                : "NO"
            } </li>
            <li><strong>Radio</strong>: ${
              phoneDetailsInfo.others?.Radio
                ? phoneDetailsInfo?.others?.Radio
                : "NO"
            } </li>
            <li><strong>USB</strong>: ${
              phoneDetailsInfo.others?.USB
                ? phoneDetailsInfo?.others?.USB
                : "Not Available"
            } </li>
          </ul>
        </div>
        
  `;
  detailsWrapper.appendChild(mobiledetailsview);
};
