const API_ADDRESS = "http://localhost:8000/wordleAutocomplete";

export function fetchWordleAutocomplete(input) {
  return fetch(API_ADDRESS, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ word_prefix: input })
  }).then(async (response) => {
    if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.map((value) => ({ title: value }));
    } else if (response.status === 500) {
        const jsonData = await response.json();
        return Promise.reject({ error: jsonData.error });
    }

    return Promise.reject({ error: "An Unknown Error Occured" });
  });
}
