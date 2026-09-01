import ControlledForm from "./components/ControlledForm";
import Posts from "./components/Posts";
import SubmissionsList from "./components/SubmissionsList";
import UserProfile from "./components/UserProfile";
import UncontrolledForm from "./components/UncontrolledForm";

function App() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            React під контролем
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Controlled та Uncontrolled компоненти,
            а також асинхронний запит до JSONPlaceholder.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <ControlledForm />
          <UncontrolledForm />
        </div>

        <div className="mt-6">
          <SubmissionsList />
        </div>

        <div className="mt-6">
          <Posts />
        </div>

        <div className="mt-6">
          <UserProfile />
        </div>
      </div>
    </main>
  );
}

export default App;