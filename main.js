// Declaración de variables
let continuarComprando = true;
let total = 0

// Función para mostrar los productos disponibles
function mostrarProductos() {
    console.log("Productos disponibles:");
    console.log("1. AMD Ryzen 9 - $300000");
    console.log("2. Intel I9 - $300000");
    console.log("3. Ati RX580 - $100000");
    console.log("4. Nvidia 4090 - $1400000");
    console.log("5. mother Asus  - $70000");
    console.log("6. mother Gigabyte - $80000");
    console.log("7. Gabinete - $40000");
}

// Función para agregar un producto al carrito
function agregarCarrito(producto, total) {
        switch (producto) {
        case "1":
            total = total + 300000
            console.log("AMD Ryzen 9 -> Agregado");
        break;
        case "2":
            total = total + 300000
            console.log("Intel I9 -> Agregado");
        break;
        case "3":
            total = total + 100000
            console.log("Ati RX580 -> Agregado");
        break;
        case "4":
            total = total + 1400000
            console.log("Nvidia 4090 -> Agregado");
        break;
        case "5":
            total = total + 70000
            console.log("mother Asus -> Agregado");
        break;
        case "6":
            total = total + 80000
            console.log("mother Gigabyte -> Agregado");
        break;
        case "7":
            total = total + 40000
            console.log("Gabinete -> Agregado");
        break;
        case "ESC":
        break;
        default:
            console.log("Opción inválida.");
        break;
}
return total
}

// Programa principal
console.log("Bienvenido a TiendaGamer")
mostrarProductos()

while (continuarComprando) {
    let opcion = prompt("Ingrese el número del producto que desea agregar al carrito.\nESC para finalizar:")
    opcion = opcion.toUpperCase()
    if (opcion === "ESC") {
        continuarComprando = false;
        console.log("Compra finalizada.");
        console.log("El costo de la compra es: $" + total);
    }else {
        total = agregarCarrito(opcion, total);
    }
}