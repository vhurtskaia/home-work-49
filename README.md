# Тестування асинхронної логіки React-компонентів

Навчальний React-проєкт на **Vite**, у якому реалізовано асинхронний `GET`-запит для отримання профілю користувача та ізольовано протестовано всі основні стани компонента.

## Опис

Компонент `UserProfile` знаходиться в `src/components/UserProfile.jsx` і отримує користувача з JSONPlaceholder через окремий API-модуль.

Компонент підтримує три стани:

- **Loading** — показується індикатор завантаження, поки запит очікує на відповідь.
- **Success** — відображаються ім'я, email, телефон та компанія користувача.
- **Error** — відображається повідомлення про помилку, якщо запит завершився невдало.

Для тестів зовнішній API не використовується. `fetchUser` мокается через `vi.mock`, тому тести повністю ізольовані від мережі.

## Структура

```text
src/
├── api/
│   └── userApi.js
├── components/
│   ├── UserProfile.jsx
│   └── UserProfile.test.jsx
├── test/
│   └── setup.js
├── App.jsx
├── main.jsx
└── index.css
```

## Технології

- React 19
- Vite
- Vitest
- React Testing Library
- jest-dom matchers
- Tailwind CSS
- JSONPlaceholder API

## Встановлення

```bash
npm install
```

## Запуск development server

```bash
npm run dev
```

## Запуск тестів

Одноразовий запуск усіх тестів:

```bash
npm test
```

Запуск тестів у watch mode:

```bash
npm run test:watch
```

## Що тестується

### 1. Loading state

Перевіряється, що під час pending-запиту компонент показує `role="status"` з повідомленням про завантаження.

### 2. Successful request

Перевіряється, що після успішної відповіді відображаються дані користувача: ім'я, email, телефон та компанія.

### 3. Failed request

Перевіряється, що після відхилення Promise відображається `role="alert"` з повідомленням про помилку.

## Мокування API

У `UserProfile.test.jsx` використовується:

```js
vi.mock("../api/userApi", () => ({
  fetchUser: vi.fn(),
}));
```

Кожен тест задає власний результат мокованого запиту:

- `mockReturnValue(new Promise(() => {}))` — pending;
- `mockResolvedValue(user)` — success;
- `mockRejectedValue(new Error(...))` — error.

Таким чином, тести не виконують реальних HTTP-запитів до JSONPlaceholder.

## Результат тестування

У проєкті передбачено три сценарії, які мають проходити успішно після встановлення залежностей:

```text
✓ UserProfile > shows a loading indicator while the request is pending
✓ UserProfile > renders user data after a successful request
✓ UserProfile > renders an error message when the request fails

3 tests passed
```
