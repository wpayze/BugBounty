"use client";
import authService from "@/services/authService";
import { VerifyTokenResponse } from "@/shared/responseTypes";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardProtection: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token: string | null = localStorage.getItem("token");
        await authService.verifyToken(token);
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
