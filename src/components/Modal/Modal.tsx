import { useEffect } from "react";
import styled from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyboardClick = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyboardClick);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyboardClick);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styled.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={styled.modal}>
        <button
          className={styled.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
