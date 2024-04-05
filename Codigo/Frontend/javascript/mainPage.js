// Método para validar a quantidade de leituras
function validarQuantidadeLeituras(qtdLidos, qtdTotalCapitulos) {
    // Verifica se a quantidade de lidos é maior que 0 e menor ou igual ao total de capítulos
    if (parseInt(qtdLidos) < 0 || parseInt(qtdLidos) > parseInt(qtdTotalCapitulos)) {
        return false; // Retorna falso se a quantidade de leituras não estiver no intervalo válido
    }
    return true; // Retorna verdadeiro se a quantidade de leituras for válida
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formColeta");
    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o comportamento padrão do formulário (envio)

        // Coleta os valores do formulário
        const tipo = document.getElementById("tipo").value;
        const titulo = document.getElementById("titulo").value;
        const link = document.getElementById("link").value;
        const qtdCapitulos = document.getElementById("qtdCapitulos").value;
        const lidos = document.getElementById("lidos").value;
        const status = document.getElementById("status").value;
        const nota = 5;
        const nomeUsuario = localStorage.getItem('usuario');

        // Verifica se a quantidade de lidos é válida
        if (!validarQuantidadeLeituras(lidos, qtdCapitulos)) {
            alert("A quantidade de leituras deve ser um valor entre 0 e o total de capítulos.");
            return;
        }

        // Cria um objeto com os dados 
        const obraData = {
            titulo: titulo,
            tipo: tipo,
            link: link,
            nota: nota,
            qtdCapitulos: qtdCapitulos,
            status: status,
            lidos: lidos,
            nomeUsuario: nomeUsuario,
        };

        console.log(obraData)

        // Envia os dados para o backend
        fetch("http://localhost:8080/obras", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obraData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Item cadastrado com sucesso:", data);
                formulario.reset();
            })
            .catch((error) => {
                console.error("Erro ao cadastrar item:", error);
            });
            location.reload();
    });
});





function preencherTabela() {
    const nomeUsuario = localStorage.getItem('usuario');

    fetch('http://localhost:8080/obras')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os itens');
            }
            return response.json();
        })
        .then((data) => {

            const obrasUsuario = data.filter(obra => obra.nomeUsuario === nomeUsuario);

            const tabela = document.getElementById('tabela');
            tabela.innerHTML = '';

            obrasUsuario.forEach((obra, index) => {
                const linhaClass = index % 2 === 0 ? 'linhaEscura' : 'linhaClara';

                const newRow = `
                    <div class="${linhaClass}">
                        <div class="row align-middle text-center">
                            <div class="col">
                                <div class="col">
                                    <div class="row">${obra.titulo}</div>
                                    <div class="row mt-2">${obra.tipo}</div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="row lidos-total-container mx-auto">
                                    <div class="lidos">${obra.lidos}</div>
                                    <div class="mx-1">-</div>
                                    <div class="total">${obra.qtdCapitulos}</div>
                                </div>
                                <div class="row">
                                    <button class="botaoMais" data-id="${obra.id}"><img src="../images/mais.png" class="botaoMais" alt=""></button>
                                </div>
                            </div>
                            <div class="col">
                                <div class="row">${obra.status}</div>
                            </div>
                            <div class="col">
                                <button class="botaoAcessar" onclick="window.open('${obra.link}', '_blank')">Acessar</button>
                                <button type="submit" class="botaoEditar" data-id="${obra.id}">Editar</button>
                            </div>
                        </div>
                    </div>`;
                tabela.insertAdjacentHTML('beforeend', newRow);
            });

            // Adicionar eventos de clique aos botões "Editar"
            const botoesEditar = document.querySelectorAll('.botaoEditar');
            botoesEditar.forEach((botao) => {
                botao.addEventListener('click', () => {
                    const idObra = botao.getAttribute('data-id');
                    window.location.href = `../Pages/editPage.html?id=${idObra}`;
                });
            });

            // Adicionar eventos de clique aos botões "Mais"
            const botoesMais = document.querySelectorAll('.botaoMais');
            botoesMais.forEach((botao) => {
                botao.addEventListener('click', () => {
                    const idItem = botao.getAttribute('data-id');

                    fetch(`http://localhost:8080/obras/${idItem}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Erro ao obter os dados do item');
                            }
                            return response.json();
                        })
                        .then((data) => {
                            // Verificar se a nova quantidade será maior que lidos
                            const novaQuantidade = data.lidos + 1;
                            if (novaQuantidade > data.qtdCapitulos) {
                                alert('A quantidade não pode ser maior que o total de capítulos');
                                return;
                            }

                            // Enviar os dados atualizados através de uma requisição PUT
                            const itemAtualizadoData = {
                                titulo: data.titulo,
                                tipo: data.tipo,
                                link: data.link,
                                nota: data.nota,
                                qtdCapitulos: data.qtdCapitulos,
                                status: data.status,
                                lidos: novaQuantidade
                            };

                            fetch(`http://localhost:8080/obras/${idItem}`, {
                                method: 'PUT',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(itemAtualizadoData),
                            })
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error('Erro ao atualizar a quantidade do item');
                                    }
                                    // Atualizar a tabela após a atualização
                                    preencherTabela();
                                })
                                .catch((error) => {
                                    console.error('Erro ao atualizar a quantidade do item:', error);
                                });
                        })
                        .catch((error) => {
                            console.error('Erro ao obter os dados do item:', error);
                        });
                });
            });
        })
        .catch(error => console.error(error));
}



    


document.addEventListener("DOMContentLoaded", function () {
    preencherTabela();
});