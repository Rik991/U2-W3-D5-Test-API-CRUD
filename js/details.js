const myEndPoint = "https://striveschool-api.herokuapp.com/api/product/";
const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmIxNDc5YzQ1ZjAwMTU2OWI0YzkiLCJpYXQiOjE3Mjc0MjUzMDAsImV4cCI6MTcyODYzNDkwMH0.mISiOkqw_tswxCmgxiFQcCmCMuw1ky6Zt95fVt_5sY4";

const getProdId = () => {
  const params = new URLSearchParams(location.search);
  return {
    id: params.get("id")
  };
};

const loadProd = (id) => {
  fetch(myEndPoint + id, {
    headers: {
      Authorization: myKey
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel server");
      }
    })
    .then((product) => {
      document.getElementById("prodName").innerText = product.name;
      document.getElementById("prodDescription").innerText = product.description;
      document.getElementById("prodBrand").innerText = product.brand;
      document.getElementById("prodPic").src = product.imageUrl;
      document.getElementById("prodPrice").innerText = product.price;
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

const prodWithId = getProdId();
if (prodWithId.id) {
  loadProd(prodWithId.id);
}
