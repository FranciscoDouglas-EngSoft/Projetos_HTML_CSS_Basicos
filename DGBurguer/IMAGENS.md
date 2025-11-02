# 📁 Estrutura de Pastas para Imagens - DGBurguer

## 🗂️ Organização das Imagens

Crie a seguinte estrutura de pastas dentro de `assets/img/`:

```
DGBurguer/
└── assets/
    └── img/
        ├── hamburguer/
        │   ├── burgue-sem-fundo.png (já existe)
        │   ├── h1.png (já existe)
        │   ├── h2.png (já existe)
        │   ├── h3.png (já existe)
        │   ├── h4.png (já existe)
        │   └── h5.png (já existe)
        ├── pizza/
        │   ├── pizza1.png
        │   ├── pizza2.png
        │   ├── pizza3.png
        │   ├── pizza4.png
        │   ├── pizza5.png
        │   └── pizza6.png
        ├── batata/
        │   ├── batata1.png
        │   ├── batata2.png
        │   ├── batata3.png
        │   └── batata4.png
        └── bebida/
            ├── refri1.png
            ├── refri2.png
            ├── refri3.png
            ├── refri4.png
            ├── refri5.png
            └── refri6.png
```

## 📋 Lista de Imagens Necessárias

### 🍕 Pizzas (6 imagens)
- **pizza1.png** - Pizza Margherita
- **pizza2.png** - Pizza Calabresa
- **pizza3.png** - Pizza Portuguesa
- **pizza4.png** - Pizza Quatro Queijos
- **pizza5.png** - Pizza Pepperoni
- **pizza6.png** - Pizza Frango Catupiry

### 🍟 Batatas (4 imagens)
- **batata1.png** - Batata Frita Tradicional
- **batata2.png** - Batata com Cheddar e Bacon
- **batata3.png** - Batata Rústica
- **batata4.png** - Batata Supreme

### 🥤 Refrigerantes (6 imagens)
- **refri1.png** - Coca-Cola 350ml
- **refri2.png** - Guaraná Antarctica 350ml
- **refri3.png** - Fanta Laranja 350ml
- **refri4.png** - Sprite 350ml
- **refri5.png** - Coca-Cola 2L
- **refri6.png** - Guaraná Antarctica 2L

## 💡 Dicas para as Imagens

### Formato Recomendado
- **Formato:** PNG com fundo transparente
- **Tamanho:** 500x500px (1:1)
- **Resolução:** 72 DPI
- **Peso:** Máximo 200KB por imagem

### Onde Encontrar Imagens
1. **Freepik** - https://www.freepik.com
2. **Pngtree** - https://pngtree.com
3. **Flaticon** - https://www.flaticon.com
4. **Unsplash** - https://unsplash.com
5. **Pexels** - https://www.pexels.com

### Dicas de Busca
- Pizza: "pizza top view png", "pizza transparent"
- Batata: "french fries png", "potato fries transparent"
- Refrigerante: "soda can png", "soft drink transparent"

## 🛠️ Comandos PowerShell para Criar as Pastas

Execute no terminal dentro da pasta do projeto:

```powershell
# Criar estrutura de pastas
New-Item -ItemType Directory -Force -Path "assets/img/pizza"
New-Item -ItemType Directory -Force -Path "assets/img/batata"
New-Item -ItemType Directory -Force -Path "assets/img/bebida"
```

## ✅ Checklist de Imagens

### Hambúrgueres (Já existem)
- [x] burgue-sem-fundo.png
- [x] h1.png
- [x] h2.png
- [x] h3.png
- [x] h4.png
- [x] h5.png

### Pizzas
- [ ] pizza1.png
- [ ] pizza2.png
- [ ] pizza3.png
- [ ] pizza4.png
- [ ] pizza5.png
- [ ] pizza6.png

### Batatas
- [ ] batata1.png
- [ ] batata2.png
- [ ] batata3.png
- [ ] batata4.png

### Refrigerantes
- [ ] refri1.png
- [ ] refri2.png
- [ ] refri3.png
- [ ] refri4.png
- [ ] refri5.png
- [ ] refri6.png

## 🎨 Exemplo de Estilo Visual

Todas as imagens devem seguir o mesmo padrão:
- Fundo transparente ou branco puro
- Produto centralizado
- Vista de cima (top view) ou frontal
- Iluminação consistente
- Cores vibrantes e apetitosas

## 📝 Notas Importantes

1. **Nomes dos arquivos**: Use exatamente os nomes especificados (minúsculas)
2. **Extensão**: Sempre use `.png` para melhor qualidade
3. **Backup**: Mantenha uma cópia das imagens originais
4. **Otimização**: Use ferramentas como TinyPNG para reduzir o tamanho
5. **Consistência**: Mantenha o mesmo estilo visual em todas as categorias

## 🔄 Imagens Placeholder

Enquanto não tiver as imagens reais, você pode usar:
- https://via.placeholder.com/500x500/61ff22/000000?text=Pizza
- https://via.placeholder.com/500x500/61ff22/000000?text=Batata
- https://via.placeholder.com/500x500/61ff22/000000?text=Refri

---

**Desenvolvido por Francisco Douglas**
