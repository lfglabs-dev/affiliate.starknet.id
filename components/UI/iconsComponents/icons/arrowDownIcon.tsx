import React, { FunctionComponent } from "react";

const ArrowDownIcon: FunctionComponent<IconProps> = ({
  width,
  className,
  color,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={width}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.984 3.807c-1.83 0-4.038 2.18-4.578 2.443l-.009.004c-.883.432-1.403.686-3.042-.547-1.018-.633-3.296-1.954-4.273-2.171C.862 3.264.556 4.62 1.777 5.164c1.22.543 3.662 3.528 4.883 5.428 1.22 1.9 2.746.271 2.746 0s2.442-3.8 3.968-4.342c1.526-.543 2.441-2.443.61-2.443z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowDownIcon;
