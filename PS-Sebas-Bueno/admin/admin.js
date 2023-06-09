import {addProduct} from "/firebase.js"
const sendButt = document.getElementById('ad-send');

const ad_name = document.getElementById("ad-name");
const ad_desc = document.getElementById("ad-desc");
const ad_price = document.getElementById("ad-price");
const ad_date = document.getElementById("ad-date");
const ad_cat = document.getElementById("ad-cat");
const ad_col = document.getElementById("ad-col");
const ad_img = document.getElementById("ad-img");

let inputs = [ad_name, ad_desc, ad_price, ad_date, ad_cat, ad_col, ad_img];

let newItem = {
	"name": "",
	"desc": "",
	"price": 0,
	"date": "",
	"cat": "",
	"col": "",
	"img": [""]
}

function uploadItem(){
	let num_price = Number(ad_price.value);

	newItem.name = ad_name.value;
	newItem.desc = ad_desc.value;
	newItem.price = num_price;
	newItem.date = ad_date.value;
	newItem.cat = ad_cat.value;
	newItem.col = ad_col.value;
	newItem.img[0] = ad_img.value;

	addProduct(newItem);

	ad_name.value=null;
	ad_desc.value=null;
	ad_price.value=null;
	ad_date.value=null;
	ad_cat.value=null;
	ad_col.value=null;
	ad_img.value=null;
}

sendButt.addEventListener('click', uploadItem);
