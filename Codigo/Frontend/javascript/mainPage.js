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
                console.log("Item cadastrada com sucesso:", data);
                formulario.reset();
            })
            .catch((error) => {
                console.error("Erro ao cadastrar item:", error);
            });
            location.reload();
    });
});


function preencherTabela(orderType) {
    const nomeUsuario = localStorage.getItem('usuario');

    fetch('http://localhost:8080/obras')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os itens');
            }
            return response.json();
        })
        .then((data) => {
            if (orderType === 'name') {
                data.sort((a, b) => a.nome.localeCompare(b.titulo));
            } else if (orderType === 'type') {
                data.sort((a, b) => a.categoria.localeCompare(b.categoria));
            }

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
                            <div class="row lidos-total-container">
                                <div class="lidos">${obra.lidos}</div>
                                <div class="mx-1">-</div>
                                <div class="total">${obra.qtdCapitulos}</div>
                            </div>
                            <div class="row">
                                <div class="total">${obra.status}</div>
                            </div>
                        </div>
                
                        <div class="col">
                            <button class="botaoAcessar" onclick="window.open('${obra.link}', '_blank')">Acessar</button>
                            <button type="submit" class="botaoEditar" data-id="${obra.id}">Editar</button>
                        </div>
                    </div>
                </div>
                `;
                tabela.insertAdjacentHTML('beforeend', newRow);
            });
            
            // Adicionar eventos de clique aos botões "Editar"
            const botoesEditar = document.querySelectorAll('.botaoEditar');
            botoesEditar.forEach((botao) => {
                botao.addEventListener('click', () => {
                    const idObra = botao.getAttribute('data-id');
                    window.location.href = `../Pages/editarObras.html?id=${idObra}`;
                });
            });
        })
        .catch(error => console.error(error));  
}


    


document.addEventListener("DOMContentLoaded", function () {
    const orderType = name;
    preencherTabela(orderType);
});