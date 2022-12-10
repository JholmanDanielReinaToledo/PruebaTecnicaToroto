import Link from "next/link";
import React from "react";
import Logo from "../../public/images/logo.svg";

export default function Header() {
  return (
    <header>
      <div className='logo'>
        <Link href='/'>
          <Logo />
        </Link>
      </div>
      <i className='fa fa-bars fa-3x'></i>
      <div style={{justifyContent: 'space-between'}}>

          <a className="nav-link">Contact</a>
          <a className="nav-link">Log in</a>
          <a className="nav-link">Register</a>

      </div>
    </header>
  );
}
