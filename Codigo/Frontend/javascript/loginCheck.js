document.addEventListener("DOMContentLoaded", function() {
    const logado = localStorage.getItem('logado') === 'true';

    if (!logado) {
        window.location.href = '../Pages/loginPage.html';
    }
}); 