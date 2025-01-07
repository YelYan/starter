import React, { useRef } from "react";
import { Input } from "@/components/ui/input";

const Imageuploader = ({
  imageFile,
  setImageFile,
}: {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
}) => {
  //use useref cuz do not want to rerender the component
  const inputref = useRef<HTMLInputElement>(null);

  function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target?.files?.[0];
    if (files) setImageFile(files);
  }
  return (
    <div>
      <Input
        id="image-upload"
        className="hidden cursor-pointer"
        type="file"
        ref={inputref}
        onChange={handleImgUpload}
      />
      {!imageFile ? "upload" : imageFile.name}
    </div>
  );
};

export default Imageuploader;
