import React, { useRef } from "react";
import { CloudUpload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

const Imageuploader = ({
  imageFile,
  setImageFile,
  setImageLoading,
  imageLoading,
}: {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  setImageLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  imageLoading?: boolean;
}) => {
  //use useref cuz do not want to rerender the component
  const inputref = useRef<HTMLInputElement>(null);

  function handleImgChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      const files = e.target?.files?.[0];
      if (files) setImageFile(files);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setImageFile(droppedFile);
  }

  function handleImgRemove() {
    setImageFile(null);
    if (inputref.current) {
      inputref.current.value = "";
    }
  }
  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      <Input
        accept="image/*"
        id="image-upload"
        className="hidden cursor-pointer"
        type="file"
        ref={inputref}
        onChange={handleImgChange}
      />
      {!imageFile ? (
        <Label
          htmlFor="image-upload"
          className="border-2 border-dashed border-gray-300 flex flex-col justify-center gap-2 items-center h-40 min-h-40 max-h-40 px-4 rounded-md w-full h cursor-pointer"
        >
          <CloudUpload />
          <p className="text-center">Drag & drop or click to upload image</p>
        </Label>
      ) : (
        // <img src={imageFile} alt="" />
        <div className=" flex flex-col gap-2">
          {imageFile.name}
          <Button
            className="ml-auto"
            size={"sm"}
            variant={"outline"}
            onClick={handleImgRemove}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Imageuploader;
