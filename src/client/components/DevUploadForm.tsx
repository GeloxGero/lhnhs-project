import { uploadImageToCloudinary } from "@/services/cloudinary";
import { useState } from "react";

export const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file) return;

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
  };

  return (
    <div>
      <input
        type="file"
        className="file-input"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleSubmit} className="btn btn-primary">
        Upload
      </button>
    </div>
  );
};
