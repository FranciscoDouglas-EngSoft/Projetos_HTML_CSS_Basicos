# 🚀 Migração do DGBurguer para Vite + React

## 🎯 Por que Vite?

- ⚡ **Extremamente rápido** - Hot Module Replacement (HMR) instantâneo
- 📦 **Bundle otimizado** - Build de produção muito menor
- 🔧 **Configuração simples** - Zero config para começar
- 🆕 **Moderno** - Usa ESM nativo do navegador
- 🔥 **Performance** - 10x mais rápido que Create React App

---

## 📋 Passo a Passo - Migração para Vite

### 1️⃣ Criar novo projeto Vite com React

Abra o terminal **PowerShell** na pasta `Projetos_HTML_CSS_Basicos` e execute:

```powershell
# Criar projeto Vite com React
npm create vite@latest dgburguer-react -- --template react

# Entrar na pasta do projeto
cd dgburguer-react

# Instalar dependências
npm install
```

### 2️⃣ Estrutura do Projeto Vite

```
dgburguer-react/
├── public/                  # Arquivos estáticos (imagens, fontes)
│   ├── hamburguer/
│   ├── pizza/
│   ├── batata/
│   └── bebida/
├── src/
│   ├── assets/             # Assets do React
│   ├── components/         # Componentes React
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Sobre.jsx
│   │   ├── Menu.jsx
│   │   ├── Pedido.jsx
│   │   ├── Contato.jsx
│   │   └── Footer.jsx
│   ├── styles/            # CSS modularizado
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── animations.css
│   ├── data/              # Dados do cardápio
│   │   └── cardapio.js
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Entry point
│   └── index.css          # Estilos globais
├── index.html             # HTML base
├── package.json
└── vite.config.js         # Configuração do Vite
```

### 3️⃣ Migrar HTML para React

#### **index.html** (Vite)
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="DGBurguer - Os melhores hambúrgueres artesanais">
    <title>DGBurguer - React + Vite</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Pacifico&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

#### **src/main.jsx** (Entry Point)
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

#### **src/App.jsx** (Componente Principal)
```jsx
import { useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Sobre from './components/Sobre'
import Menu from './components/Menu'
import Pedido from './components/Pedido'
import Contato from './components/Contato'
import Footer from './components/Footer'
import BtnTopo from './components/BtnTopo'
import './styles/global.css'

function App() {
  return (
    <main id="container">
      <Header />
      <Home />
      <Sobre />
      <Menu />
      <Pedido />
      <Contato />
      <BtnTopo />
      <Footer />
    </main>
  )
}

export default App
```

### 4️⃣ Criar Componentes React

#### **src/components/Header.jsx**
```jsx
import { useState } from 'react'
import '../styles/header.css'

function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  const toggleMenu = () => {
    setMenuAberto(!menuAberto)
  }

  const scrollParaSecao = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuAberto(false)
  }

  return (
    <header id="header">
      <h1>DGBurguer</h1>
      <nav className={`navbar ${menuAberto ? 'active' : ''}`}>
        <ul>
          <li><a onClick={() => scrollParaSecao('home')}>Início</a></li>
          <li><a onClick={() => scrollParaSecao('sobre')}>Sobre</a></li>
          <li><a onClick={() => scrollParaSecao('menu')}>Menu</a></li>
          <li><a onClick={() => scrollParaSecao('contato')}>Contato</a></li>
        </ul>
      </nav>
      <button className="btn" onClick={() => scrollParaSecao('pedido')}>
        Fazer Pedido
      </button>
      <button 
        className="btn_mobile" 
        onClick={toggleMenu}
        aria-label="Menu Mobile"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  )
}

export default Header
```

#### **src/components/Menu.jsx**
```jsx
import { useState, useEffect } from 'react'
import { cardapio } from '../data/cardapio'
import CardProduto from './CardProduto'
import '../styles/menu.css'

function Menu() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('todos')
  const [produtosFiltrados, setProdutosFiltrados] = useState(cardapio)

  useEffect(() => {
    filtrarProdutos()
  }, [busca, categoria])

  const filtrarProdutos = () => {
    let resultado = cardapio

    // Filtrar por categoria
    if (categoria !== 'todos') {
      resultado = resultado.filter(p => p.categoria === categoria)
    }

    // Filtrar por busca
    if (busca.trim() !== '') {
      resultado = resultado.filter(p => 
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.descricao.toLowerCase().includes(busca.toLowerCase())
      )
    }

    setProdutosFiltrados(resultado)
  }

  return (
    <section id="menu">
      <h2>Cardápio</h2>
      
      <div className="content_menu">
        <input
          type="search"
          placeholder="Pesquisar no cardápio..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="todos">Todas as Categorias</option>
          <option value="pizza">🍕 Pizzas</option>
          <option value="hamburguer">🍔 Hambúrgueres</option>
          <option value="batata">🍟 Batatas Fritas</option>
          <option value="refrigerante">🥤 Refrigerantes</option>
        </select>
        <button onClick={filtrarProdutos}>Buscar</button>
      </div>

      <div className="contador-itens">
        <span>
          Mostrando <strong>{produtosFiltrados.length}</strong> de{' '}
          <strong>{cardapio.length}</strong> itens
        </span>
      </div>

      <div className="cardapio">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))
        ) : (
          <div className="sem-resultados">
            <i className="fa-solid fa-search"></i>
            <h3>Nenhum resultado encontrado</h3>
            <p>Não encontramos produtos com "{busca}"</p>
            <button 
              className="btn-limpar"
              onClick={() => { setBusca(''); setCategoria('todos') }}
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Menu
```

#### **src/data/cardapio.js**
```javascript
export const cardapio = [
  // PIZZAS
  {
    id: 1,
    categoria: 'pizza',
    nome: 'Pizza Margherita',
    descricao: 'Molho de tomate, mussarela, tomate fresco, manjericão e azeite',
    preco: 42.90,
    imagem: '/pizza/pizza1.png'
  },
  {
    id: 2,
    categoria: 'pizza',
    nome: 'Pizza Calabresa',
    descricao: 'Molho de tomate, mussarela, calabresa fatiada e cebola',
    preco: 45.90,
    imagem: '/pizza/pizza2.png'
  },
  // ... adicionar todos os produtos

  // HAMBÚRGUERES
  {
    id: 7,
    categoria: 'hamburguer',
    nome: 'Hambúrguer Clássico',
    descricao: 'Pão, carne 180g, queijo, alface, tomate e molho especial',
    preco: 24.90,
    imagem: '/hamburguer/h2.png'
  },
  // ... adicionar todos os produtos

  // BATATAS
  {
    id: 15,
    categoria: 'batata',
    nome: 'Batata Frita Tradicional',
    descricao: 'Batatas fritas crocantes com sal (porção 400g)',
    preco: 15.90,
    imagem: '/batata/batata1.png'
  },
  // ... adicionar todos os produtos

  // REFRIGERANTES
  {
    id: 19,
    categoria: 'refrigerante',
    nome: 'Coca-Cola',
    descricao: 'Refrigerante sabor cola 350ml gelado',
    preco: 6.90,
    imagem: '/bebida/refri1.png'
  },
  // ... adicionar todos os produtos
]
```

### 5️⃣ Instalar Dependências Adicionais

```powershell
# React Router (para navegação entre páginas)
npm install react-router-dom

# React Hook Form (para formulários)
npm install react-hook-form

# React Icons (alternativa ao Font Awesome)
npm install react-icons

# Framer Motion (animações suaves)
npm install framer-motion

# React Toastify (notificações)
npm install react-toastify
```

### 6️⃣ Configurar Vite

#### **vite.config.js**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
```

### 7️⃣ Comandos do Vite

```powershell
# Desenvolvimento (Hot Reload)
npm run dev

# Build de Produção
npm run build

# Preview do Build
npm run preview

# Lint
npm run lint
```

### 8️⃣ Vantagens do Vite

#### **Performance**
- ⚡ **Desenvolvimento**: Start em < 1 segundo
- 🔄 **HMR**: Atualização instantânea (< 100ms)
- 📦 **Build**: 5-10x mais rápido que CRA

#### **Bundle Size**
- 📉 **CRA**: ~200-300KB (gzipped)
- 📉 **Vite**: ~50-100KB (gzipped)

#### **Developer Experience**
- 🎯 Zero configuração inicial
- 🔧 ESLint + Prettier integrados
- 🎨 CSS Modules nativos
- 📱 PWA ready

---

## 🔄 Comparação: HTML vs React + Vite

| Aspecto | HTML Puro | React + Vite |
|---------|-----------|--------------|
| **Performance** | Rápido | Muito Rápido |
| **Manutenção** | Difícil | Fácil |
| **Reusabilidade** | Baixa | Alta |
| **Estado** | Manual | Automático |
| **SEO** | Excelente | Bom (com SSR) |
| **Bundle Size** | Pequeno | Médio |
| **Developer Experience** | Básico | Excelente |

---

## 🎯 Próximos Passos

1. ✅ Criar projeto com `npm create vite@latest`
2. ✅ Migrar HTML para componentes React
3. ✅ Implementar estado com hooks
4. ✅ Adicionar animações com Framer Motion
5. ✅ Configurar rotas com React Router
6. ✅ Deploy (Vercel/Netlify)

---

## 📚 Recursos Úteis

- [Documentação Vite](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Vite + React Template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)

---

**🚀 Pronto para começar? Execute:**
```powershell
npm create vite@latest dgburguer-react -- --template react
cd dgburguer-react
npm install
npm run dev
```

**Desenvolvido com** ❤️ **por Francisco Douglas**
