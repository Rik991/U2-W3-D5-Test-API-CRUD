const myEndPoint = "https://striveschool-api.herokuapp.com/api/product/";
const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmIxNDc5YzQ1ZjAwMTU2OWI0YzkiLCJpYXQiOjE3Mjc0MjUzMDAsImV4cCI6MTcyODYzNDkwMH0.mISiOkqw_tswxCmgxiFQcCmCMuw1ky6Zt95fVt_5sY4";

const backOfficeForm = document.querySelector("form");
const resetBtn = document.querySelector(".btn-info");

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price; // type number
  }
}

// recuperaro i parametri dell'URL in una funzione che mi torna l'id
const getProdId = () => {
  const params = new URLSearchParams(location.search);
  return {
    id: params.get("id")
  };
};

// creo una funzione loadProd che precompila i campi del mio form (grazie alla fetch con id)
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
      document.getElementById("prodName").value = product.name;
      document.getElementById("prodDescription").value = product.description;
      document.getElementById("prodBrand").value = product.brand;
      document.getElementById("prodPic").value = product.imageUrl;
      document.getElementById("prodPrice").value = product.price;
      const otherBtn = document.querySelector(".btn-primary");
      otherBtn.innerText = "Aggiorna prodotto";
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

// salvo l'id nella variabile prodWithId, lo passo quindi alla funzione loadProd(se productWithId.id esiste)
const prodWithId = getProdId();
if (prodWithId.id) {
  loadProd(prodWithId.id);
}

resetBtn.addEventListener("click", () => {
  backOfficeForm.reset();
});

// dico al form cosa deve prelevare
backOfficeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("prodName").value;
  const description = document.getElementById("prodDescription").value;
  const brand = document.getElementById("prodBrand").value;
  const imageUrl = document.getElementById("prodPic").value;
  const price = document.getElementById("prodPrice").value;

  const newProd = new Product(name, description, brand, imageUrl, price);

  // se abbiamo l'if facciamo la PUT...
  if (prodWithId.id) {
    fetch(myEndPoint + prodWithId.id, {
      method: "PUT",
      body: JSON.stringify(newProd),
      headers: {
        Authorization: myKey,
        "Content-type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          const areYouShure = confirm("Modificare il prdotto?");
          if (areYouShure) {
            alert("Prodotto aggiornato");
            location.assign("./home-page.html");
          }
        } else {
          throw new Error("Errore nel server");
        }
      })
      .catch((err) => {
        console.log("Errore", err);
      });
  } else {
    // ...altrimenti facciamo la POST
    fetch(myEndPoint, {
      method: "POST",
      body: JSON.stringify(newProd),
      headers: {
        Authorization: myKey,
        "Content-type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          alert("Prodotto creato");
          backOfficeForm.reset();
        } else {
          throw new Error("Errore nel server");
        }
      })
      .catch((err) => {
        console.log("Errore", err);
      });
  }
});
