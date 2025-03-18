import { useState, forwardRef } from "react";

const InlineInput = forwardRef(({ initialText = "", handleSubmit }, ref) => {
  const [labelText, setLabelText] = useState(initialText);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(labelText);
      }}
      className="px-1 md:px-2"
    >
      <input
        ref={ref}
        className="w-full mr-1 border text-2xs sm:text-xs md:text-sm lg:text-base"
        value={labelText}
        onChange={(e) => setLabelText(e.target.value)}
      />
    </form>
  );
});

InlineInput.displayName = "InlineInput";

export default InlineInput;
