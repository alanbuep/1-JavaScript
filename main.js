// Declaración de variables
let continuarComprando = true;
let continuarAgregando = true;
let total = 0
let carrito = []

const Producto = function (nombre, precio, stock, descripcion){
    this.nombre=nombre
    this.precio=precio
    this.stock=stock
    this.descripcion=descripcion
}

const ProductoCarrito = function (nombre, precio, descripcion){
    this.nombre=nombre
    this.precio=precio
    this.descripcion=descripcion
}

// Productos
let producto1 = new Producto("AMD Ryzen 7",300000,25,"MICRO AMD RYZEN 7 5700G")
let producto2 = new Producto("Intel I7",300000,20,"MICRO INTEL CORE I7 10700")
let producto3 = new Producto("Ati RX580",100000,15,"VIDEO RADEON RX 580 8GB ARKTEK DUAL FAN")
let producto4 = new Producto("Nvidia 4090",1400000,5,"VIDEO GEFORCE RTX 4090 24GB ASUS ROG")
let producto5 = new Producto("mother Asus",70000,30,"Mother ASUS PRIME A520M-K DDR4 AM4")
let producto6 = new Producto("mother Gigabyte",80000,32,"MOTHER GIGABYTE B660M AORUS PRO DDR4 S1700")
let producto7 = new Producto("Gabinete",40000,60,"GABINETE XFX YOROI GC-03HE 6 COOLERS RGB")

// Lista de productos
let lista = [producto1,producto2,producto3,producto4, producto5,producto6,producto7]

// Función para mostrar los productos disponibles
function mostrarProductos() {
    console.table(lista)
}

// Función para filtrar productos

function filtrarProductos(){
    let productoFiltro = prompt("Que producto desea buscar?").trim().toLocaleLowerCase()
    let resultado = lista.filter( (x)=>x.nombre.toLocaleLowerCase().includes(productoFiltro))

    if(resultado.length > 0){
        console.table(resultado)
    }else{
        alert("No se encontro el producto: " + productoFiltro)
    }
}

// Funcion para agregar productos a la tienda
function agregarProducto(){
    let nombre = prompt("Nombre del producto a agregar").trim()
    let precio = parseFloat(prompt("Precio del producto a agregar"))
    let stock = parseInt(prompt("Stock del producto a agregar"))
    let descripcion = prompt("Descripción del producto a agregar")

    if(isNaN(nombre ==="" || descripcion ==="" || precio) || isNaN(stock)){
        alert("Ingrese datos válidos")
    return;
    }
    
    let producto = new Producto(nombre,precio,stock,descripcion)
    
    if (lista.some((p)=>(p.nombre === producto.nombre))){
        alert("El producto ya existe")
        return;
    }

    lista.push(producto)
    console.log("Producto " + producto.nombre + " agregado")
}

// Función para agregar un producto al carrito
function agregarCarrito(producto) {
    if(producto >= lista.length || isNaN(producto ==="")){
        alert("Ingrese un producto valido")
        return;
    }
    if(lista[producto].stock == 0){
        alert("No hay stock")
    }else{
    let nombre = lista[producto].nombre
    let precio = lista[producto].precio
    let descripcion = lista[producto].descripcion

    let productoCarrito = new ProductoCarrito(nombre,precio,descripcion)

    carrito.push(productoCarrito)
    console.log("Producto " + productoCarrito.nombre + " agregado")
    }
}

// Funcion para calcular el total de la compra
function precioCompra(){
    for(let i = 0; i < carrito.length; i++){
        total = carrito[i].precio + total
    }
    return total
}

let botonBuscar = document.getElementById("buscar")

botonBuscar.addEventListener("click",filtrarProductos)

// Programa principal
console.log("Bienvenido a TiendaGamer")
while(1){
continuarComprando = true;
continuarAgregando = true;
total = 0
carrito = []
let usuario = prompt("Usted es cliente o empleado?").trim().toLocaleLowerCase()
    switch(usuario){
        case "cliente":
            mostrarProductos()
            while (continuarComprando) {
                let opcionCliente = prompt("Ingrese el índice del producto que desea agregar al carrito.\nESC para finalizar:").toLocaleUpperCase()
                if (opcionCliente === "ESC") {
                    continuarComprando = false;
                    console.log("Compra finalizada.")
                    console.table(carrito)
                    let total = precioCompra()
                    console.log("El costo de la compra es: $" + total);
                }else{
                    agregarCarrito(opcionCliente)
                }
            }
        break;
        case "empleado":
            while (continuarAgregando) {
                agregarProducto()
                let opcionEmpleado = prompt("Desea seguir agregando productos, Presione aceptar.\nESC para finalizar:").toLocaleUpperCase()
                if (opcionEmpleado === "ESC") {
                    continuarAgregando = false
                    mostrarProductos()
                }
            }
        break;
        default:
            alert("Error de incio")
        break;
    }
}