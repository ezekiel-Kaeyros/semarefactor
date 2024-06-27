import React, { useRef } from 'react';

const HorizontalList: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);

  const handleSlideLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const handleSlideRight = () => {
    if (listRef.current) {
      //
      listRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="container overflow-hidden">
      <ul className="list flex" ref={listRef}>
        <li className="item">Item 1</li>
        <li className="item">Item 2</li>
        <li className="item">Item 3</li>
        <li className="item">Item 4</li>
        <li className="item">Item 5</li>
        <li className="item">Item 6</li>
        <li className="item">Item 7</li>
        <li className="item">Item 8</li>
        <li className="item">Item 9</li>
      </ul>
      <button className="slide-button left-0" onClick={handleSlideLeft}>
        &lt;
      </button>
      <button className="slide-button right-0" onClick={handleSlideRight}>
        &gt;
      </button>
    </div>
  );
};

export default HorizontalList;
