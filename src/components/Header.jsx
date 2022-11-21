import "../styles/components/header.sass";
import { IoLogoJavascript as LogoIcon } from "react-icons/io";
import { GiHamburgerMenu as MenuIcon } from "react-icons/gi";
export default function Header() {
  return (
    <header className="header">
      <a href="/" className="header-link">
        <LogoIcon />
      </a>
      <h2 className="header-title">Controle financeiro</h2>
      <a href="/" className="menu-link">
        <MenuIcon />
      </a>
    </header>
  );
}
