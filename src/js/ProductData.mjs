const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(response) {
  if (response.ok) {
    return response.json();
  }

  throw new Error("Bad Response");
}

export default class ProductData {

  constructor() {

  
  }
  
  async getData(category) {
    const url = await fetch(`${baseURL}products/search/${category}`);
    console.log("fetching from:", url);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
}