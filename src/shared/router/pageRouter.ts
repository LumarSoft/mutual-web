import React from "react";


export const LoginModule = React.lazy(() => import("@/modules/login"));
export const NotFoundModule = React.lazy(() => import("@/modules/notfound"));
export const UnderConstructionModule = React.lazy(
  () => import("@/modules/underConstruction")
);
export const AdminModule = React.lazy(() => import("@/modules/admin"));
export const UserModule = React.lazy(() => import("@/modules/user"));
