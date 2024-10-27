"use client";
import React, { HTMLProps, useEffect, useRef, useState } from "react";
import Button from "../Button";
import clsx from "clsx";
import DropdownItem from "./DropdownItem";
import "../styles/anni.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export interface DropdownProps {
  children?: HTMLProps<HTMLButtonElement>["children"];
  className?: HTMLProps<HTMLButtonElement>["className"];
  classContainer?: HTMLProps<HTMLButtonElement>["className"];
  defaultValue?: any;
  title?: string;
  onSelected: (index: number) => void;
  value?: string;
}

const DropdownV2: React.FC<DropdownProps> = (props) => {
  const {
    defaultValue,
    onSelected,
    className,
    classContainer,
    title,
    children,
    value,
  } = props;
  const dropdownRef = useRef<any>(null);

  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const defaultCSS =
    "relative w-fit flex  h-6 gap-2 z-40 cursor-pointer items-center justify-start whitespace-nowrap rounded-full border border-primary px-3 py-1 text-sm ring-offset-background transition-colors  disabled:pointer-events-none disabled:opacity-50";
  const animationClass = isShowDropdown ? "anni-item-show" : "anni-item-hide";

  const classes = clsx(defaultCSS, className);

  const defaultCSSElement =
    "z-50 absolute top-6 left-0 grid bg-white mt-[1px] w-fit transition-all gap-1 rounded-md p-1 anni-item-show max-w-lg gap-1 border border-line p-1 shadow-lg sm:max-w-[425px] p-1";
  const classesElement = clsx(defaultCSSElement, animationClass);

  const classesContainer = clsx(
    "relative flex flex-col gap-2 overflow-none",
    classContainer,
  );

  const renderItemName = (item) => {
    switch (item) {
      case "BW":
        return "Chăm sóc sắc đẹp";
      case "PC":
        return "Chăm sóc cơ thể";
      case "HC":
        return "Chăm sóc nhà cửa";
      case "all":
        return "Tất cả";
      default:
        return item; // Hiển thị giá trị gốc nếu không khớp
    }
  };

  return (
    <div className={classesContainer} ref={dropdownRef}>
      {title && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {title}
        </label>
      )}
      <button
        className={classes}
        onClick={() => setIsShowDropdown(() => !isShowDropdown)}
      >
        {defaultValue?.icon}
        <p className="flex-1 whitespace-nowrap text-start">
          {defaultValue?.title} {renderItemName(value)}
        </p>
        {isShowDropdown ? (
          <IoIosArrowUp className="text-xs" />
        ) : (
          <IoIosArrowDown className="text-xs" />
        )}
      </button>

      {isShowDropdown && (
        <div className={classesElement}>
          {Array.isArray(children)
            ? children.map((child, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onSelected(index);
                    setIsShowDropdown(false);
                  }}
                >
                  {child}
                </div>
              ))
            : children}
        </div>
      )}
    </div>
  );
};

export default DropdownV2;
