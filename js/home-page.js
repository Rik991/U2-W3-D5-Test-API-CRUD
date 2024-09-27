const myEndPoint = "https://striveschool-api.herokuapp.com/api/product/";
const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmIxNDc5YzQ1ZjAwMTU2OWI0YzkiLCJpYXQiOjE3Mjc0MjUzMDAsImV4cCI6MTcyODYzNDkwMH0.mISiOkqw_tswxCmgxiFQcCmCMuw1ky6Zt95fVt_5sY4";

const getProduct = () => {
  fetch(myEndPoint, {
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
    .then((myProductArray) => {
      console.log(myProductArray);
      myProductArray.forEach((singleProd) => {
        const myRow = document.getElementById("last-load");
        const newCol = document.createElement("div");
        const newCard = document.createElement("div");
        newCol.classList.add("col-6", "col-md-4", "col-xl-3");
        newCard.classList.add("card", "h-100", "w-100", "border", "border-black", "shadow-lg");
        newCard.style.cursor = "pointer";
        newCard.innerHTML = `        
         <img src="${singleProd.imageUrl}" class="card-img-top img-fluid" alt="product-img" style="object-fit:cover; width:100%; height: 330px">
         <div class="card-body d-flex flex-column">
          <h6 class="card-title">${singleProd.name}</h6>
          <div>          
          <p class="card-text ">Prezzo: ${singleProd.price} €</p>
          </div>
          <div class="d-flex justify-content-around flex-wrap mt-auto">          
          <button class="btn btn-warning my-1">Modifica</button>
          <button class="btn btn-danger my-1">Elimina</button>
          </div>
         </div>`;
        newCol.appendChild(newCard);
        myRow.appendChild(newCol);
        newCard.querySelector(".card-img-top").addEventListener("click", () => {
          window.location.href = `details.html?id=${singleProd._id}`;
        });
        const updateBtn = newCard.querySelector(".btn-warning");
        updateBtn.addEventListener("click", () => {
          const idUrl = `./back-office.html?id=${singleProd._id}`;
          window.location.href = idUrl;
        });
        const deleteBtn = newCard.querySelector(".btn-danger");
        deleteBtn.addEventListener("click", () => {
          const areYouShure = confirm("Sei sicuro di voler eliminare il prdotto?");
          if (areYouShure) {
            fetch(myEndPoint + "/" + singleProd._id, {
              method: "DELETE",
              headers: {
                Authorization: myKey
              }
            })
              .then((response) => {
                if (response.ok) {
                  alert("Prodotto eliminato");
                  newCol.remove();
                } else {
                  throw new Error("Errore nel server");
                }
              })
              .catch((err) => {
                console.log("Errore", err);
              });
          }
        });
      });
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

getProduct();
