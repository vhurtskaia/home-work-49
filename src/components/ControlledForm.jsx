import {useState} from "react";
import {useDispatch} from "react-redux";

import {addSubmission} from "../redux/slices/submissionsSlice";

function ControlledForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }

    dispatch(
      addSubmission({source: "controlled", name, email, message})
    );

    setMessage("");
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Controlled Form
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Значення полів контролюються React state.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="controlled-name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Ім'я
          </label>

          <input
            id="controlled-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Введіть ім'я"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="controlled-email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="controlled-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="example@mail.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="controlled-message"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Повідомлення
          </label>

          <textarea
            id="controlled-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ваше повідомлення"
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
        >
          Відправити
        </button>
      </form>

      {name && (
        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Поточне значення:
          </p>

          <p className="mt-1 font-medium text-slate-900">
            {name}
          </p>
        </div>
      )}
    </section>
  );
}

export default ControlledForm;