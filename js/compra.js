//POST PEDIDO
document.getElementById('buy-cart').addEventListener('click', async () => {

    allProducts = allProducts.map(product => {
        //PARA NO GUARDAR LA IMAGEN EN LA BBDD
        let newProduct = {...product};
        delete newProduct.image;
        return newProduct;
    });

    try{
        const res = await fetch('http://localhost:5500/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([allProducts]),
        });

        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    }
    catch (err) {
        console.log("Ha ocurrido un error en la solicitud:", err.message);
    }
});

// Path: APP/frontend/Web/js/compra.js