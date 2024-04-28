import React from "react";
import "./tableRow.css";

// Props to be rendered within the Row
type TableRowProps = {
  headOfHousehold: string;
  phone: string;
  address: string;
  lastVisit: string;
};

const TableRow: React.FC<TableRowProps> = ({
  headOfHousehold,
  phone,
  address,
  lastVisit,
}) => {
  return (
    <div className="tableRow">
      <div className="headOfHouseholdName">{headOfHousehold}</div>
      <div className="phoneNumber">{phone}</div>
      <div className="address">{address}</div>
      <div className="lastVisit">{lastVisit}</div>
    </div>
  );
};

export default TableRow;
