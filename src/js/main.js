import data from "./data.js"
const productWrapper = document.querySelector(".products");
const shopWrapper = document.querySelector(".shop");
const total_price = document.getElementById("total");
const clearBtn = document.querySelector(".clear");
let shop = [];
function setTotalPrice() {
  total_price.innerHTML = shop.reduce((a, b) => Number(a) + Number(b.userPrice), 0) + " $";
};
const Render = () => {
  productWrapper.innerHTML = data.map((e) => `
    <div class="card  relative shadow-xl rounded-xl w-[280px] h-[400px] bg-white p-4">
      <img src="${e.img}" class="w-[220px] h-[200px] flex items-center justify-center">
      <p class="text-left absolute bottom-[35%] text-4xl font-semibold">${e.name}</p>
      <h1 class="text-left italic absolute bottom-[25%] text-2xl">Price: ${e.price} $</h1>
     <div class="flex items-center justify-between absolute bottom-4 gap-4">
      <p class="text-left font-semibold bg-yellow-100 text-2xl px-4 py-2 rounded-2xl inline-block">Total: ${e.count}</p>
      <button data-add = ${e.id} class="flex items-center justify-center mx-auto text-2xl bg-green-600 text-white px-10 py-3  rounded-lg hover:bg-green-900">Add</button>
     </div>
    </div>
    `).join("")
}
Render();
const shopRender = () => {
  shopWrapper.innerHTML = shop.map((e) => `
     <div class="card  relative shadow-xl rounded-xl w-[230px] h-[370px] bg-white p-4">
        <img src="${e.img}" class="w-[220px] h-[200px] flex items-center justify-center">
        <p class="text-left absolute bottom-[33%] text-3xl font-semibold">${e.name}</p>
        <p class="text-left font-bold underline absolute bottom-[22%] text-2xl">Total: ${e.userPrice} $</p>
      <div class="btns flex items-center justify-between  absolute bottom-4 gap-3">
        <div class="count bg-slate-600 py-2 w-[100px] flex items-center justify-around text-white text-xl rounded-lg">
              <button data-minus = ${e.id}> -</button>
              <strong>${e.userCount}</strong>
              <button data-plus = ${e.id}> + </button>
        </div>
            <button id="bnt1" data-remove=${e.id}
              class="btn2 bg-red-500 block text-white px-4 py-2  rounded-lg hover:bg-red-900">Remove</button>
          </div>
        </div> 
    `).join("");
  setTotalPrice();
}
shopRender();
productWrapper.addEventListener("click", (e) => {
  let addItem = Number(e.target.dataset.add);
  if (addItem) {
    const newEl = data.find((e) => e.id === addItem);
    const product = shop.find((e) => e.id === addItem);
    if (!product) {
      shop.push({ ...newEl, userPrice: newEl.price, userCount: 1 })
    }
  }
  shopRender()
  Render();
});
shopWrapper.addEventListener("click", (e) => {
  let removeItem = Number(e.target.dataset.remove);
  if (removeItem) {
    shop = shop.filter((e) => e.id !== removeItem);
  }
  const incID = Number(e.target.dataset.plus);
  const decID = Number(e.target.dataset.minus);
  const product = data.find(e => e.id === decID || incID === e.id);
  if (incID) {
    if (product.count > 0) {
      for (let i of shop) {
        if (i.id === incID) {
          i.userCount += 1;
          i.userPrice = i.userCount * i.price;
          product.count -= 1;
        }
      }
    }
  }
  if (decID) {
    for (let i of shop) {
      if (i.id === decID && i.userCount > 0) {
        i.userCount -= 1;
        i.userPrice = i.userCount * i.price;
        product.count += 1;
      }
      if (i.userCount == 0) {
        shop.forEach((item, index) =>
          item.userCount == 0 ? shop.splice(index, 1) : 0
        );
      }

    }
  }
  shopRender()
  Render();
});


clearBtn.addEventListener("click", (e) => {
  shop.length = 0;
  shopWrapper.innerHTML = ''
})