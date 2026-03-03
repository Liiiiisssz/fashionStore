# Atividade Prática - Fashion Store (Consumo de API REST)

Nesta atividade, você será responsável por implementar a lógica JavaScript de um site completo de e-commerce (Fashion Store) utilizando a **Platzi Fake Store API** (`https://api.escuelajs.co/api/v1/`).

Todos os arquivos de interface (`.html` e `.css`) já estão prontos e fornecidos no projeto. A sua missão é criar a interação dinâmica do site via requisições assíncronas.

## 🎯 Objetivos e Requisitos

Você deve criar um arquivo chamado `app.js` na raiz do projeto e implementar as seguintes funcionalidades:

### 1. Página Inicial (`index.html`)
- Faça uma requisição para a API buscando a lista de produtos.
- Exiba apenas os **3 produtos mais recentes** (ou os 3 primeiros) na seção "Nossos Destaques".
- Substitua o card estático (placeholder) que está no HTML pelos cards dinâmicos retornados pela API.

### 2. Catálogo e Filtro (`menu.html`)
- Ao carregar a página, faça uma requisição para buscar e exibir **todos os produtos** no grid.
- Busque e preencha as opções do `<select>` de filtro com as **categorias** retornadas pela API.
- Implemente a lógica de filtro: ao selecionar uma categoria no dropdown, a página deve buscar e exibir apenas os produtos pertencentes àquela categoria selecionada.

### 3. Detalhes do Produto (`detail.html`)
- Os botões "Ver Detalhes" dos cards criados dinamicamente devem ter links que direcionam para `detail.html?id=ID_DO_PRODUTO`.
- Na página `detail.html`, recupere o ID do produto através dos parâmetros da URL (`URLSearchParams`).
- Faça uma requisição para a rota de produto único usando esse ID e exiba os dados na tela (imagem, título, preço, descrição e categoria), substituindo o conteúdo de placeholder.

### 4. Modo Claro / Escuro (Alternar Tema)
- Implemente a funcionalidade para o botão `🌓` (que já existe no cabeçalho das páginas HTML).
- A lógica deve alternar um atributo ou classe para mudar o site de modo escuro (padrão) para o modo claro e vice-versa.
- Dica: O CSS já possui variáveis específicas atreladas ao atributo `data-theme="light"` na tag `<html>`, e também há scripts no `<head>` dos HTMLs que tentam resgatar a preferência do usuário armazenada no `localStorage`. Siga esse conceito para preservar a preferência do usuário entre as páginas.

## 📚 Endpoints Úteis da API
Base URL: `https://api.escuelajs.co/api/v1`

- Lista de Produtos: `GET /products`
- Produto Único: `GET /products/{id}`
- Lista de Categorias: `GET /categories`
- Produtos por Categoria: `GET /products/?categoryId={id_da_categoria}` (Dica: é possível passar `limit` e `offset`)

## 🚀 Como começar?

1. Crie um arquivo `app.js` na mesma pasta dos seus HTMLs.
2. Utilize instruções baseadas em blocos `try/catch` e a API `fetch` do próprio navegador com `async`/`await` para realizar as requisições.
3. Utilize a extensão **Live Server** (do VS Code) para abrir as páginas no navegador simulando um servidor real, evitando problemas com CORS.

Mão na massa e bom código!
