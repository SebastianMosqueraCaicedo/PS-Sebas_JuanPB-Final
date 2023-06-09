import {getProdcuts, addProductWithId} from '../firebase.js'
import {setDetailsInfo, goback} from '/tienda/details.js'

// product db
let allProducts;

// filtros
let items, itemsFilter, itemSelect, filterInput, filters;

// filtro desplegable
filterInput = document.getElementById("store-filter");
filterInput.addEventListener('click', catFilter, {once:false});
let fValue = filterInput.value;

// boton filtro
let filterButton = document.getElementById("button-update");
filterButton.addEventListener('click', catFilter, {once:false});

async function updateProducts(){
	itemsFilter = await getProdcuts();
}

let cart = [];
cart = cart.concat(localStorage['cart']);

function catFilter() {
	fValue = filterInput.value;
	updateItems();
}

function filterItems(){
	itemsFilter = [...items];

	filters = {
		price: [document.getElementById('pr-min').value,
			document.getElementById('pr-max').value]
	};

	if(filters.price[0] === '' || filters.price[0] === undefined) {
		filters.price[0] = 0;
	}

	if(filters.price[1] === '' || filters.price[1] === undefined) {
		filters.price[1] = 999999;
	}

	const itemsPrice = itemsFilter.filter(obj => (obj.price > filters.price[0] 
		&& obj.price < filters.price[1]));

	itemsFilter = itemsPrice;
	
	updateItems();
}

function clearFilters() {
	document.getElementById('pr-min').value = '';
	document.getElementById('pr-max').value = '';
	filterInput.value = '';

	filterItems();
}

function updateItems() {
	const itemList = document.getElementById("store-list-section");
	console.log(itemsFilter);
	console.log(items);

	while (itemList.firstChild){
		itemList.removeChild(itemList.firstChild);
	}

	for (let j = 0; j < itemsFilter.length; j++){
		if(itemsFilter[j].cat === fValue || fValue === "") {
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

			let p = document.createElement("p");
			p.textContent = `${itemsFilter[j].desc}`;

			section.append(p);

			let button = document.createElement("button");
			button.value = j;
			button.addEventListener("click", function (e) 
				{setDetailsInfo(itemsFilter[e.target.value]);}
			);
			button.textContent = "See More";

			section.append(button);

			article.append(section);

			itemList.append(article);
		}
	}
	console.log(localStorage['add']);
	console.log(localStorage['cart']);
}

function setColor(color) {
	let productContainer = document.getElementById("product-container");
	productContainer.style.backgroundColor = color;
	
	// Desactivar todas las opciones de color
	let colorOptions = document.getElementsByClassName("color-option");
	for (let i = 0; i < colorOptions.length; i++) {
	  colorOptions[i].classList.remove("active");
	}
	
	// Activar la opción de color seleccionada
	event.target.classList.add("active");
}

await updateProducts();
updateItems();

if (localStorage['add'] != undefined) {
	cart.push(localStorage['add']);
	localStorage['cart'] = cart;
	console.log(localStorage['cart']);
	localStorage['add'] = undefined;
}
