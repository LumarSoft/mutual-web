import {
  LoginModule,
  NotFoundModule,
  RegisterModule,
  UnderConstructionModule,
} from "./pageRouter";

enum ERoutes {
  LOGIN = "/",
  REGISTER = "/register",
  NOT_FOUND = "/*",
  UNDER_CONSTRUCTION = "/under-construction",
}

type TActualRoutes = "Login" | "Register" | "NotFound" | "UnderConstruction";

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
    element: <NotFoundModule />,
  },
  {
    name: "UnderConstruction",
    path: ERoutes.UNDER_CONSTRUCTION,
    element: <UnderConstructionModule />,
  },
];

// Aca se le pone un path a cada modulo
