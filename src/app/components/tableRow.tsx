import React from "react";
import "./tableRow.css";
import { format } from "date-fns";

type TableRowProps = {
  clientId: string;
  headOfHousehold: string;
  phoneNumber: string;
  address: string;
  entryDates: Date[];
  isFlagged: boolean;
};

// * A single row that is rendered within the clientInformationTable component
const TableRow: React.FC<TableRowProps> = ({
  clientId,
  headOfHousehold,
  phoneNumber,
  address,
  entryDates,
  isFlagged,
}) => {
  // * These don't update the database but help with styling if these attributes are missing.
  if (!headOfHousehold) {
    headOfHousehold = "­";
  }

  // * if entryDates doesn't exist, set empty string for the date; otherwise, get the last date and convert it to a string
  let lastVisit: string;
  if (entryDates.length === 0) {
    lastVisit = "­";
  } else {
    // sort the array so that the most recent visit date is at the end of the list
    entryDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    // use date-fns format to easily format date to MM/DD/YY
    const date = entryDates[entryDates.length - 1];
    console.log(headOfHousehold, date);
    lastVisit = format(date, "MM/dd/yy");
  }

  return (
    <div className="tableRow">
      <div className="headOfHousehold" title="headOfHousehold">
        <a href={`/clientPage/${clientId}`} className="nameWithIcon">
          {headOfHousehold}
          {isFlagged && (
            <svg className="flagIcon">
              <use href="/user-icons.svg#icon-warning" />
            </svg>
          )}
        </a>
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
