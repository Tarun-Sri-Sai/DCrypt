const Input = ({ id, label, ...inputProps }) => {
  return (
    <div className="flex flex-col">
      <input
        className="py-0.75 sm:py-1 md:py-1.25 lg:py-1.5 px-1.5 sm:px-2 md:px-2.5 lg:px-3 border-2 border-gray-400 focus:border-blue-600 focus:outline-none text-3xs sm:text-2xs md:text-xs lg:text-sm xl:text-base"
        id={id}
        placeholder={label}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
