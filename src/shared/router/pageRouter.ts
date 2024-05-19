import HomeModule from "@/modules/home";
import React from "react";

export { HomeModule };

export const LoginModule = React.lazy(() => import("@/modules/login"));
export const NotFoundModule = React.lazy(() => import("@/modules/notfound"));
export const AdminModule = React.lazy(() => import("@/modules/admin"));

//Aca se cargan los modulos de la aplicacion