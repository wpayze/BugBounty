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
        const result: VerifyTokenResponse = await authService.verifyToken();
        if (!result.isValid) router.push("/login");
      } catch (error) {
        router.push("/login");
      }
    };

    validateToken();
  }, []);

  return <></>;
};

export default DashboardProtection;
