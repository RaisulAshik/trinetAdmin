import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Admin Panel
        </a>
        <span className="ml-1">&copy; 2021 Team RS2.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Team RS2
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
