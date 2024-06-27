import React, { useRef, useEffect, useState, useCallback, FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoyaltyCarousel = () => {
  const slider = useRef();
  const [speed, setSpeed] = useState(5000); // setting the default state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);

  // Callback function to update the current slide index
  const afterChangeHandler = (index: number) => {
    setCurrentSlide(index);
  };

  // ;

  const settings = {
    dotsClass: 'custom-dots',
    autoplay: true,
    slidesToShow: 20,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => setCurrentSlide(index),
  };

  const images = [
    { id: 1, label: '1' },
    { id: 2, label: '1' },
    { id: 4, label: '1' },
    { id: 5, label: '1' },
    { id: 6, label: '1' },
    { id: 7, label: '1' },
    { id: 8, label: '1' },
    { id: 9, label: '1' },
    { id: 10, label: '1' },
    { id: 11, label: '1' },
    { id: 12, label: '1' },
    { id: 13, label: '1' },
    { id: 14, label: '1' },
    { id: 15, label: '1' },
    { id: 16, label: '1' },
    { id: 17, label: '1' },
    { id: 18, label: '1' },
    { id: 19, label: '1' },
    { id: 20, label: '1' },
    { id: 21, label: '1' },
    { id: 22, label: '1' },
    { id: 23, label: '1' },
    { id: 24, label: '1' },
    { id: 25, label: '1' },
    { id: 26, label: '1' },
    { id: 27, label: '1' },
  ];
  // // ;

  return (
    <div className="m-auto mt-8 w-[30%]">
      <div className="">
        <div className="text-2xl text-center mb-5">
          <h1>50 pt</h1>
        </div>
        <div className="flex items-center gap-x-4">
          <div>
            <h1>{currentSlide} pt</h1>
          </div>
          <div className="w-full h-4">
            <Slider {...settings}>
              {images?.map(({ id }) => {
                return (
                  <div key={id}>
                    <div className="w-[2px] h-4 bg-[#49525A]"></div>
                    {currentSlide === id && (
                      <div className="w-[8px] h-4 bg-[green]"></div>
                    )}
                  </div>
                );
              })}
            </Slider>
          </div>
          <div>
            <h1>27 pt</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCarousel;
