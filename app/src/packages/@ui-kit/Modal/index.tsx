import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";

interface IModalProps {
  isShow: boolean;
  hide: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<IModalProps> = (props) => {
  const { children, isShow, hide, className } = props;
  const [shouldRender, setShouldRender] = useState(isShow);

  useEffect(() => {
    if (isShow) {
      setShouldRender(true);
    }
  }, [isShow]);

  const handleAnimationEnd = () => {
    if (!isShow) {
      setShouldRender(false);
    }
  };

  const defaultCSS =
    "fixed left-[50%] top-[50%] z-50 bg-background grid w-full max-w-[800px] !translate-x-[-50%] !translate-y-[-50%] gap-4 border-2 border-line p-6 shadow-lg duration-200 sm:rounded-lg overflow-auto";
  const animationClass = isShow ? "animate-faded-in" : "animate-faded-out";

  const classes = clsx(defaultCSS, animationClass, className);

  return shouldRender
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            data-state={isShow ? "open" : "closed"}
            className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-faded-out data-[state=open]:animate-faded-in"
            onClick={hide}
          />
          <div
            role="dialog"
            data-state={isShow ? "open" : "closed"}
            className={classes}
            onAnimationEnd={handleAnimationEnd}
          >
            {children}
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default Modal;
