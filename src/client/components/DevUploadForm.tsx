import { uploadImageToCloudinary } from "@/services/cloudinary";

export const DevUploadForm = () => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await uploadImageToCloudinary(file);

    console.log("Uploaded file!");
  };

  return (
    <form method="post" encType="multipart/form-data">
      <input
        type="file"
        className="file-input file-input-ghost"
        accept=".jpg, .jpeg, .png"
        onChange={handleUpload}
      />
    </form>
  );
};
