import React from "react";
import "./tableRow.css";

type TableRowProps = {
  headOfHousehold: string;
  phoneNumber: string;
  address: string;
  lastVisit: string;
};

// * A single row that is rendered within the clientInformationTable component
const TableRow: React.FC<TableRowProps> = ({
  headOfHousehold,
  phoneNumber,
  address,
  lastVisit,
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
        {headOfHousehold}
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
