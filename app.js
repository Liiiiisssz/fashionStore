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
    const nossosDestaques = document.getElementById("featured-list");
    try{
        const requisicao = await fetch(
            `https://api.escuelajs.co/api/v1/products?offset=0&limit=3`
        )
        const products = await requisicao.json();
        
        nossosDestaques.innerHTML = "";
    
        products.forEach(product => {
            nossosDestaques.insertAdjacentHTML("beforeend", `
                <article class="card placeholder-card">
                    <div class="card-img-wrapper">
                        <img src="${product.images[0]}" alt="${product.description}" class="card-img">
                    </div>
                    <div class="card-content">
                        <span class="card-category">${product.category.name}</span>
                        <h3 class="card-title">${product.title}</h3>
                        <div class="card-footer">
                            <span class="card-price">R$ ${product.price},99</span>
                            <a href="detail.html?id=${product.id}" class="btn-primary btn-small">Ver Detalhes</a>
                        </div>
                    </div>
                </article>
            `);
        });
    } catch(error){
        nossosDestaques.innerHTML = "<p>Erro ao carregar produtos.</p>";
        console.error(error);
    }
}

async function loadMenu(){
    await loadCategories();
    await loadAllProducts();
}

async function loadCategories(){
    const select = document.getElementById("category-filter");
    try{
        const requisicao = await fetch(
            `https://api.escuelajs.co/api/v1/categories`
        );
        const cat = await requisicao.json();
        const categorias = cat.slice(0,5)

        categorias.forEach(categoria =>{
            select.insertAdjacentHTML("beforeend", `
                <option value="${categoria.id}">
                    ${categoria.name}
                </option>
            `);
        })
        select.addEventListener("change", (e) =>{
            const id = e.target.value;
            if(id){
                loadProductsByCategory(id);
            } else {
                loadAllProducts();
            }
        })
    } catch(error){
        console.error("Erro ao carregar categorias", error);
    }
}

async function loadAllProducts(){
    const list = document.getElementById("products-list");
    const requisicao = await fetch(
        `https://api.escuelajs.co/api/v1/products`
    );
    const products = await requisicao.json();
    renderProducts(products);
}

async function loadProductsByCategory(id){
    const requisicao = await fetch(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${id}`
    );
    const products = await requisicao.json();
    renderProducts(products);
}

function renderProducts(products){
    const list = document.getElementById("products-list");
    list.innerHTML = "";
        
    products.forEach(product =>{
        list.insertAdjacentHTML("beforeend", `
            <article class="card placeholder-card">
                <div class="card-img-wrapper">
                    <img src="${product.images[0]}" alt="${product.description}" class="card-img">
                </div>
                <div class="card-content">
                    <span class="card-category">${product.category.name}</span>
                    <h3 class="card-title">${product.title}</h3>
                    <div class="card-footer">
                        <span class="card-price">R$ ${product.price},99</span>
                        <a href="detail.html?id=${product.id}" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
            </article>
        `);
    })
}

async function loadDetail(){
    const detalhes = document.getElementById("product-detail");
    const param = new URLSearchParams(window.location.search);
    const id = param.get("id");

    try{
        const requisicao = await fetch(
            `https://api.escuelajs.co/api/v1/products/${id}`
        );
        const product = await requisicao.json();
        renderDetail(product);

    } catch(error){
        detalhes.innerHTML = "<p>Erro ao carregar produto.</p>";
        console.error(error);
    }
}

function renderDetail(product){
    const detalhes = document.getElementById("product-detail");
    detalhes.innerHTML = `
        <img src="${product.images[0]}" alt="${product.description}" class="detail-img">
        <div class="detail-info">
            <span class="card-category" style="font-size:1rem; margin-bottom:1rem; display:block;">
                ${product.category.name}
            </span>
            <h1>${product.title}</h1>
            <div class="detail-price">R$ ${product.price},99</div>
            <p class="detail-description">${product.description}</p>
            <button class="btn-primary" disabled>Adicionar ao Carrinho</button>
        </div>
    `;
}

function toggleTheme(){
    const temaAtual = document.documentElement.getAttribute("data-theme");

    if(temaAtual === "dark"){
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
}