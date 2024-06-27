import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

interface SliderProps {
  values: number[];
  setValues: React.Dispatch<React.SetStateAction<number[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  step: number;
}

export const Slider: React.FC<SliderProps> = ({
  values,
  setValues,
  currentIndex,
  setCurrentIndex,
  step,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '' }}>
      <Range
        step={step}
        values={values}
        onChange={(newValues) => {
          setValues(newValues);
          const newIndex = Math.round(newValues[0] / step);
          setCurrentIndex(newIndex);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              borderRadius: '4px',
              background: getTrackBackground({
                values,
                // colors: ['#ccc', '#548BF4', '#ccc'],
                colors: ['#548BF4', '#ccc', '#ccc'],
                min: 0,
                max: 100,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '24px',
              width: '24px',
              borderRadius: '50%',

              backgroundColor: 'white',
              boxShadow: '0px 2px 6px #AAA',
            }}
          />
        )}
      />
      {/* <div style={{ marginTop: '20px' }}>Current Index: {currentIndex}</div> */}
    </div>
  );
};

// const Rangeslider: React.FC = () => {
//   const [values, setValues] = useState([0]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const step = 1;

//   // ;

//   return (
//     <div>
//       <Slider
//         values={values}
//         setValues={setValues}
//         currentIndex={currentIndex}
//         setCurrentIndex={setCurrentIndex}
//         step={step}
//       />
//     </div>
//   );
// };

// export default Slider;
