import Link from "next/link";
import React from "react";
import Logo from "../../public/images/logo.svg";

export default function Header() {
  return (
    <header>
      <div>
        <Link href='/'>
          <Logo />
        </Link>
      </div>
      <div className="headerdiv">
          <a className="nav-link">Contact</a>
          <a className="nav-link">Log in</a>
          <a className="nav-link">Register</a>
      </div>
    </header>
  );
}
