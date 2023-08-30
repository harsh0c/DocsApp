import React from 'react';
import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer-bottom">
          Made by Harsh Chandra © {new Date().getFullYear()}
    </div>
  )
}

export default Footer