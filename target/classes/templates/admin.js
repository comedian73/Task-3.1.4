async function populate() {

    const request = "http://localhost:8081/users-list";
    let response = await fetch(request);
    let listUsers = await response.text();

    const request1 = "http://localhost:8081/role-list";
    let response1 = await fetch(request1);
    let listRole = await response1.text();
    let role = $('#role');
    let editRole = $('#edit-role');

    const req = "http://localhost:8081/authentication-user"
    let res = await fetch(req);
    let user = await res.text();

    fillTable(listUsers)
    fillRole(listRole, role);
    fillRole(listRole, editRole);
    navUser(user);
}

function navUser(user) {
    const data = JSON.parse(user);
    let uName = document.getElementById('nav-user')
    let uRole = document.getElementById('nav-role');
    let x = ''
    uName.innerText = data['username']
    for (let i in data['roles']) {
        x += data['roles'][i]['name']
    }
    uRole.innerText = x.replace(/ROLE_/g, ' ');
}

function fillTable(listUsers) {
    const data = JSON.parse(listUsers);
    let body = document.getElementById('table-info-body')
    if(document.getElementById('table-info-body')){
        body.innerHTML = '';
    }

    $('#table-info-body').append(`
            ${data.map(n => `
                <tr>
                    <td>${n.id}</td>
                    <td>${n.username}</td>
                    <td>${n.firstName}</td>
                    <td>${n.lastName}</td>
                    <td>${n.email}</td>
                    <td>${n.password}</td>
                    <td>${Object.values(n.roles).map(n =>`${n.name.replace(/ROLE_/g,' ')}`)}</td>
                    <td><button type="submit" class="btn btn-danger" data-type="delete">Удалить</button></td>
                    <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#edit" data-type="edit" onclick="tableButton()">Изменить</button></td>
                </tr>`).join('')}
            `);
}

function fillRole(listRole, role) {
    const data = JSON.parse(listRole);
    role.append(`
            ${data.map(n => `
                <option value = "${n.id}">${n.name}</option>
            `)}
        `)
}

populate();

function tableButton() {
    const table = document.getElementById('table-info-body');
    const btn = document.getElementById('edit-save');
    table.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') return;
        const tr = e.target.closest('tr');
        if (e.target.dataset.type === 'edit') editRow(tr);
        if (e.target.dataset.type === 'delete') deleteRow(tr);
        btn.addEventListener('click', () => {
            if ($('#edit-password').value == null) editPass(tr);
        })
    });
}

function editRow(tr) {
    $("#edit-id").attr("value", tr.cells[0].innerText);
    $("#edit-login").attr("value", tr.cells[1].innerText);
    $("#edit-first_name").attr("value", tr.cells[2].innerText);
    $("#edit-last_name").attr("value", tr.cells[3].innerText);
    $("#edit-email").attr("value", tr.cells[4].innerText);
}

function editPass(tr) {
    $("#edit-password").attr("value", tr.cells[5].innerText);
}

function deleteRow(tr) {
    let id = tr.cells[0].innerText;
    let request = 'http://localhost:8081/user/delete/' + id;
    fetch(request, {
        method: 'DELETE',
    });
    tr.parentElement.removeChild(tr);
}

let addForm = document.getElementById('addForm')
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(addForm)
    fetch('/addNewUser', {
        method: 'POST',
        body: formData
    });
    $('form input[type=text], input[type=password], input[type=email]').val('')
})

let editForm = document.getElementById('edit-form')
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(editForm)
    fetch('/edit-user', {
        method: 'POST',
        body: formData
    });
    this.hidden
})