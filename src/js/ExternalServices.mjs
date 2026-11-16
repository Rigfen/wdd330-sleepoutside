async function convertToJson(res) {
    const data= await res.json();

  if (res.ok) {
    return data;
  } else {
    throw data;
  }
}