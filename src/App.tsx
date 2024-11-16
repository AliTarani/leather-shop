import ErrorBoundary from "./components/ErrorBoundary";

import "./App.css";

function App() {
  return (
    <>
      <ErrorBoundary>
        <h1>my App</h1>
      </ErrorBoundary>
    </>
  );
}

export default App;
