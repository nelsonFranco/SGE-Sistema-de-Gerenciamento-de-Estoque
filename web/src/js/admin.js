
        const STOCK_KEY = 'almoxarifadoEstoque';
        const MOVEMENTS_KEY = 'almoxarifadoMovimentacoes';

        function getStock() {
            const raw = localStorage.getItem(STOCK_KEY);
            if (!raw) return [];
            try { return JSON.parse(raw); } catch { return []; }
        }

        function saveStock(stock) {
            localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
        }

        function getMovements() {
            const raw = localStorage.getItem(MOVEMENTS_KEY);
            if (!raw) return [];
            try { return JSON.parse(raw); } catch { return []; }
        }

        function saveMovements(movements) {
            localStorage.setItem(MOVEMENTS_KEY, JSON.stringify(movements));
        }

        function renderStock() {
            const tbody = document.querySelector('#stock-table tbody');
            tbody.innerHTML = '';
            getStock().forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.nome || item.name}</td>
                    <td>${item.quantidade || item.quantity}</td>
                    <td>${item.descricao || item.description || 'Sem descrição'}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        function populateItemSelect() {
            const selects = ['item-select', 'item-select-saida', 'verify-select'];
            selects.forEach(id => {
                const select = document.getElementById(id);
                select.innerHTML = '<option value="">Escolha um item</option>';
                getStock().forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.nome || item.name;
                    select.appendChild(option);
                });
            });
        }

        function cadastrarItem(dados) {
            const stock = getStock();
            const id = Date.now();
            const item = {
                id,
                nome: dados.nome,
                codigo: dados.codigo,
                categoria: dados.categoria,
                quantidade: parseInt(dados.quantidade),
                preco: parseFloat(dados.preco),
                fornecedor: dados.fornecedor,
                marca: dados.marca,
                validade: dados.validade,
                localizacao: dados.localizacao,
                codigoBarras: dados.codigoBarras,
                imagem: dados.imagem,
                status: dados.status,
                descricao: dados.descricao,
                dataCadastro: new Date().toISOString(),
                ultimaAtualizacao: new Date().toISOString()
            };
            stock.push(item);
            saveStock(stock);
            populateItemSelect();
            alert('Item cadastrado com sucesso!');
        }

        function registerMovement(itemId, type, quantity) {
            const stock = getStock();
            const item = stock.find(item => item.id == itemId);
            if (!item) return alert('Item não encontrado.');

            quantity = parseInt(quantity);
            if (type === 'entrada') {
                item.quantidade += quantity;
            } else if (type === 'saida') {
                if (item.quantidade < quantity) return alert('Quantidade insuficiente em estoque.');
                item.quantidade -= quantity;
            }
            item.ultimaAtualizacao = new Date().toISOString();
            saveStock(stock);

            // Registrar movimentação
            const movements = getMovements();
            movements.push({
                itemName: item.nome || item.name,
                type,
                quantity,
                date: new Date().toLocaleString()
            });
            saveMovements(movements);

            renderStock();
            populateItemSelect();
            renderMovements();
            alert('Movimentação registrada com sucesso.');
        }

        function searchMovements() {
            const itemQuery = document.getElementById('mov-item').value.toLowerCase();
            const codigoQuery = document.getElementById('mov-codigo').value.toLowerCase();
            const setorQuery = document.getElementById('mov-setor').value.toLowerCase();
            const resultsDiv = document.getElementById('mov-results');
            resultsDiv.innerHTML = '';
            const movements = getMovements();
            const stock = getStock();
            const filtered = movements.filter(mov => {
                const item = stock.find(i => (i.nome || i.name) === mov.itemName);
                const matchesItem = !itemQuery || mov.itemName.toLowerCase().includes(itemQuery);
                const matchesCodigo = !codigoQuery || (item && (item.codigo || '').toLowerCase().includes(codigoQuery));
                const matchesSetor = !setorQuery || (item && (item.localizacao || '').toLowerCase().includes(setorQuery));
                return matchesItem && matchesCodigo && matchesSetor;
            });
            filtered.forEach(mov => {
                const div = document.createElement('div');
                div.innerHTML = `<strong>${mov.itemName}</strong> - Tipo: ${mov.type} - Quantidade: ${mov.quantity} - Data: ${mov.date}`;
                resultsDiv.appendChild(div);
            });
        }

        function searchItems() {
            const query = document.getElementById('search-input').value.toLowerCase();
            const results = getStock().filter(item => (item.nome || item.name).toLowerCase().includes(query));
            const list = document.getElementById('search-results');
            list.innerHTML = '';
            results.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.nome || item.name} - Quantidade: ${item.quantidade || item.quantity}`;
                list.appendChild(li);
            });
        }

        function verifyItem() {
            const itemQuery = document.getElementById('verify-item').value.toLowerCase();
            const codigoQuery = document.getElementById('verify-codigo').value.toLowerCase();
            const setorQuery = document.getElementById('verify-setor').value.toLowerCase();
            const details = document.getElementById('verify-details');
            details.innerHTML = '';
            const stock = getStock();
            const filtered = stock.filter(item => {
                const matchesItem = !itemQuery || (item.nome || item.name).toLowerCase().includes(itemQuery);
                const matchesCodigo = !codigoQuery || (item.codigo || '').toLowerCase().includes(codigoQuery);
                const matchesSetor = !setorQuery || (item.localizacao || '').toLowerCase().includes(setorQuery);
                return matchesItem && matchesCodigo && matchesSetor;
            });
            if (filtered.length > 0) {
                filtered.forEach(item => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <p><strong>Nome:</strong> ${item.nome || item.name}</p>
                        <p><strong>Código:</strong> ${item.codigo || 'N/A'}</p>
                        <p><strong>Categoria:</strong> ${item.categoria || 'N/A'}</p>
                        <p><strong>Quantidade:</strong> ${item.quantidade || item.quantity}</p>
                        <p><strong>Preço de custo:</strong> R$ ${item.preco || 'N/A'}</p>
                        <p><strong>Fornecedor:</strong> ${item.fornecedor || 'N/A'}</p>
                        <p><strong>Marca:</strong> ${item.marca || 'N/A'}</p>
                        <p><strong>Data de validade:</strong> ${item.validade || 'N/A'}</p>
                        <p><strong>Localização:</strong> ${item.localizacao || 'N/A'}</p>
                        <p><strong>Código de barras:</strong> ${item.codigoBarras || 'N/A'}</p>
                        <p><strong>Imagem:</strong> ${item.imagem ? `<img src="${item.imagem}" alt="Imagem" style="max-width:100px;">` : 'N/A'}</p>
                        <p><strong>Status:</strong> ${item.status || 'N/A'}</p>
                        <p><strong>Descrição:</strong> ${item.descricao || item.description || 'Sem descrição'}</p>
                        <p><strong>Data de cadastro:</strong> ${item.dataCadastro ? new Date(item.dataCadastro).toLocaleString() : 'N/A'}</p>
                        <p><strong>Última atualização:</strong> ${item.ultimaAtualizacao ? new Date(item.ultimaAtualizacao).toLocaleString() : 'N/A'}</p>
                        <hr>
                    `;
                    details.appendChild(div);
                });
            } else {
                details.innerHTML = '<p>Nenhum item encontrado.</p>';
            }
        }

        function showSection(sectionId) {
            const sections = document.querySelectorAll('.dashboard-section');
            sections.forEach(sec => sec.style.display = 'none');
            document.querySelector('.dashboard-section').style.display = 'block'; // opções sempre visível
            document.getElementById(sectionId + '-section').style.display = 'block';
        }

        document.getElementById('cadastro-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const dados = {
                nome: document.getElementById('item-nome').value.trim(),
                codigo: document.getElementById('item-codigo').value.trim(),
                categoria: document.getElementById('item-categoria').value,
                quantidade: document.getElementById('item-quantidade').value,
                preco: document.getElementById('item-preco').value,
                fornecedor: document.getElementById('item-fornecedor').value.trim(),
                marca: document.getElementById('item-marca').value.trim(),
                validade: document.getElementById('item-validade').value,
                localizacao: document.getElementById('item-localizacao').value.trim(),
                codigoBarras: document.getElementById('item-codigo-barras').value.trim(),
                imagem: document.getElementById('item-imagem').value.trim(),
                status: document.getElementById('item-status').value,
                descricao: document.getElementById('item-descricao').value.trim()
            };
            if (dados.nome && dados.codigo && dados.quantidade && dados.preco) {
                cadastrarItem(dados);
                e.target.reset();
            } else {
                alert('Preencha os campos obrigatórios.');
            }
        });

        document.getElementById('saida-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('saida-nome').value.trim();
            const codigo = document.getElementById('saida-codigo').value.trim();
            const quantity = document.getElementById('saida-quantity').value;
            if (nome && codigo && quantity) {
                const stock = getStock();
                const item = stock.find(i => (i.nome || i.name).toLowerCase() === nome.toLowerCase() && (i.codigo || '').toLowerCase() === codigo.toLowerCase());
                if (item) {
                    registerMovement(item.id, 'saida', quantity);
                    e.target.reset();
                } else {
                    alert('Item não encontrado com esse nome e código.');
                }
            } else {
                alert('Preencha todos os campos.');
            }
        });

        function handleLogout(event) {
            event.preventDefault();
            localStorage.removeItem('almoxarifadoCurrentUser');
            localStorage.removeItem('almoxarifadoCurrentRole');
            window.location.href = '../login.html';
        }

        document.addEventListener('DOMContentLoaded', () => {
            const user = localStorage.getItem('almoxarifadoCurrentUser');
            const welcome = document.getElementById('welcome-message');
            if (user) {
                welcome.innerText = `Bem-vindo, ${user}!`;
            }
            renderStock();
            renderMovements();

            // Event listener para código de barras
            document.getElementById('item-codigo-barras').addEventListener('input', function() {
                const codigoBarras = this.value.trim();
                if (codigoBarras) {
                    const stock = getStock();
                    const item = stock.find(item => item.codigoBarras === codigoBarras);
                    if (item) {
                        document.getElementById('item-nome').value = item.nome || '';
                        document.getElementById('item-codigo').value = item.codigo || '';
                        document.getElementById('item-categoria').value = item.categoria || '';
                        document.getElementById('item-quantidade').value = item.quantidade || '';
                        document.getElementById('item-preco').value = item.preco || '';
                        document.getElementById('item-fornecedor').value = item.fornecedor || '';
                        document.getElementById('item-marca').value = item.marca || '';
                        document.getElementById('item-validade').value = item.validade || '';
                        document.getElementById('item-localizacao').value = item.localizacao || '';
                        document.getElementById('item-imagem').value = item.imagem || '';
                        document.getElementById('item-status').value = item.status || '';
                        document.getElementById('item-descricao').value = item.descricao || '';
                    }
                }
            });

            // Event listener para consulta
            document.getElementById('consulta-search').addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const resultsDiv = document.getElementById('consulta-results');
                resultsDiv.innerHTML = '';
                if (query) {
                    const stock = getStock();
                    const filtered = stock.filter(item => (item.nome || item.name).toLowerCase().includes(query));
                    filtered.forEach(item => {
                        const div = document.createElement('div');
                        div.innerHTML = `<strong>${item.nome || item.name}</strong> - Quantidade: ${item.quantidade || item.quantity} - Descrição: ${item.descricao || item.description || 'Sem descrição'}`;
                        resultsDiv.appendChild(div);
                    });
                }
            });
        });
