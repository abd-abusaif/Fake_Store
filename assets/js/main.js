const getCategories = async function(){
    try{
        const {data} = await axios.get(`https://fakestoreapi.com/products/categories`);
        return data;
    }catch(error){
        return [];
    }}

const displayCategories = async() =>{
    try{
        const categoires = await getCategories();
        console.log(categoires);
        
        const result = categoires.map((category) =>{
            return `
        <div class='category-card'>
        <h2>${category}</h2>
        <a href= './details.html?category=${category}'>Products</a>
        </div>
        `
        }).join('');
        document.querySelector(".categories .row").innerHTML =result;
    }
    catch(error){
        document.querySelector(".categories .row").innerHTML= "<p> please try again later ... </p>"
    }finally{
        document.querySelector(".loading").classList.add("d-none");
    }}
    
displayCategories();
