const getProductDetails = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);

    const html = `
      <div class="product">
        <img src="${data.image}" alt="${data.title}" />
        <h2>${data.title}</h2>
        <p><strong>Price:</strong> $${data.price}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Category:</strong> ${data.category}</p>
      </div>
    `;

    document.querySelector(".product-info").innerHTML = html;
  } catch (error) {
    document.querySelector(".product-info").innerHTML = "<p>Error loading product</p>";
  }
};

getProductDetails();
