const baseUrl = "http://localhost:3001";
const header = { "Content-Type": "application/json" };

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export const getItems = () => {
  return request(`${baseUrl}/items`, {
    headers: header,
  });
};

export const addItem = ({
  name: name,
  imageUrl: imageUrl,
  weather: weather,
}) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      name: name,
      weather: weather,
      imageUrl: imageUrl,
    }),
  });
};

export const deleteItem = (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: header,
  });
};
