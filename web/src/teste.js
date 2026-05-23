const API_URL = "http://localhost:8080/produtos";

function handleLogout(event) {
    event.preventDefault();
    alert('Logout ainda não implementado nesta página de teste.');
}

function showPanel(action) {
    const actionDescription = document.getElementById('action-description');
    const productWindow = document.getElementById('product-window');

    if (action === 'ver') {
        actionDescription.innerHTML = `
            <p><strong>Ver produtos</strong></p>
            <p>Esta função usa <code>fetch</code> com <code>GET</code> para buscar a lista de produtos.</p>
        `;
        productWindow.innerHTML = '<p>Buscando produtos...</p>';
        getProdutos();
        return;
    }

    if (action === 'adicionar') {
        actionDescription.innerHTML = `
            <p><strong>Adicionar produtos</strong></p>
            <p>Preencha os campos abaixo e clique em "Adicionar" para enviar ao backend com <code>POST</code>.</p>
        `;
        productWindow.innerHTML = `
            <div class="dashboard-section" style="padding: 16px;">
                <label for="add-id">ID do produto:</label>
                <input id="add-id" type="text" placeholder="Ex: 123" />
                <label for="add-nome">Nome do produto:</label>
                <input id="add-nome" type="text" placeholder="Ex: Parafuso" />
                <label for="add-fornecedor">Fornecedor:</label>
                <input id="add-fornecedor" type="text" placeholder="Ex: Fornecedor X" />
                <label for="add-quantidade">Quantidade:</label>
                <input id="add-quantidade" type="number" min="0" placeholder="Ex: 10" />
                <label for="add-preco">Preço:</label>
                <input id="add-preco" type="number" min="0" step="0.01" placeholder="Ex: 12.50" />
                <button type="button" class="btn-primary" onclick="submitAddProduto()">Adicionar produto</button>
                <div id="action-result" style="margin-top: 14px;"></div>
            </div>
        `;
        return;
    }

    if (action === 'atualizar') {
        actionDescription.innerHTML = `
            <p><strong>Atualizar produtos</strong></p>
            <p>Preencha o ID e os novos valores. Clique em "Atualizar" para enviar ao backend com <code>PUT</code>.</p>
        `;
        productWindow.innerHTML = `
            <div class="dashboard-section" style="padding: 16px;">
                <label for="update-id">ID do produto:</label>
                <input id="update-id" type="text" placeholder="Ex: 123" />
                <label for="update-nome">Nome do produto:</label>
                <input id="update-nome" type="text" placeholder="Ex: Parafuso Atualizado" />
                <label for="update-fornecedor">Fornecedor:</label>
                <input id="update-fornecedor" type="text" placeholder="Ex: Fornecedor Y" />
                <label for="update-quantidade">Quantidade:</label>
                <input id="update-quantidade" type="number" min="0" placeholder="Ex: 20" />
                <label for="update-preco">Preço:</label>
                <input id="update-preco" type="number" min="0" step="0.01" placeholder="Ex: 15.00" />
                <button type="button" class="btn-primary" onclick="submitUpdateProduto()">Atualizar produto</button>
                <div id="action-result" style="margin-top: 14px;"></div>
            </div>
        `;
        return;
    }

    if (action === 'deletar') {
        actionDescription.innerHTML = `
            <p><strong>Deletar produtos</strong></p>
            <p>Informe o ID do produto que deseja remover. Clique em "Deletar" para enviar ao backend com <code>DELETE</code>.</p>
        `;
        productWindow.innerHTML = `
            <div class="dashboard-section" style="padding: 16px;">
                <label for="delete-id">ID do produto:</label>
                <input id="delete-id" type="text" placeholder="Ex: 123" />
                <button type="button" class="btn-primary" onclick="submitDeleteProduto()">Deletar produto</button>
                <div id="action-result" style="margin-top: 14px;"></div>
            </div>
        `;
        return;
    }
}

function getProdutos() {
    const productWindow = document.getElementById('product-window');

    fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            productWindow.innerHTML = `<p style="color:#d43f3f;">Erro ao buscar produtos: ${error.message}</p>`;
            console.error('Erro ao buscar produtos:', error);
        });
}

function formatProductData(data) {
    if (Array.isArray(data)) {
        return data;
    }
    if (data && typeof data === 'object') {
        if (Array.isArray(data.produtos)) {
            return data.produtos;
        }
        if (Array.isArray(data.content)) {
            return data.content;
        }
    }
    return null;
}

function submitAddProduto() {
    const productWindow = document.getElementById('product-window');
    const id = document.getElementById('add-id').value.trim();
    const nome = document.getElementById('add-nome').value.trim();
    const fornecedor = document.getElementById('add-fornecedor').value.trim();
    const quantidade = parseInt(document.getElementById('add-quantidade').value, 10);
    const preco = parseFloat(document.getElementById('add-preco').value);

    if (!id || !nome || !fornecedor) {
        alert('Preencha ID, nome e fornecedor.');
        return;
    }

    const novoProduto = {
        id,
        codigo: id,
        nome,
        fornecedor,
        quantidade: Number.isNaN(quantidade) ? 0 : quantidade,
        preco: Number.isNaN(preco) ? 0 : preco
    };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto)
    })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            const resultPanel = document.getElementById('action-result');
            resultPanel.innerHTML = `<p>Produto adicionado com sucesso.</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
            console.log('Produto criado', data);
        })
        .catch(error => {
            productWindow.innerHTML = `<p style="color:#d43f3f;">Erro ao adicionar produto: ${error.message}</p>`;
            console.error('Erro ao adicionar:', error);
        });
}

function submitUpdateProduto() {
    const productWindow = document.getElementById('product-window');
    const id = document.getElementById('update-id').value.trim();
    const nome = document.getElementById('update-nome').value.trim();
    const fornecedor = document.getElementById('update-fornecedor').value.trim();
    const quantidade = document.getElementById('update-quantidade').value;
    const preco = document.getElementById('update-preco').value;

    if (!id) {
        alert('Informe o ID do produto para atualizar.');
        return;
    }

    const atualizacao = {};
    if (nome) atualizacao.nome = nome;
    if (fornecedor) atualizacao.fornecedor = fornecedor;
    if (quantidade !== '') atualizacao.quantidade = parseInt(quantidade, 10);
    if (preco !== '') atualizacao.preco = parseFloat(preco);

    if (Object.keys(atualizacao).length === 0) {
        alert('Informe pelo menos um campo para atualizar.');
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atualizacao)
    })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            const resultPanel = document.getElementById('action-result');
            resultPanel.innerHTML = `<p>Produto atualizado com sucesso.</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
            console.log('Produto atualizado', data);
        })
        .catch(error => {
            productWindow.innerHTML = `<p style="color:#d43f3f;">Erro ao atualizar produto: ${error.message}</p>`;
            console.error('Erro ao atualizar:', error);
        });
}

function submitDeleteProduto() {
    const productWindow = document.getElementById('product-window');
    const id = document.getElementById('delete-id').value.trim();

    if (!id) {
        alert('Informe o ID do produto para deletar.');
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const resultPanel = document.getElementById('action-result');
            resultPanel.innerHTML = `<p>Produto com ID ${id} deletado com sucesso.</p>`;
            console.log('Produto excluído com sucesso');
        })
        .catch(error => {
            productWindow.innerHTML = `<p style="color:#d43f3f;">Erro ao deletar produto: ${error.message}</p>`;
            console.error('Erro ao deletar:', error);
        });
}

function renderProducts(produtos) {
    const productWindow = document.getElementById('product-window');
    if (!Array.isArray(produtos) || produtos.length === 0) {
        productWindow.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    const rows = produtos.map(produto => `
        <div style="display:flex; gap:12px; align-items:center; border-bottom:1px solid #dbe7f3; padding:10px 0;">
            <span><strong>ID:</strong> ${produto.id || produto.codigo || 'N/A'}</span>
            <span><strong>Nome:</strong> ${produto.nome || produto.name || 'Sem nome'}</span>
            <span><strong>Quantidade:</strong> ${produto.quantidade || produto.quantity || 0}</span>
            <span><strong>Preço:</strong> R$ ${produto.preco || produto.price || '0,00'}</span>
            <span><strong>Fornecedor:</strong> ${produto.fornecedor || 'N/A'}</span>
        </div>
    `).join('');

    productWindow.innerHTML = `
        <div style="background:#eef7ff; padding:12px; border-radius:8px; border:1px solid #dbe7f3;">
            ${rows}
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', () => {
    showPanel('ver');
});
