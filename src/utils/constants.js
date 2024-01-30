export const apiKey = "153d890daf5a4aed5da8e02043642994";
export const latitude = "42.864602";
export const longitude = "-88.331632";

export const fahrenheitThreshholds = { hot: 86, warm: 66 };
export const celsiusThreshholds = { hot: 30, warm: 19 };

export const baseUrl = "http://localhost:3001";

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
