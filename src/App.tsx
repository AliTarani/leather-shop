import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

let MyRes: any;

const delayPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Resolved after 3 seconds");
  }, 3000);
}).then((res) => {
  MyRes = res;
});

function App() {
  if (!MyRes) {
    throw delayPromise;
  }
  return (
    <>
      <ErrorBoundary>
        <h1> App </h1>
        {MyRes}
      </ErrorBoundary>
    </>
  );
}

export default App;
