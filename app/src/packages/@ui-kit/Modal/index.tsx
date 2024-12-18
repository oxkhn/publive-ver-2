import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { Backdrop } from "@mui/material";

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
    "fixed left-[50%] top-[50%] z-[1000] bg-background grid max-w-[800px] !translate-x-[-50%] !translate-y-[-50%] gap-4 w-fit p-6 max-sm:p-4 shadow-lg duration-200 rounded-lg overflow-auto";

  const classes = clsx(defaultCSS, className);

  return isShow
    ? ReactDOM.createPortal(
        <React.Fragment>
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: 999 })}
            open={isShow}
            onClick={hide}
          ></Backdrop>
          <div className={classes}>{children}</div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default Modal;
