document.addEventListener("DOMContentLoaded", function () {
    localStorage.setItem('logado', false);
    localStorage.setItem('tipoUsuario', null);
    localStorage.setItem('usuario', null);
});

$(document).ready(function () {
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
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao autenticar usuário');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.loginSuccessful) {
                        alert("Login realizado com sucesso!");
                        localStorage.setItem('logado', 'true');
                        localStorage.setItem('tipoUsuario', data.tipo);
                        localStorage.setItem('usuario', inputUsuario.value);
                        window.location.href = "../Pages/mainPage.html";
                    } else {
                        alert("Erro ao realizar login. Verifique suas credenciais.");
                    }
                })
                .catch(error => {
                    console.error('Erro na solicitação:', error);
                    alert("Erro ao realizar login. Verifique sua conexão e tente novamente.");
                });
        });
    }

    const formularioCadastro = document.querySelector("#cadastro-form");
    if (formularioCadastro) {
        formularioCadastro.addEventListener('submit', function (event) {
            event.preventDefault();

            const inputUsuarioCadastro = document.querySelector("#usuarioCadastro");
            const inputSenhaCadastro = document.querySelector("#senhaCadastro");
            const inputSenhaConfirm = document.querySelector("#senhaConfirm");

            // Verifica se as senhas coincidem
            if (inputSenhaCadastro.value !== inputSenhaConfirm.value) {
                alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
                return;
            }

            const userData = {
                usuario: inputUsuarioCadastro.value,
                senha: inputSenhaCadastro.value,
                tipo: "USER"
            };

            fetch('http://localhost:8080/usuario/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 409) {
                        // Código 409 indica conflito, ou seja, usuário já existente
                        throw new Error('Usuário já cadastrado');
                    } else {
                        throw new Error('Erro ao cadastrar usuário');
                    }
                }
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro na solicitação:', error);
                alert("Erro ao cadastrar usuário. Verifique sua conexão e tente novamente.");
            });
        });
    }
});
