// Función para mostrar el producto
function mostrarProducto() {
    const productosContainer = document.getElementById('detalleProducto');

    const producto = JSON.parse(localStorage.getItem('productoSeleccionado'))
    
    productosContainer.innerHTML = `
    <div class="row align-items-center">
    <div class="col-md-6 mb-5 d-flex justify-content-center">
        <!-- Product image -->
        <img class="card-img-top" src="${producto.imagen}" alt="..." style="width: 150%; max-width: 5000px;" />
    </div>
    <div class="col-md-6 mb-5">
        <!-- Product details -->
        <div class="text-center">
            <!-- Nombre del producto -->
            <h4>${producto.nombre}</h4>
            <!-- Descripcion del producto -->
            <hr />
            <p>${producto.descripcion}</p>
            <hr />
            <p>${producto.descripcion_corta}</p>
            <!-- Precio del producto -->
            <hr />
            <h2 class="mt-2">$${producto.precio}</h2>
        </div>
    </div>
</div>

    `;
}


window.onload = mostrarProducto;