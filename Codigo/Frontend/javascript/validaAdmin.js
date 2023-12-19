document.addEventListener("DOMContentLoaded", function() {
    const userType = localStorage.getItem('tipoUsuario');

    if (userType !== 'ADMIN') {
        alert("Acesso restrito apenas para administradores.");
        window.location.href = '../Pages/teladelogin.html';
    }
});