import HomeModule from "@/modules/home";
import React from "react";

export { HomeModule };

export const LoginModule = React.lazy(() => import("@/modules/login"));
export const RegisterModule = React.lazy(() => import("@/modules/register"));
export const NotFoundModule = React.lazy(() => import("@/modules/notfound"));

//Aca se cargan los modulos de la aplicacion
