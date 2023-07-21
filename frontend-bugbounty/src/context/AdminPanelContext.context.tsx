"use client";
import React, { createContext, useState } from 'react';
import { User } from '@/shared/types';

type AdminPanelContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const defaultValue: AdminPanelContextType = {
  user: null,
  setUser: () => {},
};

export const AdminPanelContext = createContext<AdminPanelContextType>(defaultValue);

// Componente de proveedor de contexto
const AdminPanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AdminPanelContext.Provider value={{ user, setUser }}>
      {children}
    </AdminPanelContext.Provider>
  );
};

export default AdminPanelProvider;
