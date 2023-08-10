const carrito = [];
const productoContenedor = document.getElementById("producto-contenedor");
const carritoContenedor = document.getElementById("carrito-contenedor");
const contadorCarrito = document.getElementById("contador-carrito");
const precioTotal = document.getElementById("precio-total");

productoContenedor.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar")) {
    agregarProductoAlCarrito(e.target.id);
  }
});

const agregarProductoAlCarrito = (id) => {
  const productoExistente = carrito.find((producto) => producto.id === id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    const producto = productos.find((producto) => producto.id === id);
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
};

const eliminarProductoDelCarrito = (id) => {
  const indiceProducto = carrito.findIndex((producto) => producto.id === id);
  carrito.splice(indiceProducto, 1);
  actualizarCarrito();
};

const actualizarCarrito = () => {
  carritoContenedor.innerHTML = "";
  let totalCantidad = 0;
  let totalCompra = 0;

  carrito.forEach((producto) => {
    const { id, nombre, precio, cantidad } = producto;
    totalCantidad += cantidad;
    totalCompra += precio * cantidad;

    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `
      <p>${nombre}</p>
      <p>$ ${precio}</p>
      <p>Cantidad: <span id="cantidad${id}">${cantidad}</span></p>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${id}">X</button>
    `;
    carritoContenedor.appendChild(div);
  });

  contadorCarrito.innerText = totalCantidad;
  precioTotal.innerText = totalCompra.toFixed(2);

  guardarCarritoEnStorage();
};

cargarCarrito();
