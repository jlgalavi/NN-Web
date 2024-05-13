const url = "ws://broker.emqx.io:8083/mqtt"
var client = mqtt.connect(url);

const carritoElement = document.getElementById('carrito-compra');

function PublicarPedido(){
    client.on('connect', function () {
        carritoElement.addEventListener('click',() => {
            const productos = JSON.parse(localStorage.getItem("products"));
            for (let i = 0; i < productos.length; i++) {
                delete productos[i].img;
                delete productos[i].price;
                delete productos[i].title;
                delete productos[i].size;
            }
            if(productos && productos.length > 0){
                console.log(productos);
                client.subscribe('giirob/pr2/B1/infopedido', function (err) {
                    if (!err) {
                        client.publish('giirob/pr2/B1/infopedido', JSON.stringify(productos), function(err) {
                            if(err) {
                                console.log("Error al publicar el mensaje", err);
                            }
                        });
                    } 
                    else{
                        console.log("Error al suscribirse al topic", err);
                    }
                });
            }
            else{
                console.log("No hay productos en el carrito");
            }
        });
    });
}

PublicarPedido();




    

