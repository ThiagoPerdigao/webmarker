document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("registroForm");
    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o comportamento padrão do formulário (envio)

        // Coleta os valores do formulário
        const titulo = document.getElementById("titulo").value;
        const link = document.getElementById("link").value;
        const tipo = document.getElementById("tipo").value;
        const nota = document.getElementById("nota").value;
        const qtdCapitulos = document.getElementById("qtdCapitulos").value;
        const status = "Lendo";
        const lidos = 0;

        // Cria um objeto com os dados
        const obrasData = {
            titulo: titulo,
            tipo: tipo,
            link: link,
            nota: nota,
            qtdCapitulos: qtdCapitulos,
            status: status,
            lidos: lidos
        };

        // Envia os dados para o backend
        fetch("http://localhost:8080/obras", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obrasData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Cadastro feito com sucesso:", data);
                formulario.reset();
            })
            .catch((error) => {
                console.error("Erro ao cadastrar:", error);
            });
            location.reload();
    });

    // Função para fazer a solicitação GET e exibir os dados no console
    function obterEExibirDados() {
        // Faz uma solicitação GET para obter os dados do backend
        fetch("http://localhost:8080/obras")
            .then((response) => response.json())
            .then((dados) => {
                // Para cada conjunto de dados, chama a função para criar o card
                dados.forEach((obra) => {
                    criarCard(obra);
                });
            })
            .catch((error) => {
                console.error("Erro ao obter dados:", error);
            });
    }
    obterEExibirDados();


    function criarCard(obra) {
        const listaArea = document.getElementById("listaArea");
    
        // Criação dos elementos do card
        const cardContainer = document.createElement("div");
        cardContainer.className = "mt-5";
    
        const card = document.createElement("div");
        card.className =
            "d-style btn btn-brc-tp border-2 bgc-white btn-outline-blue btn-h-outline-blue btn-a-outline-blue w-100 my-2 py-3 shadow-sm";
    
        const row = document.createElement("div");
        row.className = "row align-items-center";
    
        // Coluna 1
        const col1 = document.createElement("div");
        col1.className = "col-12 col-md-4";
    
        const titulo = document.createElement("h4");
        titulo.className =
            "pt-3 text-170 text-600 text-primary-d1 letter-spacing";
        titulo.textContent = obra.titulo;
    
        const progresso = document.createElement("div");
        progresso.className = "text-secondary-d1 text-120";
        progresso.innerHTML = `<span class="ml-n15 align-text-bottom"></span><span class="text-180">${obra.lidos}</span> / ${obra.qtdCapitulos}`;
    
        const btnMaisLidos = document.createElement("button");
        btnMaisLidos.textContent = "+";
        btnMaisLidos.className = "btn btn-sm btn-raised m-1 btn-mais";
        btnMaisLidos.style.backgroundColor = "#483D8B";
        btnMaisLidos.style.color = "#fff";
        btnMaisLidos.setAttribute("data-id", obra.id);
        btnMaisLidos.id = "botaoMais";
    
        const btnMenosLidos = document.createElement("button");
        btnMenosLidos.textContent = "-";
        btnMenosLidos.className = "btn btn-sm btn-raised m-1 btn-menos";
        btnMenosLidos.style.backgroundColor = "#483D8B";
        btnMenosLidos.style.color = "#fff";
        btnMenosLidos.setAttribute("data-id", obra.id);
        btnMenosLidos.id = "botaoMenos";
    
        // Monta a estrutura da coluna 1 com botões de "+" e "-"
        col1.appendChild(titulo);
        col1.appendChild(progresso);
        col1.appendChild(btnMaisLidos);
        col1.appendChild(btnMenosLidos);
    
        // Coluna 2
        const col2 = document.createElement("ul");
        col2.className =
            "list-unstyled mb-0 col-12 col-md-4 text-dark-l1 text-90 text-left my-4 my-md-0";
    
        const tipo = document.createElement("li");
        tipo.innerHTML = `<i class="fa fa-check text-success-m2 text-110 mr-2 mt-1"></i><span class="text-110">Tipo:</span> ${obra.tipo}`;
    
        const status = document.createElement("li");
        status.innerHTML = `<i class="fa fa-check text-success-m2 text-110 mr-2 mt-1"></i><span class="text-110">Status: ${obra.status}</span>`;
    
        const nota = document.createElement("li");
        nota.innerHTML = `<i class="fa fa-times text-danger-m3 text-110 mr-25 mt-1"></i><span class="text-110">Nota: ${obra.nota}/5</span>`;
    
        // Coluna 3
        const col3 = document.createElement("div");
        col3.className = "col-12 col-md-4 text-center";
    
        const acessarBtn = document.createElement("a");
        acessarBtn.href = obra.link;
        acessarBtn.className = "f-n-hover btn btn-raised px-4 py-25 w-75 text-600";
        acessarBtn.style.backgroundColor = "#483D8B";
        acessarBtn.style.color = "#fff";
        acessarBtn.textContent = "Acessar";
    
        // Coluna 4 (Adicionada para o botão de edição)
        const col4 = document.createElement("div");
        col4.className = "col-12 col-md-4 text-center";
    
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.className =
            "btn btn-raised px-4 py-25 w-75 mt-2 text-600 btn-editar";
        editarBtn.style.backgroundColor = "#483D8B";
        editarBtn.style.color = "#fff";
        editarBtn.setAttribute("data-id", obra.id);
    
        // Adiciona um ouvinte de eventos ao botão de edição
        editarBtn.addEventListener("click", function () {
            const obraId = this.getAttribute("data-id");
            window.location.href = `../Pages/editarObras.html?id=${obraId}`;
        });
    
        // Monta a estrutura do card (Adicionando col4)
        col2.appendChild(tipo);
        col2.appendChild(status);
        col2.appendChild(nota);
    
        col3.appendChild(acessarBtn);
        col3.appendChild(editarBtn); // Adiciona o botão de edição
    
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
    
        card.appendChild(row);
        cardContainer.appendChild(card);
        listaArea.appendChild(cardContainer);
    }
    
    

    function aumentarLidos(obraId, obraAtual) {
        const jsonData = {
            titulo: obraAtual.titulo,
            tipo: obraAtual.tipo,
            link: obraAtual.link,
            nota: obraAtual.nota,
            qtdCapitulos: obraAtual.qtdCapitulos,
            status: obraAtual.status,
            lidos: obraAtual.lidos + 1,
        };
    
        fetch(`http://localhost:8080/obras/${obraId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Lidos aumentados com sucesso!');
                    location.reload();
                } else {
                    console.error('Erro ao atualizar a obra:', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Erro na solicitação PUT:', error);
            });
    }
    
    
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-mais')) {
            const obraId = event.target.getAttribute('data-id');
    
            // Função para buscar a obraAtual
            const buscarObraAtual = () => {
                return fetch(`http://localhost:8080/obras/${obraId}`);
            };
    
            // Buscar a obraAtual
            buscarObraAtual()
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Erro ao buscar a obra atual');
                    }
                })
                .then((obraAtual) => {
                    // Chamada da função para aumentar os 'lidos'
                    aumentarLidos(obraId, obraAtual);
                })
                .catch((error) => {
                    console.error('Erro ao buscar a obra atual:', error);
                });
        }
    });


    function diminuirLidos(obraId, obraAtual) {
        const jsonData = {
            titulo: obraAtual.titulo,
            tipo: obraAtual.tipo,
            link: obraAtual.link,
            nota: obraAtual.nota,
            qtdCapitulos: obraAtual.qtdCapitulos,
            status: obraAtual.status,
            lidos: obraAtual.lidos - 1,
        };
    
        fetch(`http://localhost:8080/obras/${obraId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Lidos aumentados com sucesso!');
                    location.reload();
                } else {
                    console.error('Erro ao atualizar a obra:', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Erro na solicitação PUT:', error);
            });
    }
    
    
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-menos')) {
            const obraId = event.target.getAttribute('data-id');
    
            // Função para buscar a obraAtual
            const buscarObraAtual = () => {
                return fetch(`http://localhost:8080/obras/${obraId}`);
            };
    
            // Buscar a obraAtual
            buscarObraAtual()
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Erro ao buscar a obra atual');
                    }
                })
                .then((obraAtual) => {
                    // Chamada da função para aumentar os 'lidos'
                    diminuirLidos(obraId, obraAtual);
                })
                .catch((error) => {
                    console.error('Erro ao buscar a obra atual:', error);
                });
        }
    });
    
});





