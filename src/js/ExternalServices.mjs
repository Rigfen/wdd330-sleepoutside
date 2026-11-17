const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(response) {
  if (response.ok) {
    return response.json();
  }

  throw new Error("Bad Response");
}

export default class ProductData {
  async getData(category) {
    const response = await fetch(
      `${baseURL}products/search/${encodeURIComponent(category)}`
    );

    const data = await convertToJson(response);
    return data.Result;
  }

  async searchProducts(searchTerm) {
    const response = await fetch(`${baseURL}products`);
    const products = await convertToJson(response);

    const search = searchTerm.toLowerCase();

    return products.filter((product) => {
      return (
        product.Name.toLowerCase().includes(search) ||
        product.NameWithoutBrand.toLowerCase().includes(search) ||
        product.Brand.Name.toLowerCase().includes(search)
      );
    });
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);

    const data = await convertToJson(response);
    return data.Result;
  }
}