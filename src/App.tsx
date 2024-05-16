import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./shared/router/Router";
import { LoadingSpinner } from "./shared/loading/LoadingSpinner";

function App() {
  return (
    <BrowserRouter>
      <main className="h-screen w-screen dark">
        <Suspense fallback={<LoadingSpinner />}>
          <AppRouter />
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;
