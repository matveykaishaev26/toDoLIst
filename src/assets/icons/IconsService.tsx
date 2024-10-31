import { SlOptions } from "react-icons/sl";
import { FaRegFolder } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { PiSidebarSimpleThin } from "react-icons/pi";
import { CiLight } from "react-icons/ci";

// import { typeSidebarTab } from "../types/types";
// import MainSidebar from "../shared/MainSidebar/MainSidebar";
// import { BsCalendarDateFill } from "react-icons/bs";
// import { IoSearch } from "react-icons/io5";
// import { BsBookmarkCheckFill } from "react-icons/bs";
// import { GoSync } from "react-icons/go";
// import { FaBell } from "react-icons/fa";
// import { BsFillQuestionSquareFill } from "react-icons/bs";
type iconsServiceProps= {
  iconName: string;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void; 
}
export function IconsService({
  iconName,
  className,
  onClick
}: iconsServiceProps) {
  switch (iconName) {
    case "options":
      return <SlOptions className={className} onClick={onClick}/>;
    case "folder_open":
      return <FaRegFolderOpen className={className} onClick={onClick}/>;
    case "folder_close":
      return <FaRegFolder className={className} onClick={onClick}/>;
    case "task":
      return <LuMenu className={className} onClick={onClick} />;
    case "plus":
      return <GoPlus className={className} onClick={onClick} />;
    case "dropdown_icon": 
      return <FaChevronDown className={className} onClick={onClick} />;
    case 'create_new_folder':
      return <MdOutlineCreateNewFolder className={className} onClick={onClick} />;
    case 'sidebar_toggle':
      return <PiSidebarSimpleThin className={className} onClick={onClick} />;
    case 'change_theme':
      return <CiLight className={className} onClick={onClick} />;
  }
}
