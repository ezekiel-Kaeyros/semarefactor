import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@/app/common/ui/forms/text-field/InputField';
// import { LoyaltyFileUpload } from './loyalty-file-upload';
import ImageUpload from './loyaty-fileupload2';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import LoyaltyCarousel from './loyalty-carousel';
import { Button } from '@/app/common/ui/button/Button';
import AddCircle from './icons';
import { Slider } from './range-slider/range';
import PreviousProdct from './previous-product/previous-products';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep } from '@/redux/features/loyaltyProgram';
import { RootState } from '@/redux/store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoyaltyProgramService } from '@/services';
import axios from 'axios';
import { postData } from './actions';
import { useFormState } from 'react-dom';
import { setObject } from '@/redux/features/qrCodeSlice';
import { useDropzone } from 'react-dropzone';

interface IFormInput {
  name: string;
  description: string;
  program: string;
  currentIndex: number;
}

type ItemsProps = {
  name: string;
  products: Array<{
    name: string;
    points: number;
    description: string;
    image_url?: any;
    id?: string;
  }>;
};

const AddProducts = () => {
  const {
    register,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm<IFormInput>({ mode: 'onChange' || 'onBlur' || 'onSubmit' });
  const queryClient = useQueryClient();

  // redux actions to get current step
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state: RootState) => state.stepReducer);
  const object = useSelector((state: RootState) => state.setObject);

  const [items, setItems] = useState<ItemsProps>({ name: '', products: [] });
  const [parentImagePreview, setParentImagePreview] = useState<
    string | null | any
  >(null);

  // slider values
  const [values, setValues] = useState([0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const step = 1;
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditId] = useState<number>();

  let name: string = watch('name');
  let description: string = watch('description');
  let program: string = watch('program');
  // setShowImage(false);

  const handleImagePreviewChange = (preview: string | null) => {
    // Update the parent component's state with the imagePreview value
    setParentImagePreview(preview);
  };

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    // Create a new object with the properties you need
    let productId = 0;
    let newItem: ItemsProps = {
      name: program,
      products: [
        {
          name: name,
          points: currentIndex,
          description: description,
          image_url: parentImagePreview,
          id: `${productId++}`,
        },
      ],
    };

    setShowImage(true);
    const allItems = [...items?.products, ...newItem.products];
    setItems({ name: newItem.name, products: allItems });
    setCurrentIndex(0);
    reset();

    const response = await postData(items);
    response && dispatch(setObject(response));
    setLoading(false);
  };

  const handleNextStep = async () => {
    // Logic to determine the next step
    const nextStep = currentStep + 1;
    setShowImage(true);
    setLoading(true);
    const response = await postData(items);
    return (
      dispatch(setCurrentStep(nextStep)),
      response && dispatch(setObject(response)),
      setLoading(false)
    );
  };

  const editItem = (id: number) => {
    const specificItem = items.products.find((item) => item.id === `${id}`);
    setIsEditing(true);
    setEditId(id);
    specificItem && setValue('description', specificItem.description);
    specificItem && setValue('name', specificItem.name);
    specificItem && setValue('program', items.name);
    specificItem &&
      setParentImagePreview(URL.createObjectURL(specificItem.image_url));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loading ? (
          <div className="">
            <div className="flex flex-col justify-center items-center h-[400px] gap-y-10">
              <div>
                <h1 className="text-3xl text-[gray]">Loaing QrCode...</h1>
              </div>
              <div className="animate-spin rounded-full border-t-4 border-blue-700 h-16 w-16"></div>
            </div>
          </div>
        ) : (
          <div className="flex gap-x-16">
            <div className=" w-[75%]">
              <div>
                <div>
                  <div className="mb-10 w-[50%]">
                    <h1 className="mb-4">Add a Program</h1>
                    <div>
                      <InputField
                        name="name"
                        type="text"
                        placeholder="program name"
                        register={register('program', {
                          required: true,
                        })}
                        style="rounded-xl p-4 rounded-xl border-none outline-none focus:bg-cardDark"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-8">
                  <div className="w-full">
                    <h1 className="mb-4">Product Name</h1>
                    <div>
                      <InputField
                        name="name"
                        type="text"
                        placeholder="product name"
                        register={register('name', {
                          required: true,
                        })}
                        style="rounded-xl p-4 rounded-xl border-none outline-none focus:bg-cardDark"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <h1 className="mb-4">Description Name</h1>
                    <div>
                      <InputField
                        name="description"
                        type="text"
                        placeholder="description name"
                        register={register('description')}
                        style="rounded-xl p-4 rounded-xl border-none outline-none focus:bg-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div className="flex flex-col w-full gap-y-4">
                  <ImageUpload
                    onImagePreviewChange={handleImagePreviewChange}
                    viewImage={showImage}
                  />
                  <h1 className="font-bold text-xl">Select Point</h1>
                </div>
              </div>
              <div>
                <div className="text-center text-xl">
                  <h1>{currentIndex} pt</h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1>0 pt</h1>
                  <div className="w-[80%]">
                    <Slider
                      values={values}
                      setValues={setValues}
                      currentIndex={currentIndex}
                      setCurrentIndex={setCurrentIndex}
                      step={step}
                    />
                  </div>
                  <h1>100 pt</h1>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex flex-col w-full gap-y-4">
                  {/* <LoyaltyFileUpload /> */}
                  <div className="flex mt-5 gap-x-5">
                    <Button
                      className="p-4 bg-[#182881]"
                      // disabled={true}
                      variant={currentIndex === 0 ? 'disabled' : null}
                      disabled={currentIndex === 0 ? true : false}
                    >
                      <div className="flex gap-x-2">
                        <AddCircle />
                        <h1>Add Product</h1>
                      </div>
                    </Button>
                    <Button
                      className="p-4"
                      onClick={handleNextStep}
                      type="submit"
                      variant={
                        items.products.length === 0 ? 'disabled' : 'mainColor'
                      }
                      disabled={items.products.length === 0 ? true : false}
                    >
                      Proceed
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[65%]">
              <PreviousProdct
                itemTranslation={items}
                editCurentItem={editItem}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProducts;
