"use client";
import React, { createContext, useState } from "react";
import { EditFormData, ModalName, User } from "@/shared/types";

type ShowModals = {
  [key in ModalName]: boolean;
};

type AdminPanelContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  showModals: ShowModals;
  setShowModals: React.Dispatch<React.SetStateAction<ShowModals>>;
  editFormData: EditFormData;
  setEditFormData: React.Dispatch<React.SetStateAction<EditFormData>>;
};

const defaultValue: AdminPanelContextType = {
  user: null,
  setUser: () => {},
  showModals: {
    createUserModal: false,
    editUserModal: false,
    createProjectModal: false,
    editProjectModal: false,
  },
  setShowModals: () => {},
  editFormData: {
    user: null,
    project: null,
  },
  setEditFormData: () => {},
};

export const AdminPanelContext =
  createContext<AdminPanelContextType>(defaultValue);

const AdminPanelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [showModals, setShowModals] = useState<ShowModals>(
    defaultValue.showModals
  );
  const [editFormData, setEditFormData] = useState<EditFormData>(
    defaultValue.editFormData
  );

  return (
    <AdminPanelContext.Provider
      value={{
        user,
        setUser,
        showModals,
        setShowModals,
        editFormData,
        setEditFormData,
      }}
    >
      {children}
    </AdminPanelContext.Provider>
  );
};

export default AdminPanelProvider;
