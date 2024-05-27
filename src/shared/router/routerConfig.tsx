import {
  AdminModule,
  LoginModule,
  NotFoundModule,
  AdheridosModule,
  SorteosModule,
  UserModule,
  ExcelModule,
} from "./pageRouter";

enum ERoutes {
  LOGIN = "/",
  NOT_FOUND = "/*",
  ADMIN = "/admin",
  ADHERIDOS = "/admin/adheridos",
  SORTEOS = "/admin/sorteos",
  EXCEL = "/admin/excel",
  USER = "/user/:id",
}

type TActualRoutes =
  | "Login"
  | "NotFound"
  | "Admin"
  | "User"
  | "Adheridos"
  | "Sorteos"
  | "Excel";

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
    name: "Adheridos",
    path: ERoutes.ADHERIDOS,
    element: <AdheridosModule />,
  },
  {
    name: "Sorteos",
    path: ERoutes.SORTEOS,
    element: <SorteosModule />,
  },
  {
    name: "Excel",
    path: ERoutes.EXCEL,
    element: <ExcelModule />,
  },
  {
    name: "User",
    path: ERoutes.USER,
    element: <UserModule />,
  },
];

// Aca se le pone un path a cada modulo
