import React, { useState, useEffect } from "react";
import "./pageNumberNav.css";

interface PageNumberNavProps {
  numPages: number;
  parentCurrentPage: number;
}

const PageNumberNav: React.FC<PageNumberNavProps> = ({
  numPages,
  parentCurrentPage,
}) => {
  const [currentPage, setCurrentPage] = useState(parentCurrentPage);

  // * Syncs page state with with the parent component (clientInformationTable.tsx)
  useEffect(() => {
    setCurrentPage(parentCurrentPage);
  }, [parentCurrentPage]);

  // * if a page number is clicked within this component, update this components current page, send an update to the parent
  const pageNumberClicked = (pageNumber: number) => {
    console.log(
      "page number updated within pageNumberNav component: ",
      pageNumber
    );
    setCurrentPage(pageNumber);

    // * creates an event that bubbles up to clientInformationTable to change which range of records is shown (based on selected page)
    const event = new CustomEvent("PageNumberClicked", {
      detail: { pageNumber },
    });
    window.dispatchEvent(event);
  };

  // * creates the navigation numbers/buttons at the bottom of the clientInformationTable, will render as many as there are pages
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
