import React from "react";

const InfoText = ({ message }) => {
  return (
    <>
      {message && (
        <div className="text-green-500 text-2xs sm:text-xs md:text-sm lg:text-base text-center">
          {message}
        </div>
      )}
    </>
  );
};

export default InfoText;
