import React, { createContext, useState, useContext, useCallback } from "react";
import Dialog from "src/Components/Dialog";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: "",
    showCloseIcon: true,
    content: null,
    actions: null,
    titleProps: {},
    actionProps: {},
    dialogProps: {},
  });

  const openDialog = useCallback((props) => {
    setDialogState({
      isOpen: true,
      title: props?.title || "",
      content: props?.content || "",
      actions: props?.actions || "",
      showCloseIcon: props?.showCloseIcon,
      titleProps: props?.titleProps || {},
      actionProps: props?.actionProps || {},
      dialogProps: props?.dialogProps || {},
    });
  }, []);

  const closeDialog = useCallback((event, reason) => {
    if (reason && reason === "backdropClick") return;

    setDialogState({
      isOpen: false,
      title: "",
      content: null,
      actions: null,
      titleProps: {},
      actionProps: {},
      dialogProps: {},
      showCloseIcon: true,
    });
  }, []);

  return (
    <DialogContext.Provider value={{ dialogState, openDialog, closeDialog }}>
      {children}
      <Dialog />
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
