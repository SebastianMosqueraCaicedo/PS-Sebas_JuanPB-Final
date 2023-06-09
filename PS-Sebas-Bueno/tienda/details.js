// divisores para mostrar detalle o tienda
let specifications = document.getElementById("specific-product");
let closeWindow = document.getElementById("product-section")

export function setDetailsInfo(obj__) {
    specifications.style.display = "flex"
    specifications.innerHTML= 
    `<button class="store-product-back" 
    	onclick=goback()><img src="/assets/back.png"></button>
    <img id="img-producto" class="store-product-img" src="${obj__.img[0]}">  
    <section id="specific-info" class="store-product-section">
        <h1 id="specific-name" class="store-product-name"> ${obj__.name}</h1>
        <h2 class="store-product-price">${obj__.price}</h2>
        <h3 class="store-product-category">${obj__.cat}</h3>
        <p class="store-product-description">${obj__.desc}</p>
		<div id="color-options">
		<h3>Select a color:</h3>
		<div class="color-option" onclick="setColor('red')" style="background-color: red;"></div>
		<div class="color-option" onclick="setColor('blue')" style="background-color: blue;"></div>
		<div class="color-option" onclick="setColor('green')" style="background-color: green;"></div>
		<div class="color-option" onclick="setColor('yellow')" style="background-color: yellow;"></div>
	  </div>
	<button class="store-product-button" onclick=addItem()> Add to cart </button>

<div id="product-container">
  <!-- Contenido del producto aquí -->
</div>

<div id="product-container">
  <!-- Contenido del producto aquí -->
</div>
    </section>`;

    closeWindow.style.display = "none";
}

export function goback() {
	specifications.style.display = "none";
	closeWindow.style.display = "block";

	while (specifications.firstChild){
		specifications.removeChild(specifications.firstChild);
	}
}
