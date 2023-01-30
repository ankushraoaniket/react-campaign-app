import Campaign from "./components/Campaign";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Campaign />
      </ErrorBoundary>
    </div>
  );
}

export default App;
