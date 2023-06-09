// Componente Header para desktop
function HeaderDesktop() {
    return `
        <div class="header-block">
          <div>
            <img src="/assets/ps_logo.png" alt="">
            <input placeholder="Search" type="text">    
          </div>
          <div class="header-navegacion">
            <a href="/index.html">
              <img src="/assets/home.png">
            </a>
            <a href="/tienda/tienda.html">
              <img src="/assets/shop.png">
            </a>
            <a href="/carrito/carrito.html">
              <img src="/assets/cart.png">
	      <p id="cart-num"></p>
            </a>
            <a>
              <img id="nav-pfp" src="/assets/user.png">
            </a>
          </div>
          <div>
            <button onclick="window.location.href='/login/index.html';">Log In</button>
            <button onclick="window.location.href='/sign-up/index.html';">Sign Up</button>
            <button id="btn-logout" style="display: none;">Log Out</button>
          </div>
        </div>
    `;
  }
  
  // Componente Header para mobile
  function HeaderMobile() {
    return `
        <div class="header-block">
          <img src="/assets/ps_logo.png" alt="">
          <input placeholder="Search" type="text">
          <a href="javascript:void(0);" class="ham-icon" onclick="hamburguer()">
            <img src="/assets/menu.png">
          </a>
        </div>
        <div class="ham-block">
          <div class="header-navegacion" id="ham-hidden">
            <a href="/index.html">
              <img src="/assets/home.png">
            </a>
            <a href="/tienda/tienda.html.html">
              <img src="/assets/shop.png">
            </a>
            <a href="/carrito/carrito.html">
              <img src="/assets/cart.png">
	      <p id="cart-num"></p>
            </a>
            <a>
              <img id="nav-pfp" src="/assets/user.png">
            </a>
            <div class="ham-buttons" id="ham-buttons">
		    <button onclick="window.location.href='/login/index.html';">Log In</button>
		    <button onclick="window.location.href='/sign-up/index.html';">Sign Up</button>
		    <button id="btn-logout">Log Out</button>
            </div>
          </div>
        </div>
    `;
  }
  
  
