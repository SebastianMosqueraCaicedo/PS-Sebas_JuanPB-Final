import {getProdcuts, addProductWithId} from '/firebase.js'

// filtros
let itemsFilter, cartFilter = [];

let totalPrice = 0, cartList = [], userName = "";

function assignLS() {
        if (localStorage['cart'] != undefined){
                return cartList.concat(JSON.parse(localStorage['cart']));
        } else {
                return [];
        }
};

cartList = assignLS();

async function updateProducts(){
	itemsFilter = await getProdcuts();
}

function clearItems() {
	window.alert("All items removed from cart");
	cartList = [];
	localStorage['cart'] = JSON.stringify(cartList);
	totalPrice = 0;
	updateItems();
}

function buyItems() {
	window.alert(`Thank you ${userName} for buying with Playstation! Your total is: ${totalPrice.toString()}$`);
	cartList = [];
	localStorage['cart'] = JSON.stringify(cartList);
	totalPrice = 0;
	updateItems();
}

function updateItems() {
	const itemList = document.getElementById("store-list-section");
	console.log(itemsFilter);

	while (itemList.firstChild){
		itemList.removeChild(itemList.firstChild);
	}

	console.log(cartList);

	for (let j = 0; j < itemsFilter.length; j++){
		const isList = cartList.filter(function (element){
			if (element === itemsFilter[j].name) {
				console.log(element, itemsFilter[j]);
				return true;
			} else {
				return false;
			}
		});

		if (isList[0] === itemsFilter[j].name) {
			let article = document.createElement("article");
			article.setAttribute("class", "store-list-article");
			article.setAttribute("id", `article-${j}`);

			let img = document.createElement("img");
			img.setAttribute("class","store-article-img");
			img.setAttribute("src",`${itemsFilter[j].img[0]}`);

			article.append(img);

			let section = document.createElement("section");

			let h3 = document.createElement("h3");
			h3.textContent = `${itemsFilter[j].name}`;

			section.append(h3);

			let h4 = document.createElement("h4");
			h4.textContent = ` ${itemsFilter[j].price}$`

			section.append(h4);

			let p = document.createElement("p");
			p.textContent = `${itemsFilter[j].desc}`;

			section.append(p);

			let button = document.createElement("button");
			button.value = itemsFilter[j].name;
			button.addEventListener("click", function (e) {
				console.log ("clicked " + e.target.value);
				window.alert(`Removing ${e.target.value}...`);

				cartList = cartList.filter(r => r !== e.target.value);
				localStorage['cart'] = JSON.stringify(cartList);
				totalPrice = 0;
				updateItems();
			});
			button.textContent = "Remove";

			section.append(button);

			article.append(section);

			itemList.append(article);

			totalPrice += itemsFilter[j].price;
		}
	}

	if (cartList === []) {
		let h3 = document.createElement("h3");
		h3.textContent = `Nothing to see here...`;

		itemList.append(h3);
	}

	document.getElementById("final").textContent = `TOTAL: ${totalPrice.toString()}$`;
}

await updateProducts();
updateItems();

const clearAll = document.getElementById("clear-all");
const buyAll = document.getElementById("buy-all");

clearAll.addEventListener("click", clearItems);
buyAll.addEventListener("click", buyItems);
