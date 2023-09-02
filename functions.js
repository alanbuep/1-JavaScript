// Guardar lista de productos
function guardarLista(){
    const listaJSON = JSON.stringify(lista)
    localStorage.setItem("listaData",listaJSON)
    Swal.fire('Guardado en local Storage!', '', 'success')
}

// Guardar carrito
function guardarCarrito(){
    const carritoJSON = JSON.stringify(carrito)
    localStorage.setItem("carritoData",carritoJSON)
}

// Chequear y actualizar lista de productos guardada
function cargarLista(){
    const listaData = localStorage.getItem("listaData")
    const carritoData = localStorage.getItem("carritoData")
    if (carritoData) {
        const carritoJSON = JSON.parse(carritoData)
        if (carritoJSON.length > 0) {
            carrito = carritoJSON
        }
    }
    if (listaData) {
        const listaJSON = JSON.parse(listaData)
        if (listaJSON.length > 0) {
            lista = listaJSON
        }
    }else{
        fetch('https://fakestoreapi.com/products/category/electronics')
        .then(response => response.json())
        .then(productos => {
            productos.forEach(producto => {
                const precio = parseInt(producto.price * 1000)
                const stock = Math.round(Math.random() * 100) + 10
                lista.push(new Producto(producto.title, precio, producto.image, stock))
            })
        const listaJSON = JSON.stringify(lista)
        localStorage.setItem("listaData",listaJSON)
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al cargar los productos',
            })
            return
        })
    }
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
    guardarCarrito()
    guardarLista()
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
    guardarCarrito()
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

// Funcion para agregar productos a la tienda
async function agregarProducto() {
    const { value: password } = await Swal.fire({
        title: 'Ingrese la contraseña (admin)',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Ingrese contraseña',
        inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off'
        }
    })

    if (password === "admin" || password === "ADMIN") {
        const contenedor = document.getElementById("mostrarProductos")
        contenedor.innerHTML = `<h2 class="gap-4 text-white title-h2">Producto a agregar:</h2>
        <div class="input-group mb-3">
            <span class="input-group-text">Nombre del Producto</span>
            <input id="nombreProducto" type="text" class="form-control" placeholder="Ingrese el nombre del producto" aria-label="Username" aria-describedby="basic-addon1">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">$</span>
            <input type="text" class="form-control" id="precioProducto" placeholder="Ingrese el precio del producto" aria-label="Amount (to the nearest dollar)">
            <span class="input-group-text">.00</span>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Unidades:</span>
            <input id="stockProducto" type="text" class="form-control" placeholder="Ingrese el stock del producto" aria-label="Username" aria-describedby="basic-addon1">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">URL:</span>
            <input id="imagenProducto" type="text" class="form-control" placeholder="Ingrese la url de la imagen" aria-label="Username" aria-describedby="basic-addon1">
        </div>

        <div class="input-group mb-3">
        <button id="addLista" class="btn btn-success">Agregar producto</button>
        </div>`

        const botonAgregar = document.getElementById('addLista')
        botonAgregar.addEventListener('click', function () {
            const nombre = document.getElementById('nombreProducto').value.trim().toLocaleLowerCase()
            const precio = parseFloat(document.getElementById('precioProducto').value)
            const stock = parseInt(document.getElementById('stockProducto').value)
            const imagen = document.getElementById('imagenProducto').value

            if (isNaN(precio) || isNaN(stock) || nombre === '' || imagen === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingrese datos válidos',
                }).then((result) => {
                    document.getElementById('nombreProducto').value = ''
                    document.getElementById('precioProducto').value = ''
                    document.getElementById('stockProducto').value = ''
                    document.getElementById('imagenProducto').value = ''
                })
                return
            }

            const producto = new Producto(nombre, precio, imagen, stock)

            if (lista.some((p) => p.nombre === producto.nombre)){
                Swal.fire({
                    title: 'El producto ya existe',
                    text: '¿Desea sobreescribirlo?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sobreescribir',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        pushLista(producto)
                    } else if (result.dismiss === Swal.DismissReason.cancel){
                        document.getElementById('nombreProducto').value = ''
                        document.getElementById('precioProducto').value = ''
                        document.getElementById('stockProducto').value = ''
                        document.getElementById('imagenProducto').value = ''
                    }
                })
                return
            }
            pushLista(producto)
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña Incorrecta',
        }).then((result) => {
            if (result.isConfirmed) {
            window.location.href = "index.html"
            }
        })
    }
}

// Funcion para agregar productos a la tienda
async function delProducto() {
    const { value: password } = await Swal.fire({
        title: 'Ingrese la contraseña (admin)',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Ingrese contraseña',
        inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off'
        }
    })

    if (password === "admin" || password === "ADMIN") {
        mostrarProdDel()
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña Incorrecta',
        }).then((result) => {
            if (result.isConfirmed) {
            window.location.href = "index.html"
            }
        })
    }
}

// Funcion para calcular el total de la compra
function precioCompra(){
    total = 0
    for(let i = 0; i < carrito.length; i++){
        total = carrito[i].precio + total
    }
    return total
}

// Funcion para pushear el producto
function pushLista(producto){
    let productoQuitar = lista.find(item => item.nombre === producto.nombre)
    if (productoQuitar) {
        let index = lista.indexOf(productoQuitar)
        lista.splice(index, 1)
    }
    lista.push(producto)
    document.getElementById('nombreProducto').value = ''
    document.getElementById('precioProducto').value = ''
    document.getElementById('stockProducto').value = ''
    document.getElementById('imagenProducto').value = ''

    guardarLista()
}

// Funcion para sacar el producto del inventario
function quitarDeLista(nombre) {
    let productoQuitar = lista.find(item => item.nombre === nombre)
    if (productoQuitar) {
        Swal.fire({
            title: 'Eliminar producto',
            text: 'Seguro desea eliminarlo de la lista de productos?',
            showCancelButton: true,
            confirmButtonText: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                let index = lista.indexOf(productoQuitar)
                lista.splice(index, 1)
                quitarDelCarritoElim(nombre)
                guardarLista()
                mostrarProdDel()
            }
        })
        return
    }
}

// Funcion para sacar el producto del carrito
function quitarDelCarrito(nombre) {
    let productoQuitar = carrito.find(item => item.nombre === nombre)
    if (productoQuitar) {
        let index = carrito.indexOf(productoQuitar)
        carrito.splice(index, 1)
        const productoEnLista = lista.find(item => item.nombre === nombre)
        if (productoEnLista) {
            productoEnLista.stock += 1
        }
        guardarCarrito()
        guardarLista()
        mostrarCarrito()
    }
}

// Funcion para sacar el producto del carrito al eliminarlo del inventario
function quitarDelCarritoElim(nombre) {
    let nuevoCarrito = []
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i]
        if (producto.nombre !== nombre) {
            nuevoCarrito.push(producto)
        }
    }
    carrito = nuevoCarrito
    guardarCarrito()
    guardarLista()
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
    document.getElementById('searchInput').value = ''
}

// Función para mostrar los productos disponibles
function mostrarProductos(list) {
    const contenedor = document.getElementById("mostrarProductos")
    contenedor.innerHTML = `<h2 class="gap-4 text-white title-h2">Productos:</h2>`
    for (let i = 0; i < list.length; i++) {
        const producto = list[i]
        crearCardVenta(producto)
    }
}

// Funcion mostrar productos a eliminar del inventario
function mostrarProdDel(){
    const contenedor = document.getElementById("mostrarProductos")
    contenedor.innerHTML = `<h2 class="gap-4 text-white title-h2">Productos a eliminar del inventario:</h2>`
    for(let i = 0; i < lista.length; i++){
        crearCardDel(lista[i])
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
            title: 'No hay productos en el carrito',
            icon: 'warning',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "index.html"
            }
        })
    }
}

// Funcion crear card de carrito
function crearCard(producto){
    const newCard = document.createElement("div")
    newCard.className = "card"
    newCard.style.width = "18rem"
    newCard.innerHTML = `
        <div class="card-body">
            <img src="${producto.imagen}" class="card-img-top" alt="">
            <h3 class="card-text">${producto.nombre}</h3>
            <p class="text-primary">Precio efectivo o transferencia</p>
            <p class="text-primary">$${producto.precio}</p>
            <button id="removeCarrito" class="btn btn-danger" data-nombre="${producto.nombre}">Quitar del carrito</button>
        </div>
    `
    const contenedor = document.getElementById("mostrarProductos")
    contenedor.appendChild(newCard)

    const btnRemove = newCard.querySelector("#removeCarrito")
    btnRemove.addEventListener("click", function() {
        const nombre = this.getAttribute("data-nombre")
        quitarDelCarrito(nombre)
    })
}

// Funcion crear card de venta
function crearCardVenta(producto){
    const newCard = document.createElement("div")
    newCard.className = "card"
    newCard.style.width = "18rem"
    newCard.innerHTML = `
        <div class="card-body">
            <img src="${producto.imagen}" class="card-img-top" alt="">
            <h3 class="card-text">${producto.nombre}</h3>
            <p class="card-text stock-text">Stock disponible: ${producto.stock}</p>
            <p class="text-primary">Precio efectivo o transferencia</p>
            <p class="text-primary">$${producto.precio}</p>
            <button id="addCarrito" class="btn btn-success" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-stock="${producto.stock}" data-imagen="${producto.imagen}">Añadir al carrito</button>
        </div>
    `
    const contenedor = document.getElementById("mostrarProductos")
    contenedor.appendChild(newCard)

    const btnAdd = newCard.querySelector("#addCarrito")
    btnAdd.addEventListener("click", function() {
        const nombre = this.getAttribute("data-nombre")
        const precio = parseFloat(this.getAttribute("data-precio"))
        const stock = parseInt(this.getAttribute("data-stock"))
        const imagen = this.getAttribute("data-imagen")

        if (stock > 0) {
            const productoCarrito = new ProductoCarrito(nombre, precio, imagen)
            carrito.push(productoCarrito)

            this.setAttribute("data-stock", stock - 1)
            const stockText = this.parentElement.querySelector(".stock-text")
            stockText.textContent = `Stock disponible: ${stock - 1}`
            const productoEnLista = lista.find(item => item.nombre === nombre)
            if (productoEnLista) {
                productoEnLista.stock -= 1
                guardarCarrito()
                guardarLista()
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


// Funcion crear card eliminar producto
function crearCardDel(producto){
    const newCard = document.createElement("div")
    newCard.className = "card"
    newCard.style.width = "18rem"
    newCard.innerHTML = `
        <div class="card-body">
            <img src="${producto.imagen}" class="card-img-top" alt="">
            <h3 class="card-text">${producto.nombre}</h3>
            <p class="text-primary">Precio efectivo o transferencia</p>
            <p class="text-primary">$${producto.precio}</p>
            <button id="delProducto" class="btn btn-danger" data-nombre="${producto.nombre}">Eliminar de la lista</button>
        </div>
    `
    const contenedor = document.getElementById("mostrarProductos")
    contenedor.appendChild(newCard)

    const btnRemove = newCard.querySelector("#delProducto")
    btnRemove.addEventListener("click", function() {
        const nombre = this.getAttribute("data-nombre")
        quitarDeLista(nombre)
    })
}