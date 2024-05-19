import { useStore } from "@/services/zustand/userStore";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { user } = useStore();

  useEffect(() => {
    if (user.uid === "") {
      navigate("/");
    }
  }, [navigate, user]);

  return children;
};
