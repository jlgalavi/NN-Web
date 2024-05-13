const containerProducts = document.getElementById('productos-container');
const unidadesElement = document.getElementById('total-unidades');
const precioElement = document.getElementById('precio-unidades');
const vaciarCarritoElement = document.getElementById('vaciar-carrito');
const carritoCompraElement = document.getElementById('carrito-compra');

function showProducts() {
    containerProducts.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("products"));
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const newProduct = document.createElement("div");
            newProduct.classList.add('tarjeta-producto');
            newProduct.innerHTML = `
                    <img src="${producto.img}">
                    <h3>${producto.title}</h3>
                    <p>${producto.price} €</p>
                    <div class="buttons">
                        <button><strong>-</strong></button>
                        <span class="cantidad" id="suma-carrito">${producto.quantity}</span>
                        <button><strong>+</strong></button>
                    </div>
            `;
            const cantidadElement = newProduct.querySelector('.cantidad');
            containerProducts.appendChild(newProduct);
            newProduct
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    var numeroCarrito = addCart(producto);
                    cantidadElement.innerText = numeroCarrito;
                    updateTotals();
                });
            newProduct
                .getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    substractCart(producto);
                    showProducts();
                    updateTotals();
                });
        });
    
    }
}

updateTotals();
showProducts();

function updateTotals() {
    const productos = JSON.parse(localStorage.getItem("products"));
    let quantity = 0;
    let price = 0;
    if(productos && productos.length > 0){
        productos.forEach(producto => {
            quantity += producto.quantity;
            price += producto.price * producto.quantity;
        });
        unidadesElement.innerText = quantity;
        precioElement.innerText = price;
    }
    revisarCarritoVacio();
}

function revisarCarritoVacio(){
    const productos = JSON.parse(localStorage.getItem("products"));
    const carritoVacioElement = document.querySelector('.mensaje-carrito-vacio');
    const totalesElement = document.querySelector('#todo');
    carritoVacioElement.classList.toggle('escondido', productos && productos.length > 0);
    totalesElement.classList.toggle('escondido', !(productos && productos.length > 0));
}

revisarCarritoVacio();


vaciarCarritoElement.addEventListener('click', VaciarCarrito);

function VaciarCarrito(){
    localStorage.removeItem("products");
    updateTotals();
    showProducts();
    updateNumberCart();
}

carritoCompraElement.addEventListener('click', animacionCarga);

function animacionCarga(){
    const loadingAnimation = document.getElementById('loading-animation');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    loadingOverlay.style.display = 'none';
    loadingAnimation.style.display = 'flex';

    setTimeout(function() {
        window.location.href = "compra_exitosa.html";
        loadingAnimation.style.display = 'none';
    }, 2000);
}