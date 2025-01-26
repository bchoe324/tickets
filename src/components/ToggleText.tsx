import { useState } from "react";

const ToggleText = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleText = () => setIsOpen(!isOpen);
  const isLongText = text.length > maxLength;

  return (
    <>
      <p className="review">
        {isOpen || !isLongText ? text : `${text.slice(0, maxLength)}...`}
      </p>
      {isLongText && (
        <button onClick={toggleText}>{isOpen ? "접기" : "더보기"}</button>
      )}
    </>
  );
};

export default ToggleText;
