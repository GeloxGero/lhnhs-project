import { useEffect } from "react";

interface Props {
  arCode: number;
}

export const ARCodeModal = ({ arCode }: Props) => {
  return (
    <dialog id="ar_code_modal" className="modal --color-neutral-content">
      <div className="modal-box --color-neutral">
        <div className="badge badge-accent">{arCode}</div>
        <h3 className="--color-primary text-lg font-bold">Hello!</h3>
        <p className="--color-error py-4">
          Press ESC key or click the button below to close
        </p>
      </div>
    </dialog>
  );
};
