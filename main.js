// Declaración de variables
let continuarComprando = true
let continuarAgregando = true
let total = 0
let carrito = []
let busqueda = []
// Lista de productos
let lista = []

const Producto = function (nombre, precio, imagen, stock){
    this.nombre=nombre
    this.precio=precio
    this.imagen=imagen
    this.stock=stock
}

const ProductoCarrito = function (nombre, precio, imagen){
    this.nombre=nombre
    this.precio=precio
    this.imagen=imagen
}

// Cargo los productos a la lista
cargarLista()

// Eventos
let boton1 = document.getElementById("verTodo")
boton1.addEventListener("click",function() {mostrarProductos(lista)})
let boton2 = document.getElementById("verCarrito")
boton2.addEventListener("click", mostrarCarrito)
let boton3 = document.getElementById("addProducto")
boton3.addEventListener("click", agregarProducto)
let boton4 = document.getElementById("delProducto")
boton4.addEventListener("click", delProducto)

let searchForm = document.getElementById('searchForm')
searchForm.addEventListener('submit', function(event) {
    event.preventDefault()
    let palabraBuscada = document.getElementById('searchInput').value.trim().toLowerCase()
    filtrarProductos(palabraBuscada)
    }
)

