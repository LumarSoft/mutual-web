import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./shared/router/Router";
import { LoadingSpinner } from "./shared/loading/LoadingSpinner";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
