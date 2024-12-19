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
  classElementCustom?: HTMLProps<HTMLButtonElement>["className"];
  defaultValue?: any;
  title?: string;
  onSelected: (index: number) => void;
  value?: string;
}

const DropdownHor: React.FC<DropdownProps> = (props) => {
  const {
    defaultValue,
    onSelected,
    className,
    classContainer,
    classElementCustom,
    title,
    children,
    value,
  } = props;

  const dropdownRef = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref for the button
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(
    undefined,
  ); // State to store width

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

  useEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth); // Set dropdown width to match button
    }
  }, [isShowDropdown]); // Update width when dropdown visibility changes

  const defaultCSS =
    "relative w-fit flex h-9 gap-2 z-40 cursor-pointer items-center justify-start whitespace-nowrap rounded-md border border-primary text-primary px-2 py-1 text-sm ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50";
  const animationClass = isShowDropdown ? "anni-item-show" : "anni-item-hide";

  const classes = clsx(defaultCSS, className);

  const defaultCSSElement =
    "anni-item-show absolute left-0 top-full w-fit z-50 mt-[1px] flex max-h-[300px] flex-wrap gap-1 overflow-auto rounded-md border border-line bg-white p-1 shadow-lg transition-all";
  const classesElement = clsx(
    defaultCSSElement,
    animationClass,
    classElementCustom,
  );

  const classesContainer = clsx(
    "relative flex flex-col gap-2 overflow-none",
    classContainer,
  );

  return (
    <div className={classesContainer} ref={dropdownRef}>
      {title && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {title}
        </label>
      )}
      <button
        ref={buttonRef} // Assign ref to the button
        className={classes}
        onClick={() => setIsShowDropdown((prev) => !prev)}
      >
        {defaultValue?.icon}
        <p className="flex-1 whitespace-nowrap text-start">
          {defaultValue?.title} {value}
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

export default DropdownHor;
