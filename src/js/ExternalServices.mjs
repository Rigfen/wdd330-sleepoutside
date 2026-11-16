async function convertToJson(res) {
    const jsonresponse= await res.json();

  if (res.ok) {
    return jsonresponse;
  } else {
    throw {
        name: "ServiceError",
        message: jsonresponse,
    };
  }
}