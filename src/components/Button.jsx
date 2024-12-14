const Button = ({ children, action = "primary", ...buttonProps }) => {
  const buttonPalettes = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    alternate:
      "border border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600",
    cancel: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      className={`py-0.75 sm:py-1 md:py-1.25 lg:py-1.5 px-2 sm:px-2.5 md:px-3 lg:px-3.5 text-3xs sm:text-2xs md:text-xs lg:text-sm xl:text-base rounded-[1.125rem] hover:drop-shadow-2xl ${buttonPalettes[action]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
