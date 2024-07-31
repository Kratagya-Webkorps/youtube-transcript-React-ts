import React from 'react';

interface CircleProps {
  outerCircle: string;
  innerCircle: string;
  stepText: string;
  stepnumber:number;
}

const Circle: React.FC<CircleProps> = ({ outerCircle, innerCircle, stepnumber, stepText }) => {

  return (
    <div
      className="flex-col items-center cursor-pointer"
    >
      <div className={outerCircle}>
        <div className={innerCircle}>
          {stepnumber}
        </div>
      </div>
      <span className={stepText}>Step</span>
    </div>
  );
};

export default Circle;
