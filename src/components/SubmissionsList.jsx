import {useDispatch, useSelector} from "react-redux";

import {
  clearSubmissions,
  selectSubmissions,
} from "../redux/slices/submissionsSlice";

const SOURCE_LABELS = {
  controlled: "Controlled",
  uncontrolled: "Uncontrolled",
};

function SubmissionsList() {
  const dispatch = useDispatch();
  const submissions = useSelector(selectSubmissions);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Надіслані повідомлення
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Спільний стан у Redux — заповнюється з обох форм вище.
          </p>
        </div>

        {submissions.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch(clearSubmissions())}
            className="rounded-lg border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Очистити
          </button>
        )}
      </div>

      {submissions.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-500">
          Ще немає жодного надсилання — заповніть форму вище.
        </p>
      ) : (
        <ul className="space-y-3">
          {submissions.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{item.name}</p>
                <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600">
                  {SOURCE_LABELS[item.source]}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">{item.email}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {item.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SubmissionsList;
