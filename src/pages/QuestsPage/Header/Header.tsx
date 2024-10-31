import s from "./Header.module.scss";
import useTheme from "../../../hooks/useTheme";
import { IconsService } from "../../../assets/icons/IconsService";
type Props = {
  toggleSidebarOpen: () => void;
  pageName?: string;
};

export default function Header({ toggleSidebarOpen, pageName }: Props) {
  const { toggleThemeMode } = useTheme();
  return (
    <header className={s.appHeader}>
      <div className={s.wrapper}>
        <div onClick={toggleSidebarOpen} className={s.iconWrapper}>
          <IconsService
            iconName="sidebar_toggle"
            className={s.sidebarToggle}
          />
        </div>
        <div className={s.pageName}>{pageName}</div>
      </div>
      <div className={s.wrapper}>
        <div onClick={toggleThemeMode} className={s.iconWrapper}>
          <IconsService iconName="change_theme" className={s.changeTheme} />
        </div>
      </div>
    </header>
  );
}
