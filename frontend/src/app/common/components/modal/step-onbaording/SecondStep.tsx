// import img1 from '../../../../../../public/images/Primary-btn (3)';
import img1 from '../../../../../../public/images/Primary-btn (3).svg';
import img2 from '../../../../../../public/images/Primary-btn (4).svg';
import img3 from '../../../../../../public/images/Primary-btn (5).svg';
import ItemsStep from './items-step/ItemStep';
const array = [
  {
    img: img1,
    text: 'To authenticate your business account, open this link      on a seperate tab. ',
  },
  {
    img: img2,
    text: 'You must now generate a code in your authentification app and enter it in the "Enter code" field.',
  },
  {
    img: img3,
    text: 'Once you confirm, you can close the tab.',
  },
];

const SecondStep = () => {
  return (
    <div>
      <h1 className='text-xl font-semibold'>
        You must have a personal Facebook account ( Linked to your business
        email )
      </h1>

      <p className="text-sm mt-5 mb-8">
        If you have a Facebook business account created and logged in on the
        system, then you must authenticate it before you start the onboarding
        process by clicking Login with Facebook
      </p>

      <div className="my-5">
        {array.map((item, index) => (
          <ItemsStep key={index} img={item.img} text={item.text} />
        ))}
      </div>
    </div>
  );
};
export default SecondStep;
