const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {

  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(order) {
    const response = await fetch(`${baseURL}checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    return await convertToJson(response);
  }
}
