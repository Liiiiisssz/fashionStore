document.addEventListener("DOMContentLoaded", () =>{
    const page = window.location.pathname;

    if(page.includes("index.html") || page === "/"){
        loadHome();
    }
    if(page.includes("menu.html")){
        loadMenu();
    }
    if(page.includes("detail.html")){
        loadDetail();
    }
});

async function loadHome(){
    const container = document.getElementById("featured-list");
    try{
        const requisicao = await fetch(
            'https://api.escuelajs.co/api/v1/products?offset=0&limit=3'
        )
        const produtos = await requisicao.json();

        container.innerHTML = ""

        produtos.forEach(produto => {
            container.insertAdjacentHTML("beforeend", `
            <article class="card placeholder-card">
                <div class="card-img-wrapper">
                    <img src="${produto.images[0]}" alt="${produto.description}" class="card-img">
                </div>
                <div class="card-content">
                    <span class="card-category">${produto.category}</span>
                    <h3 class="card-title">${produto.title}</h3>
                    <div class="card-footer">
                        <span class="card-price">R$ ${produto.price},00</span>
                        <a href="#" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
          </article>
            `)
        });
    } catch(error){
        container.innerHTML = "<p>Erro ao carregar destaques</p>"
    }
}

function loadMenu(){
    loadCategories()
    loadAllProducts()
}

async function loadCategories(){
    try{
        const requisicao = await fetch(
            'https://api.escuelajs.co/api/v1/categories?offset=0&limit=5'
        )
        const categorias = await requisicao.json();

        const select = document.getElementById("category-filter")
        select.innerHTML = ""

        categorias.forEach(categoria =>{
            select.insertAdjacentHTML("beforeend", `
            <option value="${categoria.id}">${categoria.name}</option>
            `)
        })
        select.addEventListener("change", (e) =>{
            const id = e.target.value;
            if(id){
                loadProductsCategory(id); 
            } else {
                loadAllProducts();
            }
        });
    } catch(error){
        console.error(error);
    }
}

async function loadAllProducts(){
    const requisicao = await fetch(
        'https://api.escuelajs.co/api/v1/products'
    );
    const produtos = await requisicao.json();
    renderProducts(produtos);
}

async function loadProductsCategory(id){
    const requisicao = await fetch(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${id}`
    )
    const produtos = await requisicao.json()
    renderProducts(produtos);
}

function renderProducts(produtos){
    const list = document.getElementById("products-list")
    list.innerHTML = ""
    produtos.forEach(produto =>{
        list.insertAdjacentHTML("beforeend", `
        <article class="card placeholder-card">
          <div class="card-img-wrapper">
            <img src="${produto.images[0]}" alt="${produto.description}" class="card-img">
          </div>
          <div class="card-content">
            <span class="card-category">${produto.category}</span>
            <h3 class="card-title">${produto.title}</h3>
            <div class="card-footer">
              <span class="card-price">R$ ${produto.price},00</span>
              <a href="detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
            </div>
          </div>
        </article>
        `)
    })
}

async function loadDetail(){
    const detalhes = document.getElementById("product-detail")
    const param = new URLSearchParams(window.location.search)
    const id = param.get("id")
    try{
        const requisicao = await fetch(
            `https://api.escuelajs.co/api/v1/products/${id}`
        )
        const dados = await requisicao.json()

        detalhes.innerHTML = `
            <img src="${dados.images[0]}" alt="${dados.description}" class="detail-img">
            <div class="detail-info">
                <span class="card-category" style="font-size:1rem; margin-bottom:1rem; display:block;">Categoria: ${dados.category}</span>
                <h1>${dados.title}</h1>
                <div class="detail-price">R$ ${dados.price},00</div>
                <p class="detail-description">${dados.description}</p>
                <button class="btn-primary" disabled>Adicionar ao Carrinho</button>
            </div>
        `
    } catch(error){
        detalhes.innerHTML = "<p>Erro ao carregar detalhes</p>"
    }
}

function toggleTheme(){
    const tema = document.documentElement.getAttribute("data-theme")

    if(tema === "dark"){
        document.documentElement.setAttribute("data-theme", "light")
        localStorage.setItem("theme", "light")
    } else {
        document.documentElement.setAttribute("data-theme", "dark")
        localStorage.setItem("theme", "dark")
    }
}