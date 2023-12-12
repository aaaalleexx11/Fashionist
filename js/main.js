document.addEventListener('DOMContentLoaded', showProducts);


const addProductBtn = document.getElementById('addProductBtn');
const productForm = document.getElementById('productForm');
const tableBody = document.getElementById('tableBody');
const productModal = new bootstrap.Modal(document.getElementById('productModal'));


function cleanHTML() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}
addProductBtn.addEventListener('click', () => {
    resetProductForm();
    productModal.show();
});

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(productForm);

    const productData = {
        id: formData.get('productId'),
        nombre: formData.get('productName'),
        precio: parseFloat(formData.get('productPrice')),
        stock: parseInt(formData.get('productStock')),
        descripcion: formData.get('productDescription')
    };

    if (productData.id) {
        // Editar producto existente
        updateProduct(productData);
    } else {
        // Agregar nuevo producto
        addProduct(productData);
    }

    productModal.hide();
});

function resetProductForm() {
    const productForm = document.getElementById('productForm');
    productForm.reset();
    productForm.querySelector('#productId').value = '';
}

function addProduct(productData) {
    productData.id = Date.now();
    productos.push(productData);
    showProducts();
}

function updateProduct(productData) {
    try {
        const index = productos.findIndex(product => product.id == productData.id);
        if (index !== -1) {
            productos[index] = productData;
            showProducts();
            console.log("Product updated successfully");
        } else {
            console.error("Product not found for update");
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }

}





function deleteProduct(productId) {
    productos = productos.filter(product => product.id !== productId);
    showProducts();
}

function showProducts() {
    cleanHTML();

    productos.forEach(product => {
        const { nombre, descripcion, id, precio, stock } = product;

        const tableRow = document.createElement('TR');
        tableRow.dataset.id = id;

        const tableHead = document.createElement('TH');
        tableHead.setAttribute("scope", "row");
        tableHead.textContent = id;

        const tableDataProduct = document.createElement('TD');
        tableDataProduct.textContent = nombre;

        const tableDataPrecio = document.createElement('TD');
        tableDataPrecio.textContent = precio;

        const tableDataStock = document.createElement('TD');
        tableDataStock.textContent = stock;

        const tableDataDescription = document.createElement('TD');
        tableDataDescription.textContent = descripcion;

        //Boton para eliminar las citas
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2', 'mb-2', 'mt-2');
        btnEliminar.innerHTML =
            'Eliminar';

        btnEliminar.onclick = () => deleteProduct(id);

        //Boton para editar una cita
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-info', 'mb-2');
        btnEditar.innerHTML =
            'Actualizar';

        btnEditar.onclick = () => editProduct(id);


        tableRow.appendChild(tableHead);
        tableRow.appendChild(tableDataProduct);
        tableRow.appendChild(tableDataPrecio);
        tableRow.appendChild(tableDataStock);
        tableRow.appendChild(tableDataDescription);
        tableRow.appendChild(btnEliminar);
        tableRow.appendChild(btnEditar);


        tableBody.appendChild(tableRow);
    });
}

function editProduct(productId) {
    const product = productos.find(product => product.id === productId);
    if (product) {
        const productForm = document.getElementById('productForm');
        productForm.querySelector('#productId').value = product.id;
        productForm.querySelector('#productName').value = product.nombre;
        productForm.querySelector('#productPrice').value = product.precio;
        productForm.querySelector('#productStock').value = product.stock;
        productForm.querySelector('#productDescription').value = product.descripcion;

        productModal.show();
    }
}