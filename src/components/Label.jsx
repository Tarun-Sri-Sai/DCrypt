const Label = ({ labelText, children }) => {
    return (
        <div className="text-xs sm:text-sm md:text-base lg:text-lg flex items-center space-x-2">
            <label className="font-medium text-blue-500">{`${labelText}:`}</label>
            <span>{children}</span>
        </div>
    );
};

export default Label;
