"use client"
import HeureComponent from "./heure/Heure";
import Prestation from "./prestations/Prestation";
import Professionnel from "./professionnel/Pofessionnel";

const Content: React.FC<{
  step: number;
  getPrestation: any;
  valueCheck: { name: string; duration: string; price: string; type: string }[];
  getCurrentDate:any
}> = (props) => {
  return (
    <div className="w-full">
      {props.step == 1 && (
        <Prestation
          getPrestation={props.getPrestation}
          value={props.valueCheck}
        />
      )}
      {/* {props.step == 2 && <Professionnel />} */}
      {props.step == 2 && (
        <HeureComponent getCurrentDtae={props.getCurrentDate} />
      )}
    </div>
  );
};
export default Content;
