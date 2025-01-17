const button = document.getElementById('cadastrarUsuarios');
button.addEventListener('click', () => {
    window.location.href = '/cadastrar'; // Redireciona para a nova rota
});

//Adicionar produto
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form-produto');

    const successToast = new bootstrap.Toast(document.getElementById('successToast'));


    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.querySelector('#nome').value;
        const descricao = document.querySelector('#descricao').value;
        const categoria = document.querySelector('#categoria').value;
        const quantidade = parseInt(document.querySelector('#quantidade').value);
        const valorUnitario = parseFloat(document.querySelector('#valorUnitario').value);

        try {

            const response = await fetch('http://localhost:3000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, descricao, categoria, quantidade, valorUnitario }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro no servidor. Tente novamente!');
        }
    });
});

let produtos = [];

// Carregar produtos do backend e atualizar a tabela
async function carregarProdutos() {
    try {
        // Faz uma requisição ao backend para buscar os produtos
        const response = await fetch('http://localhost:3000/produtos');
        if (response.ok) {
            // Preenche o array global com os produtos retornados
            produtos = await response.json();
            console.log("Produtos carregados com sucesso:", produtos);

            // Atualiza a tabela na interface
            const tabela = document.getElementById('tabela-produtos');
            tabela.innerHTML = '';

            produtos.forEach((produto, index) => {
                tabela.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${produto.nome}</td>
                        <td>${produto.descricao}</td>
                        <td>${produto.categoria}</td>
                        <td>${produto.quantidade}</td>
                        <td>R$ ${produto.valorUnitario.toFixed(2)}</td>
                        <td>
                            <button id="atualizar" class="btn btn-warning btn-sm" onclick="editarProduto(${produto.id})">Editar</button>
                            <button id="excluir" class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        } else {
            console.error("Erro ao carregar produtos:", response.statusText);
            alert('Erro ao carregar produtos. Tente novamente mais tarde.');
        }
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
        alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    }
}

// Carregar os produtos assim que a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});


// Abrir modal para adicionar produto
function abrirFormulario() {
    const modal = new bootstrap.Modal(document.getElementById('produtoModal'));
    document.getElementById('form-produto').reset();
    modal.show();
}

document.getElementById('form-produto').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valorUnitario = parseFloat(document.getElementById('valorUnitario').value);

    produtos.push({ nome, descricao, categoria, quantidade, valorUnitario });
    carregarProdutos();

    const modal = bootstrap.Modal.getInstance(document.getElementById('produtoModal'));
    modal.hide();
});


// Editar produto
function editarProduto(id) {
    // Encontra o produto pelo ID real
    const produto = produtos.find((p) => p.id === id);

    // Exibe os logs para depuração
    console.log("Array de produtos:", produtos);
    console.log("ID recebido:", id);
    console.log("Produto encontrado:", produto);

    // Verifica se o produto existe
    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    // Cria o modal dinamicamente
    const modalHTML = `
        <div class="modal fade" id="editarProdutoModal" tabindex="-1" aria-labelledby="editarProdutoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editarProdutoModalLabel">Editar Produto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="form-editar-produto">
                            <div class="mb-3">
                                <label for="editar-nome" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="editar-nome" name="nome" value="${produto.nome}" required>
                            </div>
                            <div class="mb-3">
                                <label for="editar-descricao" class="form-label">Descrição</label>
                                <textarea class="form-control" id="editar-descricao" name="descricao">${produto.descricao}</textarea>
                            </div>
                            <div class="mb-3">
                                <label for="editar-categoria" class="form-label">Categoria</label>
                                <input type="text" class="form-control" id="editar-categoria" name="categoria" value="${produto.categoria}">
                            </div>
                            <div class="mb-3">
                                <label for="editar-quantidade" class="form-label">Quantidade</label>
                                <input type="number" class="form-control" id="editar-quantidade" name="quantidade" value="${produto.quantidade}" required>
                            </div>
                            <div class="mb-3">
                                <label for="editar-valorUnitario" class="form-label">Valor Unitário</label>
                                <input type="number" step="0.01" class="form-control" id="editar-valorUnitario" name="valorUnitario" value="${produto.valorUnitario}" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove qualquer modal de edição existente no DOM
    const existingModal = document.getElementById('editarProdutoModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Insere o modal no DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Inicializa o modal do Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('editarProdutoModal'));
    modal.show();

    // Manipula o evento de submissão do formulário
    const form = document.getElementById('form-editar-produto');
    form.onsubmit = async (e) => {
        e.preventDefault();

        // Coleta os novos valores do formulário
        const nome = document.getElementById('editar-nome').value;
        const descricao = document.getElementById('editar-descricao').value;
        const categoria = document.getElementById('editar-categoria').value;
        const quantidade = parseInt(document.getElementById('editar-quantidade').value);
        const valorUnitario = parseFloat(document.getElementById('editar-valorUnitario').value);

        // Atualiza o produto no array do frontend
        const updatedProduto = { nome, descricao, categoria, quantidade, valorUnitario };
        const index = produtos.findIndex(p => p.id === id);
        if (index !== -1) {
            produtos[index] = updatedProduto;
        }

        // Recarrega a tabela de produtos
        carregarProdutos();

        // Salva a atualização no banco de dados via API
        try {
            const response = await fetch(`http://localhost:3000/produtos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduto),
            });

            if (response.ok) {
                produtos[index] = updatedProduto;
                carregarProdutos();
                alert('Produto atualizado com sucesso!');

            } else {
                const errorData = await response.json();
                alert(`Erro ao atualizar produto: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error);
            alert('Erro ao conectar ao servidor. Tente novamente.');
        }

        // Fecha o modal
        modal.hide();

        // Remove o modal do DOM após fechar
        document.getElementById('editarProdutoModal').remove();
    };
}


// Função para excluir produto
async function excluirProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
            const response = await fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' });

            if (response.ok) {
                alert('Produto excluído com sucesso!');

                // Remove o produto da lista de produtos no frontend
                produtos = produtos.filter(produto => produto.id !== id); // Atualiza o array de produtos
                carregarProdutos(); // Atualiza a tabela com os dados mais recentes
            } else {
                const errorData = await response.json();
                alert('Erro ao excluir produto: ' + errorData.message || 'Erro desconhecido');
            }
        } catch (error) {
            // Captura o erro corretamente e exibe a mensagem
            console.error('Erro ao conectar ao servidor:', error);
            alert('Erro ao conectar ao servidor. Tente novamente.');
        }
    }
}

// Inicializar
carregarProdutos();