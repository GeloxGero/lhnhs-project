import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

//cloudName seperates cloudinary storage from one another
const cloudName = "dvrzm0apz";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dvrzm0apz",
  },
});

export const CommonCloudinaryImage = () => {
  const image = cld.image("samples/logo");

  return (
    <div>
      <AdvancedImage cldImg={image} />
    </div>
  );
};

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "expense_items");
  formData.append("upload_preset", "unsigned_expense_item");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  );

  const data = await res.json();
  console.log(data);

  return "";
};
