const Button = ({ children, ...buttonProps }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white py-0.75 sm:py-1 md:py-1.25 lg:py-1.5 px-2 sm:px-2.5 md:px-3 lg:px-3.5 text-2xs sm:text-xs md:text-sm lg:text-base rounded`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
