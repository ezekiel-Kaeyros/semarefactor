import img1 from '../../../../../../public/images/Primary-btn.svg'
import img2 from '../../../../../../public/images/Primary-btn (1).svg'
import img3 from '../../../../../../public/images/Primary-btn (2).svg';
import ItemsStep from './items-step/ItemStep';
const array = [
  {
    img: img1,
    text: 'You will recieve a verification code to authenticate your number on our platform',
  },
  {
    img: img2,
    text: 'The phone number fo your business must be a valid phone number which meets the Whatsapp Business platform criteria',
  },
  {
    img: img3,
    text: 'You need a phone number that has not been associated to another Business Service provider',
  },
];

const FirstStep = () => {
    return (
      <div>
        <h1 className="text-xl font-semibold">
          You must have a valid and a dedicated phone number to use Whatsapp
          business API
        </h1>

        <div className="my-5">
          {array.map((item, index) => (
            <ItemsStep key={index} img={item.img} text={item.text} />
          ))}
        </div>
      </div>
    );
 }
export default FirstStep