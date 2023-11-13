async function start() {
    const req = "http://localhost:8081/authentication-user"
    let res = await fetch(req);
    let user = await res.text();
    navUser(user);
    fillTable(user);
}
start();

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

function fillTable(user) {
    const data = JSON.parse(user);
    $('#table-info-body').append(`
        <tr>
            <td>${data.id}</td>
            <td>${data.username}</td>
            <td>${data.firstName}</td>
            <td>${data.lastName}</td>
            <td>${data.email}</td>
            <td>${data.password}</td>
            <td>${Object.values(data.roles).map(n => `${n.name.replace(/ROLE_/g, ' ')}`)}</td>
        </tr>`).join('');
}