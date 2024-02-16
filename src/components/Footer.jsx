import React from "react";

const Footer = () => {
  return (
    <div className="pt-5">
      <p className="text-center bg-dark text-white mb-0 py-3">
        &copy; copyright farhad {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
