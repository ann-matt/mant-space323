import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");
type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalCard({ children, onClose }: Props) {
  if (!modalRoot) return null;

  return createPortal(
    <div
      style={{
        border: "1px solid black",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "15px",
        overflowY: "scroll",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "gray",
        }}
      >
        X
      </button>
      {children}
    </div>,
    modalRoot
  );
}
