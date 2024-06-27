// components/ImageUpload.tsx
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import edit from '../../../../../../../public/icons/edit.svg';
import trash from '../../../../../../../public/icons/trush-square.svg';
import Image from 'next/image';

interface ImageUploadProps {
  onImagePreviewChange: (preview: string | null) => void;
  viewImage: boolean;
  setImagePreview?: (text: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagePreviewChange,
  viewImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Update the state with the selected file
      setSelectedImage(file);

      // Create a FileReader to generate a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        setImagePreview(reader.result as string);
        onImagePreviewChange(preview);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    viewImage === true && setImagePreview(null);
  }, [viewImage, imagePreview]);

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
    }
  };

  const handleEditClick = () => {
    // Handle edit action, e.g., open an edit modal
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteClick = () => {
    // Handle delete action, e.g., confirm deletion
    // ;
    // Optionally, you can reset the image preview and selected image
    setImagePreview(null);
    setSelectedImage(null);
    onImagePreviewChange(null);
  };

  return (
    <div>
      {!imagePreview && (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-40 border-5 border-[#7E8EE7] border-dashed rounded-lg cursor-pointer bg-transparent hover:opacity-[0.6]"
        >
          <div className="flex justify-center items-center gap-x-3">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M22.9103 16.82L19.7803 9.50002C19.2103 8.16002 18.3603 7.40002 17.3903 7.35002C16.4303 7.30002 15.5003 7.97002 14.7903 9.25002L12.8903 12.66C12.4903 13.38 11.9203 13.81 11.3003 13.86C10.6703 13.92 10.0403 13.59 9.53027 12.94L9.31027 12.66C8.60027 11.77 7.72027 11.34 6.82027 11.43C5.92027 11.52 5.15027 12.14 4.64027 13.15L2.91027 16.6C2.29027 17.85 2.35027 19.3 3.08027 20.48C3.81027 21.66 5.08027 22.37 6.47027 22.37H19.2303C20.5703 22.37 21.8203 21.7 22.5603 20.58C23.3203 19.46 23.4403 18.05 22.9103 16.82Z"
                fill="#FAF9F9"
              />
              <path
                d="M7.86029 8.38C9.72701 8.38 11.2403 6.86672 11.2403 5C11.2403 3.13327 9.72701 1.62 7.86029 1.62C5.99356 1.62 4.48029 3.13327 4.48029 5C4.48029 6.86672 5.99356 8.38 7.86029 8.38Z"
                fill="#FAF9F9"
              />
            </svg>
            <h1 className="mt-2">Select Image</h1>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      )}
      <br />
      {imagePreview && (
        <div className="">
          <div className="cursor-pointer relative w-[300px]">
            <img src={imagePreview} alt="Preview" className="w-full" />
            <div className="absolute top-5 right-5 flex space-x-2">
              <span onClick={handleImageUpload} className="cursor-pointer">
                {/* Add your edit icon here, e.g., a pencil icon */}
                <Image src={edit} alt="edit" className="w-10" />
              </span>
              <span onClick={handleDeleteClick} className="cursor-pointer">
                {/* Add your delete icon here, e.g., a trash can icon */}
                <Image src={trash} alt="delete" className="w-10" />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
