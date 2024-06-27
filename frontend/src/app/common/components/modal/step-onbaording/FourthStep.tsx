'use client';
import Image from 'next/image';
import img2 from '../../../../../../public/images/Frame 10574.svg';
import img3 from '../../../../../../public/icons/arrow-right (1).svg';
import axios from 'axios';
import {
  getEmailCookies,
  getUserCookies,
  removeUserCookies,
} from '@/cookies/cookies';
import { Button } from '@nextui-org/react';
// import { registered } from '@/utils/onboardingClient';
import { useState } from 'react';
import { registered } from '@/utils/onboardingClient';
import { AuthService, CredetialChatBotType } from '@/services';
import toast from 'react-hot-toast';
const FourthStep: React.FC<{
  load?: boolean;
  error: number;
  name?: any;
  waba_id?: any;
  numberId: any;
  number?: any;
}> = ({ load, error, name, waba_id, numberId, number }) => {
  const [loading, setLoading] = useState(false);
  /**
   * Function to save a credential on chat bot
   *
   * @param data
   */
  async function registerCrtlChat(data: CredetialChatBotType) {
    try {
      const response = await new AuthService().registerCredentialChatBot(data);
      if (response.status !== 201) {
        toast.error(response.response?.data);
      } else {
        toast.success(
          'Credential of chat bot has been perfectly registered  !!'
        );
      }
    } catch {
      toast.error('An error in the chatbot credential registration process !!');
    }
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-center">
        <Image src={img2} alt="" />
      </div>

      <p className="font-bold text-xl mt-10 mb-5">
        You can now use your Whatsapp Business Account with Sema
      </p>

      <p className="text-sm">
        You can send a bulk message to upto 100 customers today ! To increase
        the sending limit you will need to increase your phone number quality
        rating
      </p>

      <div className="flex items-center justify-center mt-14">
        <Button
          disabled={load || loading || error > 0 ? true : false}
          onClick={async () => {
            setLoading(true);
            const response = await registered({
              company_nane: name,
              app_id: '2448667798617426',
              waba_id: waba_id,
              phone_number_id: numberId,
              phone_number: number,
              verify_token: 'francenelle',
              token:
                'EAAizDOZAPPVIBO4gI0oBhSRcxsegaJNHwAij2SJ1vJ8Ai3W3qijw6MoY4YZCLafsrPMZCrO14IVFZCNNZBe9YXHOrBopmGYojBdzcjM96v0pZByDV5k3mMMKcNwpVaga169GV8D70e90u9frQ499t7WPRPUkpMZAitJPBOnFc26PZCJvOzLXjcPHuZCIafh4Y',
            });
            // ;
            registerCrtlChat({
              company: name,
              phone_number_id: numberId,
              verify_token: name,
              email: getEmailCookies().email,
              token:
                'EAAizDOZAPPVIBO4gI0oBhSRcxsegaJNHwAij2SJ1vJ8Ai3W3qijw6MoY4YZCLafsrPMZCrO14IVFZCNNZBe9YXHOrBopmGYojBdzcjM96v0pZByDV5k3mMMKcNwpVaga169GV8D70e90u9frQ499t7WPRPUkpMZAitJPBOnFc26PZCJvOzLXjcPHuZCIafh4Y',
            });
            setLoading(false);
            if (response == 200) {
              window.location.href = 'dashboard/bulk-messages';
            }
          }}
          className={`flex justify-center items-center rounded-3xl text-white bg-[#2196F3] text-lg px-5 py-2  ${load || error > 0 || loading ? 'opacity-40' : 'opacity-100 gap-5'}`}
        >
          <span>{load || loading ? 'loading.....' : 'Go to Login'}</span>
          {!load && <Image src={img3} alt="" />}
        </Button>
      </div>
    </div>
  );
};

export default FourthStep;
