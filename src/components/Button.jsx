import classNames from "classnames";
import { FaSync } from "react-icons/fa";

function Button({
    children,
    primaryBtn,
    secondaryBtn,
    updateBtn,
    isLoading,
    isDisabled,
    outlineBtn,
    className,
    ...rest
}) {
    const classes = classNames(
        `flex items-center gap-2 cursor-pointer px-3 rounded text-gray-950 font-medium`,
        {
            "py-3": isLoading,
            "py-2": !isLoading,
            "bg-opacity-60 text-opacity-60": isDisabled,
            "bg-green-400": updateBtn,
            "bg-sky-300": primaryBtn,
            "bg-slate-300": secondaryBtn,
            "border-[1.3px] border-gray-300 bg-white": outlineBtn,
        },
        className
    );

    return (
        <button
            {...rest}
            disabled={isLoading || isDisabled}
            className={classes}
        >
            {isLoading ? <FaSync className="animate-spin" /> : children}
        </button>
    );
}

export default Button;
