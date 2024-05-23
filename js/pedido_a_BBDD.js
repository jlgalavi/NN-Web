//POST PEDIDO
const itemConfirmarCompra = document.getElementById('confirmar-compra');
const productos = JSON.parse(localStorage.getItem('productos'));
console.log(productos);
function postPedido(){

    itemConfirmarCompra.addEventListener('click', async () => {
        try{
            const res = await fetch('http://localhost:5501/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productos),
            });
    
            if(!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        catch (err) {
            console.log("Ha ocurrido un error en la solicitud:", err.message);
        }
    });
}

postPedido();


