import { getCloudinaryImage } from "../../lib/helpers";
import { AdvancedImage } from "@cloudinary/react";
import { UploadImage } from "../DevUploadForm";
import { type ExpenseItem } from "../../lib/types";

const NoImage = () => {
  return (
    <div
      className="bg-base-200/60 border-base-content/10 relative mx-5 mt-5 overflow-hidden rounded-xl border"
      style={{ minHeight: "280px" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="bg-base-content/5 border-base-content/10 flex h-16 w-16 items-center justify-center rounded-2xl border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-base-content/20 h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>

        <div className="text-center">
          <p className="text-base-content/30 text-xs font-medium">
            No image uploaded yet
          </p>
          <p className="text-base-content/20 mt-0.5 text-[10px]">
            Image will appear here once attached
          </p>
          <UploadImage />
        </div>
      </div>
    </div>
  );
};

type ImageViewerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item: ExpenseItem | null;
};

export const ImageViewerModal = ({
  isOpen,
  onClose,
  item,
}: ImageViewerModalProps) => {
  if (!isOpen) return null;

  const cloudinaryImage = getCloudinaryImage({ publicId: "whale" });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 mx-4 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-base-300 border-base-content/10 overflow-hidden rounded-2xl border shadow-2xl">
          {/* Header */}
          <div className="border-base-content/10 flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary h-4 w-1.5 rounded-full" />
              <div>
                <p className="text-base-content text-sm font-semibold">
                  Receipt / Attachment
                </p>
                {item?.description && (
                  <p className="text-base-content/40 mt-0.5 max-w-[260px] truncate text-xs">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-base-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Image area */}
          <div className="bg-base-200/60 border-base-content/10 relative mx-5 mt-5 flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl border">
            {cloudinaryImage ? (
              <AdvancedImage
                cldImg={cloudinaryImage}
                className="max-h-[280px] w-auto object-contain"
              />
            ) : (
              <NoImage />
            )}
          </div>
          <NoImage />
          {/* Meta row */}
          <div className="flex items-center gap-4 px-5 py-3">
            <span className="text-base-content/30 font-mono text-[10px]">
              No file
            </span>
            <div className="ml-auto">
              <span className="badge badge-warning badge-outline badge-sm text-[10px] font-semibold tracking-wide">
                UNVERIFIED
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 px-5 pb-5">
            <button
              onClick={onClose}
              className="btn btn-sm btn-ghost text-base-content/50 flex-1"
            >
              Close
            </button>
            <button className="btn btn-sm btn-success flex-1 gap-1.5 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
