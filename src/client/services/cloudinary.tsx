import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

export const CommonCloudinaryImage = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dvrzm0apz",
    },
  });

  const image = cld.image("main-sample");

  return (
    <div>
      <AdvancedImage cldImg={image} />
    </div>
  );
};
