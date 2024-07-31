import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Circle from "./Circle";

const StepIndicator: React.FC = () => {
  const [key, setKey] = useState<boolean>(true);
  const path = window.location.pathname;

  useEffect(() => {
    path === "/searchCaptions" ? setKey(false) : setKey(true);
  }, [path]);

  return (
    <div className="flex items-center">
      <Link to={"/"} onClick={() => setKey(true)}>
        <Circle
          stepnumber={1}
          outerCircle={
            key
              ? "w-20 h-20 border-2 border-green-500 rounded-full flex items-center justify-center"
              : "w-20 h-20 border-2 border-green-200 rounded-full flex items-center justify-center"
          }
          innerCircle={
            key
              ? "w-16 h-16 text-2xl bg-green-500 text-white rounded-full flex items-center justify-center"
              : "w-16 h-16 text-2xl bg-gray-200 text-gray-500 rounded-full flex items-center justify-center"
          }
          stepText={key ? "ml-5 text-lg" : "ml-5 text-lg text-gray-500"}
        />
      </Link>
      {/* Line */}
      <div className="text-green-300 mx-2 mb-6">- - - - - - - - - - - - -</div>
      <Link to={"/searchCaptions"} onClick={() => setKey(false)}>
        <Circle
          stepnumber={2}
          outerCircle={
            !key
              ? "w-20 h-20 border-2 border-green-500 rounded-full flex items-center justify-center"
              : "w-20 h-20 border-2 border-green-200 rounded-full flex items-center justify-center"
          }
          innerCircle={
            !key
              ? "w-16 h-16 text-2xl bg-green-500 text-white rounded-full flex items-center justify-center"
              : "w-16 h-16 text-2xl bg-gray-200 text-gray-500 rounded-full flex items-center justify-center"
          }
          stepText={!key ? "ml-5 text-lg" : "ml-5 text-lg text-gray-500"}
        />
      </Link>
    </div>
  );
};

export default StepIndicator;
