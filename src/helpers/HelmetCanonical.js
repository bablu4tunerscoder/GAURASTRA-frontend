// HelmetCanonical.js
import React from "react";
import { Helmet } from "react-helmet-async";

const HelmetCanonical = ({ href }) => {
  if (!href) return null; // Don't render if no canonical provided

  return (
    <Helmet>
      <link rel="canonical" href={href} />
    </Helmet>
  );
};

export default HelmetCanonical;
