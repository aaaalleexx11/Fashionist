document.addEventListener('DOMContentLoaded', showUser);


const addUserBtn = document.getElementById('addUserBtn');
const userForm = document.getElementById('userForm');
const tableBody = document.getElementById('tableBody');
const userModal = new bootstrap.Modal(document.getElementById('userModal'));


function cleanHTML() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}
addUserBtn.addEventListener('click', () => {
    resetUserForm();
    userModal.show();
});

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(userForm);

    const userData = {
        id: formData.get('userId'),
        nombre: formData.get('userName'),
        email: formData.get('userMail'),
        direccion: formData.get('userDireccion'),
    };

    if (userData.id) {
        // Editar producto existente
        updateUser(userData);
    } else {
        // Agregar nuevo producto
        addUser(userData);
    }

    userModal.hide();
});

function resetUserForm() {
    const userForm = document.getElementById('userForm');
    userForm.reset();
    userForm.querySelector('#userId').value = '';
}

function addUser(userData) {
    userData.id = Date.now();
    usuarios.push(userData);
    showUser();
}

function updateUser(userData) {
    try {
        const index = usuarios.findIndex(usuario => usuario.id == userData.id);
        if (index !== -1) {
            usuarios[index] = userData;
            showUser();
            console.log("User updated successfully");
        } else {
            console.error("Product not found for update");
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }

}





function deleteUser(userId) {
    usuarios = usuarios.filter(usuario => usuario.id !== userId);
    showUser();
}

function showUser() {
    cleanHTML();

    usuarios.forEach(user => {
        const { nombre, email, id, direccion } = user;

        const tableRow = document.createElement('TR');
        tableRow.dataset.id = id;

        const tableHead = document.createElement('TH');
        tableHead.setAttribute("scope", "row");
        tableHead.textContent = id;

        const tableDataUser = document.createElement('TD');
        tableDataUser.textContent = nombre;

        const tableDataEmail = document.createElement('TD');
        tableDataEmail.textContent = email;

        const tableDataDireccion = document.createElement('TD');
        tableDataDireccion.textContent = direccion;

        //Boton para eliminar las citas
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2', 'mb-2', 'mt-2');
        btnEliminar.innerHTML =
            'Eliminar';

        btnEliminar.onclick = () => deleteUser(id);

        //Boton para editar una cita
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-info', 'mb-2');
        btnEditar.innerHTML =
            'Actualizar';

        btnEditar.onclick = () => editUser(id);

        tableRow.appendChild(tableHead);
        tableRow.appendChild(tableDataUser);
        tableRow.appendChild(tableDataEmail);
        tableRow.appendChild(tableDataDireccion);
        tableRow.appendChild(btnEliminar);
        tableRow.appendChild(btnEditar);


        tableBody.appendChild(tableRow);
    });
}

function editUser(userID) {
    const user = usuarios.find(user => user.id === userID);
    if (user) {
        const userForm = document.getElementById('userForm');
        userForm.querySelector('#userId').value = user.id;
        userForm.querySelector('#userName').value = user.nombre;
        userForm.querySelector('#userMail').value = user.email;
        userForm.querySelector('#userDireccion').value = user.direccion;

        userModal.show();
    }
}