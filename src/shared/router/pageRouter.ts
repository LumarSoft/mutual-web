import HomeModule from "@/modules/home";
import React from "react";

export { HomeModule };

export const LoginModule = React.lazy(() => import("@/modules/login"));
export const NotFoundModule = React.lazy(() => import("@/modules/notfound"));
export const AdminModule = React.lazy(() => import("@/modules/admin"));
// export const AdheridosModule = React.lazy(() => import("@/modules/adheridos"));
// export const SorteosModule = React.lazy(() => import("@/modules/sorteos"));
export const UserModule = React.lazy(() => import("@/modules/user"));
export const ExcelModule = React.lazy(() => import("@/modules/excel"));
//Aca se cargan los modulos de la aplicacion
