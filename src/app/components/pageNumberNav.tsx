import React from "react";
import "./pageNumberNav.css";
import { useState } from "react";

interface PageNumberNavProps {
  numPages: number;
}

const PageNumberNav: React.FC<PageNumberNavProps> = ({ numPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // * handles the currentPage state within this component and creates event to update the parent component
  const pageNumberClicked = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    // * creates an event that bubbles up to clientInformationTable to change which range of records is shown (based on selected page)
    const event = new CustomEvent("PageNumberClicked", {
      detail: { pageNumber },
    });

    window.dispatchEvent(event);
  };

  // * creates the navigation numbers/buttons at the botton of the clientInformationTable, will render as many as there are pages
  return (
    <div className="page-numbers-container">
      <ul className="numbers-list">
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) => (
          <li
            className={`individual-number ${
              pageNumber === currentPage ? "selectedListItem" : ""
            }`}
            key={`page-number-${pageNumber}`}
          >
            <p onClick={() => pageNumberClicked(pageNumber)}>{pageNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageNumberNav;
