import React from "react";
import "./tableRow.css";

type TableRowProps = {
  headOfHousehold: string;
  phone: string;
  address: string;
  lastVisit: string;
};

// * A single row that is rendered within the clientInformationTable component
const TableRow: React.FC<TableRowProps> = ({
  headOfHousehold,
  phone,
  address,
  lastVisit,
}) => {
  return (
    <div className="tableRow">
      <div className="headOfHouseholdName" title={headOfHousehold}>
        {headOfHousehold}
      </div>
      <div className="phone" title={phone}>
        {phone}
      </div>
      <div className="address" title={address}>
        {address}
      </div>
      <div className="lastVisit" title={lastVisit}>
        {lastVisit}
      </div>
    </div>
  );
};

export default TableRow;
