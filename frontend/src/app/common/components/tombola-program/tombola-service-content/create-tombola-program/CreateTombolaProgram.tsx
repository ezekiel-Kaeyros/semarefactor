'use client';
import React, { useEffect, useState } from 'react';
import InputField from '../../../../ui/forms/text-field/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import blueChevronItemIcon from '../../../../../../../public/tombola/blueChevronItem.png';
import Image from 'next/image';
import AnimateClick from '../../../../ui/animate-click/AnimateClick';
import { useDropzone } from 'react-dropzone';
import selectImageIcon from '../../../../../../../public/tombola/selectImage.png';
import addProductBMIcon from '../../../../../../../public/tombola/addProductBM.png';
import { Button } from '@/app/common/ui/button/Button';
import PreviewProdctTombola from '../previous-product-tombola/PreviewProductTombola';

type CreateTombolaType = {
  productName: string;
  description: string;
  imgProduct?: any;
};
type ItemObject = {
  name: string;
  des: string;
  Img: any;
  id: number;
};

const CreateTombolaProgram = () => {
  const [imgPreview, setImgPreview] = useState('');
  const [imgEditing, setImgEditing] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
    setValue,
  } = useForm<CreateTombolaType>();
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();
  const [listProduct, setListProduct] = useState<ItemObject[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditId] = useState<number>();
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const files = acceptedFiles.map((file: any, index: any) => {
  //   // FileTypes
  //   // ;
  //   // return (
  //   //   <li key={file?.path}>
  //   //     {file?.path} - {file.size} bytes
  //   //   </li>
  //   // )
  //   const reader = new FileReader();
  //   reader.onload = function (e: any) {
  //     setImages((prevState: any): any => [
  //       ...prevState,
  //       { id: index, src: e?.target?.result },
  //     ]);
  //   };
  //   reader.readAsDataURL(file);
  //   return file;
  // });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setImgPreview(URL.createObjectURL(acceptedFiles[0]));
      // // ;
    }
  }, [acceptedFiles]);

  const onSubmit: SubmitHandler<CreateTombolaType> = async (data) => {
    // // ;
    let dummyTable: ItemObject[] = listProduct;
    const dataItemToSave = {
      name: data.productName,
      des: data.description,
      Img: acceptedFiles && acceptedFiles.length > 0 ? acceptedFiles[0] : '',
      id: listProduct.length + 1,
    };
    dummyTable.push(dataItemToSave);
    setListProduct(dummyTable);
    reset();
    setImgPreview('');
    setImgEditing('');
  };

  const editItem = (id: number) => {
    const specificItem = listProduct.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    specificItem && setValue('productName', specificItem.name);
    specificItem && setValue('description', specificItem.des);
    specificItem && setImgPreview(URL.createObjectURL(specificItem.Img));
  };

  return (
    <div className="grid grid-cols-2 mt-10 gap-5">
      <form
        className="flex flex-col gap-5 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-[2rem] font-bold">Tombola Program</div>
        <div className="flex flex-col items-center">
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-row gap-5 items-center">
              <div className="flex flex-row items-center gap-2 cursor-pointer">
                <div className="flex justify-center items-center px-[.5rem] py-[.5rem] h-[30px] w-[30px] bg-customerMessageBg rounded-full">
                  1
                </div>
                <span>Add Products</span>
              </div>
              <div>
                <Image
                  src={blueChevronItemIcon}
                  alt="blueChevronItemIcon"
                  width={10}
                  height={10}
                />
              </div>
              <div className="flex flex-row items-center gap-2 cursor-not-allowed">
                <div className="flex opacity-50 justify-center items-center px-[.5rem] py-[.5rem] h-[30px] w-[30px] bg-customerMessageBg rounded-full">
                  2
                </div>
                <span className="opacity-50">Generate Qr Code</span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center gap-4">
                <InputField
                  name="productName"
                  title="Product Name"
                  register={register('productName', {
                    required: true,
                    minLength: 3,
                  })}
                  placeholder="Product Name"
                  style="rounded-lg px-12 pr-16 py-4 dark:bg-botMessageBg2"
                  labelTextStyle="font-bold"
                  classes={'w-[50%] rounded-lg'}
                />

                <InputField
                  name="description"
                  title="Description"
                  register={register('description', { minLength: 10 })}
                  placeholder="Description"
                  style="rounded-lg px-12 pr-16 py-4 dark:bg-botMessageBg2"
                  labelTextStyle="font-bold"
                  classes={'w-[50%] rounded-lg'}
                />
              </div>
              <AnimateClick>
                <section
                  style={
                    {
                      // borderImage: "linear-gradient(to right, transparent 5%, black 5%) 1"
                    }
                  }
                  className="border-customerMessageBg flex justify-center py-8 border-[2px] border-dashed w-[100%] rounded-lg overflow-hidden cursor-pointer"
                >
                  <div
                    {...getRootProps({
                      className:
                        'dropzone flex flex-row items-center gap-[.5rem] py-[.5rem] px-[.5rem]',
                    })}
                  >
                    <input {...getInputProps()} />
                    <Image
                      src={selectImageIcon}
                      width={30}
                      alt="selectImageIcon"
                    />
                    <p className="text-[1.5rem]">Select Image</p>
                  </div>
                </section>
              </AnimateClick>
              {imgPreview && imgPreview.length > 0 && (
                <div className="w-full h-24">
                  <Image
                    src={imgPreview}
                    width={30}
                    height={30}
                    alt="photographIcon"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex flex-row gap-4">
                <Button
                  variant={!isValid ? 'disabled' : 'addProdVariant'}
                  disabled={!isValid ? true : false}
                  leftIcon={addProductBMIcon}
                  iconSize={30}
                  type="submit"
                >
                  Add Product
                </Button>
                <Button
                  variant={listProduct.length < 1 ? 'disabled' : 'mainColor'}
                  disabled={listProduct.length < 1 ? true : false}
                  iconSize={30}
                  onClick={() => {
                    // ;
                  }}
                >
                  Proceede
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div>
        <PreviewProdctTombola items={listProduct} editCurentItem={editItem} />
      </div>
    </div>
  );
};

export default CreateTombolaProgram;
