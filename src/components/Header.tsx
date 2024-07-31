import React from "react";

const Header: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <a href="https://www.youtube.com">
          <img
            src="https://t3.ftcdn.net/jpg/03/00/38/90/360_F_300389025_b5hgHpjDprTySl8loTqJRMipySb1rO0I.jpg"
            alt="Logo"
            height={200}
            width={200}
          />
        </a>
        <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl">
          Tool to Search  Captions within Video in 2 simple steps:
        </h1>
      </div>
    </div>
  );
};

export default Header;
