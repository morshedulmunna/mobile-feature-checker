// Data Load Phones when click search
const dataLoading = () => {
  const searchResult = document.querySelector("#search-field").value;
  //   console.log(searchResult);
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchResult}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displaySearchResult(data.data));

  document.querySelector("#search-field").value = "";
};

// Display Search Result Phone Collection Funtions
const displaySearchResult = (phones) => {
  phones.forEach((phone) => {
    // console.log(phone);
    const { image, phone_name, brand, slug } = phone;
    showAllPhones(image, phone_name, brand, slug);
  });
};

// Disply All Phones When Search with Name;
const showAllPhones = (image, phone_name, brand, slug) => {
  const phoneList = document.querySelector("#phone-list");
  const phoneItemDiv = document.createElement("div");
  phoneItemDiv.classList.add("card", "card-wrapper", "col-md-4", "col-sm-6");
  phoneItemDiv.setAttribute("id", `${slug}`);
  phoneItemDiv.innerHTML = `
        <div class="phone">
            <div
              class="bg-image hover-overlay ripple"
              data-mdb-ripple-color="light"
            >
              <img
                src="${image}"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title font-weight-bold">${phone_name}</h5>
              <p class="mb-2">Brand: ${brand}</p>
              <button 
              class="btn phoneDetailsbtn btn-color"
              onclick="loadDataWithSlug('${slug}')"
              >See Details</button>
            </div>
          </div>
    `;
  phoneList.appendChild(phoneItemDiv);
};

// Load Data with specified Phone ID
const loadDataWithSlug = (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showPhoneDetails(data));
};

// Show Phone Details with specified Id
const showPhoneDetails = (phoneDetailsInfo) => {
  console.log(phoneDetailsInfo);
};
