const dataLoading = () => {
  const searchResult = document.querySelector("#search-field").value;
  //   console.log(searchResult);
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchResult}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displaySearchResult(data.data));
  document.querySelector("#search-field").value = "";
};

const displaySearchResult = (phones) => {
  phones.forEach((phone) => {
    console.log(phone);
    const { image, phone_name, brand } = phone;
    const phoneList = document.querySelector("#phone-list");
    const phoneItemDiv = document.createElement("div");
    phoneItemDiv.classList.add("card");
    phoneItemDiv.classList.add("card-wrapper");
    phoneItemDiv.classList.add("col-md-4");
    phoneItemDiv.classList.add("col-sm-6");
    phoneItemDiv.innerHTML = `
         <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img
          src="${image}"
          class="img-fluid"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title font-weight-bold">
            ${phone_name}
        </h5>
        <p class="mb-2"> ${brand} </p>
      </div>
    `;
    phoneList.appendChild(phoneItemDiv);
  });
};
