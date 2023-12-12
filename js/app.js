// Función para mostrar los productos en el contenedor
function mostrarProductos() {
    const productosContainer = document.getElementById('productosContainer');
    productosContainer.innerHTML = '';
    // Itera sobre el array de productos y crea un elemento para cada uno
    productos.forEach(producto => {
        const productoElement = document.createElement('div');

        productoElement.classList.add('col', 'mb-5');

        productoElement.innerHTML = `
        <div>
 <a href="javascript:void(0);" onclick="mostrarDetalle('${producto.nombre}')">
    <div class="card card-span h-100 text-black">
      <img class="img-fluid h-100" src="${producto.imagen}" alt="..." />
      <div class="card-img-overlay ps-0"> </div>
      <div class="card-body ps-0 bg-200">
        <h5 class="text-center fw-bold text-1000 text-truncate text-decoration-none">${producto.nombre}</h5>
        <div class="fw-bold text-center">
          <span class="text-600 me-2 text-decoration-line-through text-reset">$${producto.precio.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </a>
</div>

        `;

        // Agrega el elemento del producto al contenedor
        productosContainer.appendChild(productoElement);
    });
}

// Función para mostrar los detalles del producto y redirigir a producto.html
function mostrarDetalle(nombreProducto) {
    const productoSeleccionado = productos.find(producto => producto.nombre === nombreProducto);

    if (productoSeleccionado) {
      // Almacena los detalles del producto en el Local Storage
      localStorage.setItem('productoSeleccionado', JSON.stringify(productoSeleccionado));
  
      // Redirige a producto.html
      window.location.href = 'producto.html';
    }
}

function buscarProductos() {
    const searchInput = document.getElementById('searchInput');

    if(searchInput !== ''){
        // Obtiene el valor del campo de búsqueda
        const searchTerm = searchInput.value.toLowerCase();

        auxProductos = productos;

        productos = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(searchTerm)
        );
        
        mostrarProductos()

        productos = auxProductos;
    }
}

function ordenarProductos() {
    const ordenSeleccionado = document.getElementById('ordenarProductos').value;
    
    // Función para comparar el precio de dos productos de mayor a menor
    function compararPorPrecioMayor(a, b) {
        return b.precio > a.precio ? 1 : -1;
    }

    // Función para comparar el precio de dos productos de menor a mayor
    function compararPorPrecioMenor(a, b) {
        return a.precio - b.precio;
    }
    
    // Aplicar el filtro según la opción seleccionada
    if (ordenSeleccionado === 'ascendente') {
        productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (ordenSeleccionado === 'descendente') {
        productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else if (ordenSeleccionado === 'mayor') {
        productos.sort(compararPorPrecioMayor);
    } else if (ordenSeleccionado === 'menor') {
        productos.sort(compararPorPrecioMenor);
    }

    // Vuelve a mostrar los productos en la página después de ordenar
    mostrarProductos();
}

window.onload = function() {
    // Orden predeterminado, por ejemplo, ascendente
    productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarProductos();
};