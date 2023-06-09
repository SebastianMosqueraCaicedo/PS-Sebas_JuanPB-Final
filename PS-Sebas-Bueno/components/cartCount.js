const p = document.getElementById('cart-num');
let amnt;
let tempCart = [];
function checkAmnt() {
	if (localStorage['cart'] !== undefined) {
		tempCart = JSON.parse(localStorage['cart']);
		tempCart = removeDuplicates(tempCart);
		console.log(tempCart);
		amnt = tempCart.length;
		
		p.textContent = amnt.toString();
	} else {
		p.textContent = "0";
	}
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

checkAmnt();

document.addEventListener('click', checkAmnt);
