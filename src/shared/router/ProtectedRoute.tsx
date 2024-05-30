import { useStore } from "@/services/zustand/userStore";
import { useAdminStore } from "@/services/zustand/adminStore";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const userStore = useStore();
  const adminStore = useAdminStore();

  useEffect(() => {
    const user = userStore.user;
    const admin = adminStore.admin;

    if (user === null && admin === null) {
      navigate("/");
    } else if (user && "uid" in user && user.uid === "") {
      navigate("/");
    } else if (admin && admin.uid === "") {
      navigate("/");
    }
  }, [navigate, userStore, adminStore]);

  console.log(adminStore.admin, userStore.user);

  return children;
};
