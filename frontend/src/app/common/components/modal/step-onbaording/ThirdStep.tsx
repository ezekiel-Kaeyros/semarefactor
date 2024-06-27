// import img1 from '../../../../../../public/images/Primary-btn (3)';
import img1 from '../../../../../../public/images/Primary-btn (6).svg';
import img2 from '../../../../../../public/images/Primary-btn (7).svg';
import img3 from '../../../../../../public/images/Primary-btn (8).svg';
import ItemsStep from './items-step/ItemStep';
const array = [
  {
    img: img1,
    text: "You must have your business details at hand : your company's legal name and address, as well as your business account as you want to display it.",
  },
  {
    img: img2,
    text: 'You must have a valid business      website',
  },
  {
    img: img3,
    text: 'It is required that you verify your account with Meta as soon as possible. A verified business can start to send 1k messages /day. if you do not verify your account, Meta will disable your account',
  },
];

const ThirdStep = () => {
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
};
export default ThirdStep;
