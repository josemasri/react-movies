import React from "react";

const Footer = ({ title }) => {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 1rem",
      }}
    >
      <p>&copy; {new Date().getFullYear()}</p>
      <p>Created By Jose Masri</p>
      <h4>{title}</h4>
    </footer>
  );
};

export default Footer;
