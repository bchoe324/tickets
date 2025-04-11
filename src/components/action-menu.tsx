"use client";

import { useEffect, useRef, useState } from "react";

interface items {
  element: React.ReactNode;
  onClick?: () => void;
}

type ActionMenuProps = {
  items: items[];
};

const ActionMenu = ({ items }: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButton = () => setIsOpen((prev) => !prev);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutSideClick);
    } else {
      document.removeEventListener("mousedown", handleOutSideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [isOpen]);

  return (
    <div className="action_button" ref={menuRef}>
      <span
        className="block w-full h-full cursor-pointer hover:opacity-80"
        onClick={toggleButton}
      >
        <svg
          className="w-[20px] h-[20px]"
          fill="none"
          stroke="#999"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </span>
      {isOpen ? (
        <div className="absolute py-[10px] bottom-0 left-full -translate-x-full translate-y-full flex flex-col bg-white rounded-[8px] shadow-[0px_8px_24px_0px_rgba(149,_157,_165,_0.2)] overflow-hidden">
          {items &&
            items.map((item, index) => (
              <div
                key={index}
                className="py-[10px] px-[20px] whitespace-nowrap cursor-pointer hover:bg-black/10 *:inline-flex *:items-center [&_.delete_button]:text-red-400 [&_svg]:mr-[5px] [&_svg]:w-[18px]"
                onClick={item.onClick}
              >
                {item.element}
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default ActionMenu;
