document.addEventListener('DOMContentLoaded', function () {
    // Captura o ID a partir da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idObra = urlParams.get('id');
 
    // Seletor do formulário de edição
    const formEditar = document.getElementById('editarForm');
 
    // Adicione um ouvinte de evento de envio ao formulário
    formEditar.addEventListener('submit', function (event) {
       event.preventDefault(); // Impede o envio padrão do formulário
 
        const titulo = document.getElementById("titulo").value;
        const link = document.getElementById("link").value;
        const tipo = document.getElementById("tipo").value;
        const nota = document.getElementById("nota").value;
        const qtdCapitulos = document.getElementById("qtdCapitulos").value;
        const status = document.getElementById("status").value;
        const lidos = document.getElementById("lidos").value;
 
        const jsonData = {
            titulo: titulo,
            tipo: tipo,
            link: link,
            nota: nota,
            qtdCapitulos: qtdCapitulos,
            status: status,
            lidos: lidos
        };
 
       // Realiza uma solicitação fetch para enviar os dados editados ao backend
       fetch(`http://localhost:8080/obras/${idObra}`, {
          method: 'PUT', // Use PUT para atualização (ajuste conforme necessário)
          headers: {
             'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
       })
          .then((response) => {
             if (!response.ok) {
                throw new Error('Erro ao atualizar o');
             }
             // Redirecionar o usuário de volta para a página principal após a atualização
             window.location.href = '../Pages/mainPage.html';
          })
          .catch((error) => {
             console.error('Erro ao atualizar', error);
          });
    });
 
    // Realiza uma solicitação fetch para obter os dados com base no ID
    fetch(`http://localhost:8080/obras/${idObra}`)
       .then((response) => {
          if (!response.ok) {
             throw new Error('Erro ao buscar os dados');
          }
          return response.json();
       })
       .then((obra) => {
          // Preenche o formulário com os dados
          document.getElementById('titulo').value = obra.titulo;
          document.getElementById('link').value = obra.link;
          document.getElementById('qtdCapitulos').value = obra.qtdCapitulos;
          document.getElementById('tipo').value = obra.tipo;
          document.getElementById('nota').value = obra.nota;
          document.getElementById('status').value = obra.status;
          document.getElementById('lidos').value = obra.lidos;
       })
       .catch((error) => {
          console.error('Erro ao buscar os dados', error);
       });

       const botoesExcluir = document.querySelectorAll('.btn-excluir');
            botoesExcluir.forEach((botao) => {
                botao.addEventListener('click', () => {
                    const idObra = urlParams.get('id');
                    // Confirmar a exclusão com o usuário
                    const confirmacao = window.confirm('Deseja realmente excluir?');
                    if (confirmacao) {
                        // Enviar uma solicitação fetch para excluir
                        fetch(`http://localhost:8080/obras/${idObra}`, {
                            method: 'DELETE',
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error('Erro ao excluir');
                                }
                                // Recarregar a página ou atualizar a lista após a exclusão
                                window.location.href = '../Pages/mainPage.html';
                            })
                            .catch((error) => {
                                console.error('Erro ao excluir', error);
                            });
                    }
                });
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar dados:', error);
        });