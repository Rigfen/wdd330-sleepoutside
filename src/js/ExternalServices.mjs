const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json()
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
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


async checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${baseURL}checkout/`, options);

  return convertToJson(response);
}

}