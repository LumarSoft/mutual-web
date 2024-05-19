import { Route, Routes } from "react-router-dom";
import { protectedRoutes, routes } from "./routerConfig";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {/* Ahora para las rutas protegidas */}
      {protectedRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<ProtectedRoute>{route.element}</ProtectedRoute>}
        />
      ))}
    </Routes>
  );
};

// aca se les dice oficialmente que van a ser rutas
