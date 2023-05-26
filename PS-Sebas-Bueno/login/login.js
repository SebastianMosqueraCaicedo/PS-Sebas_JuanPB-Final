import { logInUser } from '../firebase.js'

const buttonLogIn = document.querySelector('#form-button')
buttonLogIn.addEventListener('click', (e) => logIn(e))

async function logIn(e) {
	e.preventDefault();
	const email = document.getElementById('email-input').value
	const pass = document.getElementById('pass-input').value


	const userCreated = await logInUser(email, pass)
	if (userCreated.status) {
		alert('Sesion iniciada, uid: ' + userCreated.info)
	} else {
		alert(userCreated.info)
	}

}
