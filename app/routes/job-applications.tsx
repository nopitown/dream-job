import { Outlet } from "remix";

export default function JobApplicationsScreen() {
  return (
    <>
      <header>
        <h1>Job Applications</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Built by @nopitown</footer>
    </>
  );
}
