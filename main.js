// Creamos un objeto Moto para representar cada tipo de moto.
class Moto {
  constructor(tipo, precio) {
    this.tipo = tipo;
    this.precio = precio;
  }
}

// Creamos el catálogo de motos disponibles.
const catalogoMotos = [
  new Moto("deportiva", 5000),
  new Moto("cruiser", 4000),
  new Moto("calle", 3000),
  // Puedes agregar más modelos aquí si lo deseas.
];

const validarCantidad = (cantidad) => {
  while (Number.isNaN(cantidad) || cantidad <= 0) {
    alert("Debe ingresar una cantidad válida");
    cantidad = parseFloat(prompt("¿Cuántas deseas comprar?"));
  }

  return cantidad;
};

const comprarMotos = () => {
  let subtotal = 0;
  let seguirComprando;

  do {
    let opcionesMotos = "Opciones de Motos Disponibles:\n";
    catalogoMotos.forEach((moto) => {
      opcionesMotos += `${moto.tipo} - Precio: ${moto.precio} dólares\n`;
    });

    let moto = prompt(
      `¿Qué tipo de moto deseas comprar?\n${opcionesMotos}\nIngresa 'cancelar' para finalizar la compra.`
    );

    if (!moto || moto.toLowerCase() === "cancelar") {
      seguirComprando = false;
    } else {
      // Buscamos la moto seleccionada en el catálogo.
      const motoSeleccionada = catalogoMotos.find(
        (motoObj) => motoObj.tipo === moto.toLowerCase()
      );

      if (motoSeleccionada) {
        alert(
          `Has seleccionado: ${motoSeleccionada.tipo} - Precio: ${motoSeleccionada.precio} dólares`
        );

        let cantidad = parseFloat(prompt("¿Cuántas deseas comprar?"));
        cantidad = validarCantidad(cantidad);

        subtotal += motoSeleccionada.precio * cantidad;
      } else {
        alert("Opción inválida. Por favor, elige una opción válida.");
      }

      seguirComprando = confirm("¿Deseas seguir comprando motos?");
    }
  } while (seguirComprando);

  return subtotal;
};

let total = comprarMotos();

if (!isNaN(total) && total > 0) {
  alert("Gracias por tu compra. El total de tu compra es: " + total);
} else {
  alert("No se realizó ninguna compra.");
}
