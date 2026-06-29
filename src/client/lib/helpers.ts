import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

// * --------------------- API CALLS --------------------- * //
export const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  window.location.href = "/auth/login";
};

// * ----------------------- FUNCTION CALLS --------------------- * //

export const onClickShowModal =
  (modalId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  };

export const getDialogElement = (modalId: string): HTMLDialogElement => {
  return document.getElementById(modalId) as HTMLDialogElement;
};

export const getCloudinaryImage = ({ publicId }: { publicId: string }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dlzobzben",
    },
  });

  const myImage = cld.image(publicId);
  myImage.resize(fill().width(250).height(250));

  return myImage;
};
