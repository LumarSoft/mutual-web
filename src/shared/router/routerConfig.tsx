import { LoginModule, NotFoundModule, RegisterModule } from "./pageRouter";

enum ERoutes {
  LOGIN = "/",
  REGISTER = "/register",
  NOT_FOUND = "/*",
}

type TActualRoutes = "Login" | "Register" | "NotFound";

interface IRoute {
  name: TActualRoutes;
  path: string;
  element: JSX.Element;
  subRoutes?: IRoute[];
}

export const routes: IRoute[] = [
  {
    name: "Login",
    path: ERoutes.LOGIN,
    element: <LoginModule />,
  },
  {
    name: "Register",
    path: ERoutes.REGISTER,
    element: <RegisterModule />,
  },
  {
    name: "NotFound",
    path: ERoutes.NOT_FOUND,
    element: <NotFoundModule/>,
  },
];

// Aca se le pone un path a cada modulo
