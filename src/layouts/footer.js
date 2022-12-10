import React from "react";
import Logo from "../../public/images/logo.svg";
import FacebookLogo from "../../public/images/facebook_icon.svg";
import LinkedinLogo from "../../public/images/linkedin_icon.svg";
import InstagramLogo from "../../public/images/instagram_icon.svg";
import TwitterLogo from "../../public/images/twitter_icon.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <div
      style={{
        height: "6vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div>
        <div style={{ display: "inline-block", marginRight: "20px" }}>
          <Link href='https://www.facebook.com/hellotoroto'>
            <FacebookLogo />
          </Link>
        </div>
        <div style={{ display: "inline-block", marginRight: "20px" }}>
          <Link href='https://www.linkedin.com/company/toroto/'>
            <LinkedinLogo />
          </Link>
        </div>
        <div style={{ display: "inline-block", marginRight: "20px" }}>
          <Link href='https://www.instagram.com/hellotoroto/'>
            <InstagramLogo />
          </Link>
        </div>
        <div style={{ display: "inline-block" }}>
          <Link href='https://twitter.com/HelloToroto'>
            <TwitterLogo />
          </Link>
        </div>
      </div>
      <div style={{ margin: "5%", paddingTop: "10px" }}>
        <Link href='https://toroto.com/'>
          <Logo />
        </Link>
      </div>
      <div style={{ fontWeight: "bold", color: "#0055B8" }}>
        <Link href='https://toroto.com/'>More information</Link>
      </div>
    </div>
  );
}
