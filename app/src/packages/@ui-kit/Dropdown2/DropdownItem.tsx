import clsx from "clsx";
import { HTMLProps } from "react";
import { IoWallet } from "react-icons/io5";

export interface DropdownItemProps {
  className?: HTMLProps<HTMLButtonElement>["children"];
  icon?: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { icon, title, onClick } = props;

  const classes = clsx();

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
        return item;
    }
  };

  return (
    <button
      className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-grays/5"
      onClick={onClick}
    >
      {icon}
      <p className="whitespace-nowrap text-grays/75">{renderItemName(title)}</p>
    </button>
  );
};

export default DropdownItem;
