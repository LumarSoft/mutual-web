import HomeModule from "@/modules/home";
import React from "react";

export { HomeModule };

export const LoginModule = React.lazy(() => import("@/modules/login"));
export const RegisterModule = React.lazy(() => import("@/modules/register"));
export const NotFoundModule = React.lazy(() => import("@/modules/notfound"));
export const UnderConstructionModule = React.lazy(
  () => import("@/modules/underConstruction")
);

//Aca se cargan los modulos de la aplicacion
