import {useEffect, useState} from "react";

import {fetchUser} from "../api/userApi";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      setStatus("loading");
      setError("");

      try {
        const data = await fetchUser();

        if (isMounted) {
          setUser(data);
          setStatus("succeeded");
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : "Сталася невідома помилка");
          setStatus("failed");
        }
      }
    };

    void loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Профіль користувача</h2>
        <p className="mt-1 text-sm text-slate-500">
          Дані отримуються асинхронно з JSONPlaceholder.
        </p>
      </div>

      {status === "loading" && (
        <div role="status" aria-live="polite" className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
          Завантаження користувача...
        </div>
      )}

      {status === "failed" && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {status === "succeeded" && user && (
        <dl className="space-y-3 rounded-xl border border-slate-200 p-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Ім'я</dt>
            <dd className="mt-1 font-semibold text-slate-900">{user.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</dt>
            <dd className="mt-1 text-slate-700">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Телефон</dt>
            <dd className="mt-1 text-slate-700">{user.phone}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Компанія</dt>
            <dd className="mt-1 text-slate-700">{user.company?.name}</dd>
          </div>
        </dl>
      )}
    </section>
  );
}

export default UserProfile;
