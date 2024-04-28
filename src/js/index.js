const search = document.querySelector("#search"),
  table_rows = document.querySelector("#tableRows"),
  sortButtons = [...document.querySelectorAll(".table_header")];
console.log(sortButtons);

let allProducts = [];

const instance = axios.create({ baseURL: "http://localhost:3000" });

document.addEventListener("DOMContentLoaded", () => {
  instance
    .get("/transactions")
    .then((res) => {
      allProducts = res.data;
      getAllProducts(allProducts);
    })
    .catch((err) => {
      console.log(err);
    });
});

function getAllProducts() {
  let row = "";
  allProducts.forEach((product) => {
    row += `<tr><td>${product.id}</td><td class="${
      product.type === "افزایش اعتبار" ? "green" : "red"
    }">${product.type} </td><td>${product.price}</td><td>${
      product.refId
    }</td><td>${new Date(product.date).toLocaleDateString("fa-Ir")}</td></tr>`;
  });
  table_rows.innerHTML = row;
  return allProducts;
}

search.addEventListener("input", (e) => {
  e.preventDefault();
  const refId = e.target.value;
  instance
    .get(`/transactions?refId_like=${refId}`)
    .then((res) => {
      allProducts = res.data;
      getAllProducts(allProducts);
    })
    .catch((err) => {
      console.log(err);
    });
});

sortButtons.forEach((th) => {
  th.addEventListener("click", () => {
    sortButtons.forEach((th) => th.classList.remove("active"));
    th.classList.add("active");

    let column = th.dataset.column;
    let order = th.dataset.order;
    if (order === "desc" && column === "price") {
      th.dataset.order = "asc";
      instance
        .get("/transactions?_sort=price&_order=asc")
        .then((res) => {
          allProducts = res.data;
          getAllProducts(allProducts);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (order === "asc" && column === "price") {
      th.dataset.order = "desc";
      instance
        .get("/transactions?_sort=price&_order=desc")
        .then((res) => {
          allProducts = res.data;
          getAllProducts(allProducts);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (order === "desc" && column === "date") {
      th.dataset.order = "asc";
      instance
        .get("/transactions?_sort=price&_order=asc")
        .then((res) => {
          allProducts = res.data;
          getAllProducts(allProducts);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (order === "asc" && column === "date") {
      th.dataset.order = "desc";
      instance
        .get("/transactions?_sort=price&_order=desc")
        .then((res) => {
          allProducts = res.data;
          getAllProducts(allProducts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

// hide and show transaction

const selectTransaction = document.querySelector("#transaction");
const buttonTransaction = document.querySelector("#select-btn");
let isShow = true;

buttonTransaction.addEventListener("click", () => {
  if (isShow) {
    selectTransaction.style.display = "none";
    isShow = false;
  } else {
    selectTransaction.style.display = "block";
    isShow = true;
  }
});
