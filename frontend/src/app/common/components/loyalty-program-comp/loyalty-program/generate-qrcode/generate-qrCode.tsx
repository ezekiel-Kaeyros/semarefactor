import React from 'react';
// import InputField from '../../../forms/text-field/InputField';
// import InputField from '@/app/common/ui/forms/text-field/InputField';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { Button } from '../../../button/Button';
import { Button } from '@/app/common/ui/button/Button';
import BarcodeImage from './Icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Image } from 'antd';

function GenerateQrCode() {
  const object = useSelector((state: RootState) => state.setObject);
  let QrCodeImage = object.object?.qrcode?.qr_image_url;

  return (
    <div>
      <div>
        <div className="w-[70%] flex flex-col gap-y-10">
          <div>
            <h1 className="font-extrabold text-2xl">Almost There</h1>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="w-[30%] m-auto">
              <Image src={QrCodeImage} alt="Qr code" />
            </div>
            <div className="w-[40%] text-center m-auto text-xl">
              <p>YOur Qr-code</p>
              <p>
                Get Started by selecting price to remunerate your loyal
                customers
              </p>
            </div>
            <div className="w-[60%] m-auto">
              <Button className="p-4">Launch</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateQrCode;
