import {
  AdminModule,
  LoginModule,
  NotFoundModule,
  AdheridosModule,
  SorteosModule,
} from "./pageRouter";

enum ERoutes {
  LOGIN = "/",
  NOT_FOUND = "/*",
  ADMIN = "/admin",
  ADHERIDOS = "/admin/adheridos",
  SORTEOS = "/admin/sorteos",
  USER = "/user/:id",
}

type TActualRoutes =
  | "Login"
  | "NotFound"
  | "Admin"
  | "User"
  | "Table"
  | "Sorteos";

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

export const protectedRoutes: IRoute[] = [
  {
    name: "Admin",
    path: ERoutes.ADMIN,
    element: <AdminModule />,
  },
  {
    name: "Table",
    path: ERoutes.ADHERIDOS,
    element: <AdheridosModule />,
  },
  {
    name: "User",
    path: ERoutes.USER,
    element: <AdminModule />,
  },
  {
    name: "Sorteos",
    path: ERoutes.SORTEOS,
    element: <SorteosModule />,
  },
];

// Aca se le pone un path a cada modulo
