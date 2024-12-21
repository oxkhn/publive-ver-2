import { IoWallet } from "react-icons/io5";

export interface DropdownItemProps {
  icon?: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { icon, title, onClick } = props;

  const renderItemName = (item: any) => {
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
      <p className="whitespace-nowrap">{renderItemName(title)}</p>
    </button>
  );
};

export default DropdownItem;
