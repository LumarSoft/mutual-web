import { LoginModule, NotFoundModule } from "./pageRouter";

enum ERoutes {
  LOGIN = "/",
  NOT_FOUND = "/*",
}

type TActualRoutes = "Login" | "NotFound";

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
    name: "NotFound",
    path: ERoutes.NOT_FOUND,
    element: <NotFoundModule />,
  },
];

// Aca se le pone un path a cada modulo
