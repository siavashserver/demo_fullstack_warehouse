import Link from "next/link";
import React from "react";

export interface NavBarProps {
  items: NavBarItem[];
}

export interface NavBarItem {
  label: string | JSX.Element;
  link: string;
  icon: JSX.Element;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <nav className="navbar">
      {props.items.map((item, index) => {
        return (
          <Link key={index} href={item.link}>
            <a className="navbar-item">
              <span className="navbar-item-block">
                {item.icon}
                {item.label}
              </span>
            </a>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
