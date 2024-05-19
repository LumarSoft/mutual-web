import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./shared/router/Router";
import { LoadingSpinnerModule } from "./modules/loading";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <main className="h-screen w-screen dark text-white bg-background">
        <Suspense fallback={<LoadingSpinnerModule />}>
          <AppRouter />
          <ToastContainer />
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;
