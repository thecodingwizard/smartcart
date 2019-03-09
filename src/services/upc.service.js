import "whatwg-fetch";

// TODO replace
export function fetchLink(accessUrl, password) {
  return fetch(`mneh/links/${accessUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password })
  }).then(response => response.json());
}