import clsx from "clsx";
import { HTMLProps, useState } from "react";
import { IoWallet } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";

export interface DropdownItemProps {
  className?: HTMLProps<HTMLButtonElement>["children"];
  icon?: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const ChipRemove: React.FC<DropdownItemProps> = (props) => {
  const { icon, title, onClick } = props;
  const [isHovered, setIsHovered] = useState(false);

  const classes = clsx();

  return (
    <button
      className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors hover:bg-grays/5"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      <p className="whitespace-nowrap text-grays/75">{title}</p>

      {isHovered && (
        <div>
          <HiOutlineTrash className="text-red" />
        </div>
      )}
    </button>
  );
};

export default ChipRemove;
