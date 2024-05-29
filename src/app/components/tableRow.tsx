import React from "react";
import "./tableRow.css";

type TableRowProps = {
  headOfHousehold: string;
  phoneNumber: string;
  address: string;
  lastVisit: string;
  isFlagged: boolean;
};

// * A single row that is rendered within the clientInformationTable component
const TableRow: React.FC<TableRowProps> = ({
  headOfHousehold,
  phoneNumber,
  address,
  lastVisit,
  isFlagged,
}) => {
  // * These don't update the database but help with styling if these attributes are missing.
  if (!headOfHousehold) {
    headOfHousehold = "­";
  }
  if (!lastVisit) {
    lastVisit = "­";
  }

  return (
    <div className="tableRow">
      <div className="headOfHousehold" title="headOfHousehold">
        <div className="nameWithIcon">
          {headOfHousehold}
          {isFlagged && (
            <svg className='flagIcon'>
              <use href="/user-icons.svg#icon-warning"/>
            </svg>
          )}
        </div>
      </div>
      <div className="phoneNumber" title="phoneNumber">
        {phoneNumber}
      </div>
      <div className="address" title="address">
        {address}
      </div>
      <div className="lastVisit" title="lastVisit">
        {lastVisit}
      </div>
    </div>
  );
};

export default TableRow;
