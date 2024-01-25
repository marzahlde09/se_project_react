const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export const getItems = () => {
  return request(`${baseUrl}/items`, {
    headers: {"Content-Type": "application/json"},
  });
};

export const addItem = ({ name, imageUrl, weather }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  });
};

export const deleteItem = (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
