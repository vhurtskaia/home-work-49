import {useRef} from "react";
import {useDispatch} from "react-redux";

import {addSubmission} from "../redux/slices/submissionsSlice";

function UncontrolledForm() {
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();

    if (!name || !email || !message) {
      return;
    }

    dispatch(
      addSubmission({source: "uncontrolled", name, email, message})
    );

    event.target.reset();
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Uncontrolled Form
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Значення полів зберігаються DOM, а React отримує їх через ref.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="uncontrolled-name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Ім'я
          </label>

          <input
            ref={nameRef}
            id="uncontrolled-name"
            type="text"
            placeholder="Введіть ім'я"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="uncontrolled-email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            ref={emailRef}
            id="uncontrolled-email"
            type="email"
            placeholder="example@mail.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="uncontrolled-message"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Повідомлення
          </label>

          <textarea
            ref={messageRef}
            id="uncontrolled-message"
            placeholder="Ваше повідомлення"
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
        >
          Відправити
        </button>
      </form>
    </section>
  );
}

export default UncontrolledForm;