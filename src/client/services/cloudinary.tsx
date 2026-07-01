import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

//cloudName seperates cloudinary storage from one another
const cloudName = "dlzobzben";

const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
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
  formData.append("upload_preset", "receipts");
  formData.append("folder", "expense_items_receipts");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dlzobzben/image/upload",
    { method: "POST", body: formData },
  );

  const data = await response.json();
  console.log(data);

  return "";
};
