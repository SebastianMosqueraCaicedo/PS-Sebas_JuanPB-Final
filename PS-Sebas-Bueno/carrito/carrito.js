import {getProdcuts, addProductWithId} from '/firebase.js'

// filtros
let itemsFilter;


async function updateProducts(){
	itemsFilter = await getProdcuts();
}


function updateItems() {
	const itemList = document.getElementById("store-list-section");
	console.log(itemsFilter);

	while (itemList.firstChild){
		itemList.removeChild(itemList.firstChild);
	}

	for (let j = 0; j < itemsFilter.length; j++){
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
		button.value = j;
		button.addEventListener("click", function (e) {
			console.log ("clicked " + e.target);
		});
		button.textContent = "Remove";

		section.append(button);

		article.append(section);

		itemList.append(article);
	}
}

await updateProducts();
updateItems();
