"use client";
import authService from "@/services/authService";
import { VerifyTokenResponse } from "@/shared/responseTypes";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";

const DashboardProtection: React.FC = () => {
  const router = useRouter();
  const { setUser } = useContext(AdminPanelContext);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token: string | null = localStorage.getItem("token");
        const data: VerifyTokenResponse = await authService.verifyToken(token);
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    validateToken();
  }, []);

  return <></>;
};

export default DashboardProtection;
