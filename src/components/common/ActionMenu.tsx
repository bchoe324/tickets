import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .icon {
    cursor: pointer;
    display: block;
    width: 100%;
    height: 100%;
    &:hover {
      opacity: 0.8;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .menu {
    padding: 10px 0;
    position: absolute;
    bottom: 0;
    left: 100%;
    transform: translate(-100%, 100%);
    -webkit-transform: translate(-100%, 100%);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    overflow: hidden;
    .menu_item {
      cursor: pointer;
      padding: 10px 20px;
      white-space: nowrap;
      font-size: 16px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      > * {
        display: inline-flex;
        align-items: center;
        &.delete_button {
          color: #ff5252;
        }
      }
      svg {
        margin-right: 5px;
        width: 18px;
      }
    }
  }
`;

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
    <Wrapper className="action_button" ref={menuRef}>
      <span className="icon" onClick={toggleButton}>
        <svg
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
        <div className="menu">
          {items &&
            items.map((item, index) => (
              <div key={index} className="menu_item" onClick={item.onClick}>
                {item.element}
              </div>
            ))}
        </div>
      ) : null}
    </Wrapper>
  );
};

export default ActionMenu;
