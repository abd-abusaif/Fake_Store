const getCategoryProducts = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    const {data} = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    return data;
}

const displayProducts = async ()=> {
    const products = await getCategoryProducts();

    const result = products.map( (product)=>
    {
        return `
        <div class="product">
        <img src="${product.image}"/>
        <h2>${product.title}</h2>
        <p>${product.price}</p>
        <a href='product.html?id=${product.id}'>Details</a>
        </div>
        `
    }).join('');

    document.querySelector(".products .row").innerHTML= result;
    console.log(products);
}

displayProducts();