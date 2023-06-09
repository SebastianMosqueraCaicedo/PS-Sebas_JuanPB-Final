// Componente Header para desktop
function HeaderDesktop() {
    return `
      <header id="header-desktop">
        <div class="header-block">
          <div>
            <img src="./assets/ps_logo.png" alt="">
            <input placeholder="Search" type="text">    
          </div>
          <div class="header-navegacion">
            <a href="./index.html">
              <img src="assets/home.png">
            </a>
            <a href="./tienda/tienda.html">
              <img src="assets/shop.png">
            </a>
            <a href="./index.html">
              <img src="assets/cart.png">
            </a>
            <a href="./index.html">
              <img src="assets/user.png">
            </a>
          </div>
          <div>
            <button onclick="window.location.href='/login/index.html';">Log In</button>
            <button onclick="window.location.href='/sign-up/index.html';">Sign Up</button>
            <button id="btn-logout">Log Out</button>
          </div>
        </div>
      </header>
    `;
  }
  
  // Componente Header para mobile
  function HeaderMobile() {
    return `
      <header id="header-mobile">
        <div class="header-block">
          <img src="./assets/ps_logo.png" alt="">
          <input placeholder="Search" type="text">
          <a href="javascript:void(0);" class="ham-icon" onclick="hamburguer()">
            <img src="assets/menu.png">
          </a>
        </div>
        <div class="ham-block">
          <div class="header-navegacion" id="ham-hidden">
            <a href="./index.html">
              <img src="assets/home.png">
            </a>
            <a href="./index.html">
              <img src="assets/shop.png">
            </a>
            <a href="./index.html">
              <img src="assets/cart.png">
            </a>
            <a href="./index.html">
              <img src="assets/user.png">
            </a>
            <div class="ham-buttons" id="ham-buttons">
              <button> Log In </button>
              <button> Register </button>
            </div>
          </div>
        </div>
      </header>
    `;
  }
  
  