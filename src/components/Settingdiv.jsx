import path from "path";
import React from "react";
import { Link } from "react-router-dom";

const imageLinks = [
  {
    path: "/dashboard/setting/profile",
    img: "/images/profile.svg",
  },
  {
    path: "/dashboard/setting/account",
    img: "/images/account.svg",
  },
  {
    path: "/dashboard/setting/notification",
    img: "/images/notification.svg",
  },

  {
    path: "/dashboard/setting/help",
    img: "/images/help.svg",
  },
];
const Settingdiv = () => {
  return (
    <div className="grid  sm:grid-cols-2 md:grid-cols-2 gap-4">
      {imageLinks.map((imageLink, index) => {
        return (
          <Link to={imageLink.path} key={index}>
            <img src={imageLink.img} alt="images" />
          </Link>
        );
      })}
    </div>
  );
};

export default Settingdiv;
