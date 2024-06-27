import { useReactToPrint } from 'react-to-print';

const usePdf = (reference:any) => {
  const imprimer = useReactToPrint({
    content: () => reference.current,
    documentTitle: 'teste-page',
    // onAfterPrint: ()=> alert('imprimer')
  });

  return imprimer;
};
export default usePdf;
