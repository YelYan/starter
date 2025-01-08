import React, { useRef, useEffect } from "react";
import { CloudUpload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import axios from "axios";
import { API_URL } from "@/config/api";
import { Skeleton } from "@/components/ui/skeleton";

type ImageuploaderT = {
  imageFile: File | null;
  imageLoading?: boolean;
  uploadedImgRes?: { url: string; message: string };
  setImageFile: (file: File | null) => void;
  setImageLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setuploadedImgRes?: React.Dispatch<
    React.SetStateAction<{ url: string; message: string }>
  >;
};

const Imageuploader = ({
  imageFile,
  setImageFile,
  setImageLoading,
  imageLoading,
  setuploadedImgRes,
  uploadedImgRes,
}: ImageuploaderT) => {
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

  // Upload image to Supabase when imageFile changes
  useEffect(() => {
    const uploadImagetoSupabase = async (file: File) => {
      setImageLoading?.(true); // Set loading state
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${API_URL}/products/upload-image`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response?.data?.success) {
          setuploadedImgRes?.({
            url: response.data.url,
            message: response.data.message,
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setImageLoading?.(false); // Reset loading state
      }
    };

    if (imageFile) {
      uploadImagetoSupabase(imageFile); // Trigger upload when imageFile changes
    }
  }, [imageFile, setImageLoading, setuploadedImgRes]);

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

      {imageLoading && (
        <div className="text-center">
          <Skeleton className="h-32 bg-gray-100" />
        </div>
      )}

      {!imageFile && (
        <Label
          htmlFor="image-upload"
          className="border-2 border-dashed border-gray-300 flex flex-col justify-center gap-2 items-center h-40 min-h-40 max-h-40 px-4 rounded-md w-full h cursor-pointer"
        >
          <CloudUpload />
          <p className="text-center">Drag & drop or click to upload image</p>
        </Label>
      )}

      {imageFile && !imageLoading && uploadedImgRes?.url && (
        <div className=" flex flex-col gap-2">
          <img src={uploadedImgRes?.url} alt="proudct image" />

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

/**
 * use FormData cux we are sending image file not a text or json data
 * Files are sent as multipart/form-data they are binary data
 * Formdata is a built in js class that allows you to handle binary data
 *
 *  */

/**
 * multipart/form-data encoding type is required for file uploads because it splits the data into multiple parts, each with its own headers and content.
 * This is different from application/json or application/x-www-form-urlencoded, which are used for plain text or key-value pairs.
 */
