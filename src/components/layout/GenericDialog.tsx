import { ReactNode, useEffect, useRef } from "react";

interface GenericDialogProps {
  title: string;
  children: ReactNode;
  toggle: boolean;
  confirmCb: () => void;
  cancelCb: () => void;
}

export default function GenericDialog({
  title,
  children,
  toggle,
  confirmCb,
  cancelCb,
}: GenericDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (toggle) {
        ref.current.showModal();
      } else {
        ref.current.close();
      }
    }
  }, [toggle, ref, children]);

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div>{children}</div>
        <div className="modal-action">
          <button className="btn btn-outline" onClick={() => cancelCb()}>
            No
          </button>
          <button className="btn btn-primary" onClick={() => confirmCb()}>
            Si
          </button>
        </div>
      </div>
    </dialog>
  );
}
