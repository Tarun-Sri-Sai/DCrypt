const Input = ({ id, label, ...inputProps }) => {
  return (
    <div className="flex flex-col">
      <input
        className="py-1 sm:py-1.25 md:py-1.5 lg:py-1.75 pr-1.5 sm:pr-2 md:pr-2.5 lg:pr-3 pl-0 border-b border-gray-400 focus:border-blue-600 focus:outline-none text-2xs sm:text-xs md:text-sm lg:text-base"
        id={id}
        placeholder={label}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
