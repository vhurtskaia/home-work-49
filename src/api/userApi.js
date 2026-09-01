const USER_API_URL = "https://jsonplaceholder.typicode.com/users/1";

export async function fetchUser() {
  const response = await fetch(USER_API_URL);

  if (!response.ok) {
    throw new Error(`Не вдалося завантажити користувача: ${response.status}`);
  }

  return response.json();
}
