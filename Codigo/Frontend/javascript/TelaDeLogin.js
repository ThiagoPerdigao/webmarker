document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem('logado', false);
    localStorage.setItem('tipoUsuario', null);
});

$(document).ready(function() {
    $(".menu-icon").on("click", function() {
        $("nav ul").toggleClass("showing");
    });

    const formularioLogin = document.querySelector("#loginForm");
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', function (event) {
            event.preventDefault(); 

            const inputUsuario = document.querySelector("#usuario");
            const inputSenha = document.querySelector("#senha");

            const userData = {
                usuario: inputUsuario.value,
                senha: inputSenha.value
            };

            fetch('http://localhost:8080/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json()) 
            .then(data => {
                console.log(data);
                if (data) {
                    alert("Login realizado com sucesso!");
                    localStorage.setItem('logado', 'true');
                    localStorage.setItem('tipoUsuario', data.tipo);
                    window.location.href = "../Pages/mainPage.html"
                } else {
                    alert("Erro ao realizar login. Verifique suas credenciais.");
                }
            })
            .catch(error => {
                console.error('Erro na solicitação:', error);
            });
        });
    }
});