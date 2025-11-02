/**
 * DGBurguer - Script Principal
 * Funcionalidades: Menu mobile, Scroll suave, Formulários
 */

// Menu Mobile Toggle
const btnMobile = document.querySelector('.btn_mobile');
const navbar = document.querySelector('.navbar');

if (btnMobile) {
    btnMobile.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
}

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fecha o menu mobile após clicar
            if (navbar) {
                navbar.classList.remove('active');
            }
        }
    });
});

// Botão voltar ao topo - aparece após scroll
const btnTopo = document.querySelector('.btn-topo');
if (btnTopo) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnTopo.style.opacity = '1';
            btnTopo.style.visibility = 'visible';
        } else {
            btnTopo.style.opacity = '0';
            btnTopo.style.visibility = 'hidden';
        }
    });
    // Estado inicial
    btnTopo.style.opacity = '0';
    btnTopo.style.visibility = 'hidden';
}

// Formulário de Pedido
const formPedido = document.querySelector('.form-pedido');
if (formPedido) {
    formPedido.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const produtoSelect = document.getElementById('produto');
        const produto = produtoSelect.options[produtoSelect.selectedIndex].text;
        const quantidade = document.getElementById('quantidade').value;
        const endereco = document.getElementById('endereco').value;
        const pagamento = document.getElementById('pagamento').value;
        
        // Mensagem de sucesso detalhada
        alert(`🎉 Pedido realizado com sucesso!\n\n👤 Cliente: ${nome}\n📱 Telefone: ${telefone}\n📦 Pedido: ${quantidade}x ${produto}\n📍 Endereço: ${endereco}\n💳 Pagamento: ${pagamento}\n\n⏰ Em breve entraremos em contato!\n🍔 Obrigado por escolher o DGBurguer!`);
        
        // Limpa o formulário
        formPedido.reset();
        
        // Scroll suave para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Formulário de Contato
const formContato = document.querySelector('.form-contato');
if (formContato) {
    formContato.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('contato-nome').value;
        const email = document.getElementById('contato-email').value;
        const assunto = document.getElementById('assunto').value;
        
        // Mensagem de sucesso
        alert(`Mensagem enviada com sucesso!\n\nNome: ${nome}\nE-mail: ${email}\nAssunto: ${assunto}\n\nResponderemos em breve!`);
        
        // Limpa o formulário
        formContato.reset();
    });
}

// Sistema de Filtro de Cardápio Avançado
const searchInput = document.getElementById('pesquisa');
const categoriaSelect = document.getElementById('categoria');
const btnBuscar = document.getElementById('btn-buscar');
const cardapioContainer = document.getElementById('cardapio');
const contadorVisivel = document.getElementById('total-visivel');
const contadorTotal = document.getElementById('total-itens');
let allCards = [];

// Inicializa o sistema de filtros
function initCardapio() {
    allCards = document.querySelectorAll('.card_cadap');
    
    // Atualiza contador total
    if (contadorTotal) {
        contadorTotal.textContent = allCards.length;
    }
    if (contadorVisivel) {
        contadorVisivel.textContent = allCards.length;
    }
    
    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', filtrarCardapio);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                filtrarCardapio();
            }
        });
    }
    
    if (categoriaSelect) {
        categoriaSelect.addEventListener('change', filtrarCardapio);
    }
    
    if (btnBuscar) {
        btnBuscar.addEventListener('click', filtrarCardapio);
    }
    
    // Mostra estatísticas iniciais
    atualizarEstatisticas();
}

// Função principal de filtro
function filtrarCardapio() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const categoriaSelecionada = categoriaSelect ? categoriaSelect.value : 'todos';
    
    let cardsVisiveis = 0;
    
    allCards.forEach((card, index) => {
        const categoriaCard = card.getAttribute('data-categoria');
        const titulo = card.querySelector('h3').textContent.toLowerCase();
        const descricao = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
        
        // Verifica se corresponde à categoria
        const matchCategoria = categoriaSelecionada === 'todos' || categoriaCard === categoriaSelecionada;
        
        // Verifica se corresponde à busca
        const matchSearch = searchTerm === '' || 
                           titulo.includes(searchTerm) || 
                           descricao.includes(searchTerm);
        
        // Mostra ou oculta o card
        if (matchCategoria && matchSearch) {
            card.style.display = 'flex';
            card.style.animation = `slideInUp 0.5s ease-out ${index * 0.1}s`;
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.style.opacity = '1';
            }, index * 100);
            
            cardsVisiveis++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
    
    // Atualiza contador
    if (contadorVisivel) {
        contadorVisivel.textContent = cardsVisiveis;
    }
    
    // Mostra mensagem se não houver resultados
    mostrarMensagemResultados(cardsVisiveis, searchTerm, categoriaSelecionada);
}

// Mostra mensagem de resultados
function mostrarMensagemResultados(total, busca, categoria) {
    // Remove mensagem anterior se existir
    const mensagemExistente = document.querySelector('.mensagem-resultado');
    if (mensagemExistente) {
        mensagemExistente.remove();
    }
    
    if (total === 0) {
        const mensagem = document.createElement('div');
        mensagem.className = 'mensagem-resultado';
        mensagem.innerHTML = `
            <div class="sem-resultados">
                <i class="fa-solid fa-search"></i>
                <h3>Nenhum resultado encontrado</h3>
                <p>Não encontramos produtos com "${busca || 'este critério'}"</p>
                <button class="btn-limpar" onclick="limparFiltros()">Limpar Filtros</button>
            </div>
        `;
        cardapioContainer.appendChild(mensagem);
    }
}

// Limpa todos os filtros
function limparFiltros() {
    if (searchInput) searchInput.value = '';
    if (categoriaSelect) categoriaSelect.value = 'todos';
    filtrarCardapio();
}

// Atualiza estatísticas do cardápio
function atualizarEstatisticas() {
    const categorias = {
        pizza: 0,
        hamburguer: 0,
        batata: 0,
        refrigerante: 0
    };
    
    allCards.forEach(card => {
        const categoria = card.getAttribute('data-categoria');
        if (categorias.hasOwnProperty(categoria)) {
            categorias[categoria]++;
        }
    });
    
    console.log('📊 Estatísticas do Cardápio:');
    console.log(`🍕 Pizzas: ${categorias.pizza}`);
    console.log(`🍔 Hambúrgueres: ${categorias.hamburguer}`);
    console.log(`🍟 Batatas: ${categorias.batata}`);
    console.log(`🥤 Refrigerantes: ${categorias.refrigerante}`);
    console.log(`📦 Total: ${allCards.length} itens`);
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initCardapio();
});

// Mantém a função global para o botão
window.limparFiltros = limparFiltros;

// Máscaras para inputs
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        e.target.value = value;
    });
}

const cepInput = document.getElementById('cep');
if (cepInput) {
    cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) {
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = value;
    });
}

// Animação de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa os cards do cardápio
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

console.log('🍔 DGBurguer - Sistema carregado com sucesso!');
