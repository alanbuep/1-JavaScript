// Declaración de variables
let continuarComprando = true;
let continuarAgregando = true;
let total = 0
let carrito = []
let busqueda = []

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

// Actualizo la lista si es que esta guardada
cargarLista()

// Eventos
let boton1 = document.getElementById("verTodo")
boton1.addEventListener("click",function() {mostrarProductos(lista)})
let boton2 = document.getElementById("verCarrito")
boton2.addEventListener("click", mostrarCarrito)
let boton3 = document.getElementById("addProducto")
boton3.addEventListener("click", agregarProducto)

let searchForm = document.getElementById('searchForm')
searchForm.addEventListener('submit', function(event) {
    event.preventDefault()
    let palabraBuscada = document.getElementById('searchInput').value.trim().toLowerCase()
    filtrarProductos(palabraBuscada)
    }
)

// Funcion crear card de venta
function crearCardVenta(producto){
    const newCard = document.createElement("div");
    newCard.className = "card"
    newCard.style.width = "18rem"
    newCard.innerHTML = `
        <div class="card-body">
            <h3 class="card-text">${producto.nombre}</h3>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text stock-text">Stock disponible: ${producto.stock}</p>
            <p class="text-primary">Precio efectivo o transferencia</p>
            <p class="text-primary">$${producto.precio}</p>
            <button id="addCarrito" class="btn btn-success" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-descripcion="${producto.descripcion}" data-stock="${producto.stock}">Añadir al carrito</button>
        </div>
    `
    const contenedor = document.getElementById("mostrarProductos")
    contenedor.appendChild(newCard)

    const btnAdd = newCard.querySelector("#addCarrito")
    btnAdd.addEventListener("click", function() {
        const nombre = this.getAttribute("data-nombre")
        const precio = parseFloat(this.getAttribute("data-precio"))
        const descripcion = this.getAttribute("data-descripcion")
        const stock = parseInt(this.getAttribute("data-stock"))

        if (stock > 0) {
            const productoCarrito = new ProductoCarrito(nombre, precio, descripcion)
            carrito.push(productoCarrito)

            this.setAttribute("data-stock", stock - 1)
            const stockText = this.parentElement.querySelector(".stock-text")
            stockText.textContent = `Stock disponible: ${stock - 1}`
            const productoEnLista = lista.find(item => item.nombre === nombre);
            if (productoEnLista) {
                productoEnLista.stock -= 1
            }
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado al carrito ' + nombre,
                showConfirmButton: false,
                timer: 1200
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay productos disponibles',
            })
        }
    })
}

// Funcion crear card de carrito
function crearCard(producto){
    const newCard = document.createElement("div");
    newCard.className = "card"
    newCard.style.width = "18rem"
    newCard.innerHTML = `
        <div class="card-body">
            <h3 class="card-text">${producto.nombre}</h3>
            <p class="card-text">${producto.descripcion}</p>
            <p class="text-primary">Precio efectivo o transferencia</p>
            <p class="text-primary">$${producto.precio}</p>
        </div>
    `
    const contenedor = document.getElementById("mostrarProductos")
    contenedor.appendChild(newCard)
}

// Función para mostrar los productos disponibles
function mostrarProductos(list) {
    const contenedor = document.getElementById("mostrarProductos")
    contenedor.innerHTML = `<h2 class="gap-4 text-white title-h2">Productos:</h2>`
    for(let i = 0; i < list.length; i++){
        crearCardVenta(list[i])
    }
}

// Función para mostrar los productos del carrito
function mostrarCarrito (){
    const contenedor = document.getElementById("mostrarProductos")
    let total = precioCompra()
    if(total > 0){
    contenedor.innerHTML = `<div class="container">
                            <h2 class="gap-4 text-white title-h2">Productos:</h2>
                            <p class="text-primary">El total es: ${total}</p>
                            <button id="cancelCompra" type="button" class="btn btn-primary btn-secondary">Cancelar Compra</button>
                            <button id="endCompra" type="button" class="btn btn-primary btn-secondary">Finalizar Compra</button>
                            </div>`
    for(let i = 0; i < carrito.length; i++){
        crearCard(carrito[i])
    }

    let boton4 = document.getElementById("endCompra")
    boton4.addEventListener("click", finCompra)

    let boton5 = document.getElementById("cancelCompra")
    boton5.addEventListener("click", cancelCompra)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos',
        })
    }
}

// Función para filtrar productos
function filtrarProductos(palabraBuscada){
    let resultado = lista.filter( (x)=>x.nombre.toLocaleLowerCase().includes(palabraBuscada))

    if(resultado.length > 0){
        mostrarProductos(resultado)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontro el producto: '+ palabraBuscada,
        })
    }
}

// Funcion para agregar productos a la tienda
function agregarProducto(){
    let usuario = prompt("Ingrese contraseña (admin)")
    if(usuario === "admin"){
        let nombre = prompt("Nombre del producto a agregar").trim()
        let precio = parseFloat(prompt("Precio del producto a agregar"))
        let stock = parseInt(prompt("Stock del producto a agregar"))
        let descripcion = prompt("Descripción del producto a agregar")

        if(isNaN(nombre ==="" || descripcion ==="" || precio) || isNaN(stock)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese datos válidos',
            })
        return;
        }
        
        let producto = new Producto(nombre,precio,stock,descripcion)
        
        if (lista.some((p)=>(p.nombre === producto.nombre))){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El producto ya existe',
            })
            return;
        }

        lista.push(producto)

        Swal.fire({
            title: 'Quiere guardar la lista de productos?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `No, despues`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                guardarLista()
            } else if (result.isDenied) {
                Swal.fire('Recuerde guardar', '', 'info')
            }
        })
    }
}

// Funcion para calcular el total de la compra
function precioCompra(){
    for(let i = 0; i < carrito.length; i++){
        total = carrito[i].precio + total
    }
    return total
}

// Guardar lista de productos
function guardarLista(){
    const listaJSON = JSON.stringify(lista)
    localStorage.setItem("listaData",listaJSON)
    Swal.fire('Guardado en local Storage!', '', 'success')
}

// Funcion cancelar compra
function cancelCompra(){
    carrito.forEach(productoCarrito => {
        const producto = lista.find(item => item.nombre === productoCarrito.nombre)
        if (producto) {
            producto.stock += 1
        }
    })
    carrito = []
    cargarLista()
    Swal.fire({
        title: 'Compra cancelada',
        icon: 'warning',
        confirmButtonText: 'Ok',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "index.html"
        }
    })
}

// Funcion finalizar compra
function finCompra(){
    const listaJSON = JSON.stringify(lista)
    localStorage.setItem("listaData",listaJSON)
    carrito = []
    cargarLista()
    Swal.fire({
        title: 'Gracias por su compra!',
        confirmButtonText: 'Ok',
    }).then((result) => {
        if (result.isConfirmed) {
        window.location.href = "index.html"
        }
    })
    
}

// Chequear y actualizar lista de productos guardada
function cargarLista(){
    const listaData = localStorage.getItem("listaData")
    if (listaData) {
        const listaJSON = JSON.parse(listaData)
        if (listaJSON.length > 0) {
            lista = listaJSON
        }
    }
}