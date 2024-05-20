import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./shared/router/Router";
import { LoadingSpinnerModule } from "./modules/loading";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
        <Suspense fallback={<LoadingSpinnerModule />}>
          <AppRouter />
          <ToastContainer />
        </Suspense>
    </BrowserRouter>
  );
}

export default App;
