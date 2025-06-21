const getProducts = async (page)=>{
    const skip = (page -1)*10;
    const {data} = await axios.get(`https://fakestoreapi.com/products?limit=10&skip=${skip}`);
    return data;
}

let allProducts = []; // my note -- to store all product, beacuse the fake store don't use skip and limit

const getAllProducts = async () => {
    document.querySelector(".loading").classList.remove("d-none");
    try{
        const {data} = await axios.get(`https://fakestoreapi.com/products`);
        allProducts = data;
        displayProducts(1);
    }catch(error){
        document.querySelector(".products .row").innerHTML = "<p> Error </p>";
    }finally{
        document.querySelector(".loading").classList.add("d-none");
    }
}
const displayProducts = async (page=1) => {

    const perPage = 10;
    const start = (page -1 ) * perPage;
    const end = start + perPage;

    const current = allProducts.slice(start,end);
    const result = current.map(product => 
        `
        <div class='product'>
        <h2>${product.title}</h2>
        <img src="${product.image}" class = "product-image"/>
        </div>
        `
    ).join('');

    document.querySelector(".products .row").innerHTML = result;


    const totalPages= Math.ceil(allProducts.length/ perPage);
    let paginationLink = "";

    if(page > 1){
        paginationLink = `<li><button onclick = displayProducts(${page-1})>&lt;</button></li>`;
    }else{
        paginationLink = `<li><button disabled >&lt;</button></li>`;
    }

    for(let i=1; i<= totalPages; i++){
        if(i === page){
         paginationLink += `<li><button class="active" onclick=displayProducts(${i})>${i}</button></li>`;
           }else{
            paginationLink += `<li><button onclick=displayProducts(${i})>${i}</button></li>`;
}   
    }

    if(page < totalPages){
        paginationLink += `<li><button onclick = displayProducts(${parseInt(page)+1})>&gt;</button></li>`;
    }else{
        paginationLink += `<li><button disabled>&gt;</button></li>`;
    }

    document.querySelector(".pagination").innerHTML= paginationLink;  
    
    customModel();
}



getAllProducts();



function customModel(){
    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".close-btn");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    const images = Array.from( document.querySelectorAll(".product-image"));

    let currentIndex = 0;

    images.forEach( function(img){
        img.addEventListener("click",(e)=>{
            modal.classList.remove("d-none");
            modal.querySelector("img").setAttribute("src",e.target.src);

            const currentImg= e.target;
            currentIndex = images.indexOf(currentImg);
            console.log(currentIndex);
        });
    });

    closeBtn.addEventListener("click", (e)=>{
        modal.classList.add("d-none");
    });

    rightBtn.addEventListener("click", (e)=>{
        currentIndex++;
        if(currentIndex >= images.length){
            currentIndex = 0;
        }
        const src = images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
    });

    leftBtn.addEventListener("click", (e)=>{
        currentIndex--;
        if(currentIndex < 0){
            currentIndex = images.length-1;
        }
        const src=images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
        console.log("src");
    });

    // keyboard events
    document.addEventListener("keydown", (e)=>{
        console.log(e);
        if(e.code == "ArrowRight"){
            currentIndex++;
            if(currentIndex >= images.length){
                currentIndex = 0;
            }
            const src = images[currentIndex].getAttribute("src");
            modal.querySelector("img").setAttribute("src",src);
            console.log(src);
        }

        else if(e.code == "ArrowLeft"){
            currentIndex--;
            if(currentIndex < 0){
                currentIndex = images.length-1;
            }
            const src = images[currentIndex].getAttribute("src");
            modal.querySelector("img").setAttribute("src",src);
        }else if (e.code == "Escape"){
            modal.classList.add('d-none');
        }


        
    });
}