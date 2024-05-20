import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./shared/router/Router";
import { LoadingSpinnerModule } from "./modules/loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinnerModule />}>
          <AppRouter />
          <ToastContainer />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
