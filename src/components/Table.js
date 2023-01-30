import React from "react";
import { useTable } from "react-table";
import moment from "moment";
import "./table.css";

const TableComponent = ({ columns, data }) => {
  
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    useTable({ columns, data });
  const getCell = (cell) => {
    if (cell.column.id === "active") {
      return (
        <span className="active-cell">
          <span className={`dot ${!cell.value ? "inacative" : ""}`}></span>{" "}
          {cell.value ? "Active" : "Inactive"}
        </span>
      );
    } else if (cell.column.id === "startDate" || cell.column.id === "endDate") {
      return <span>{moment(cell.value).format("DD/MM/YYYY")}</span>;
    } else {
      return cell.render("Cell");
    }
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <table
        className="table"
        bordered={true}
        striped
        hover
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="table-row" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="table-head" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={
                        cell.column.id !== "active" ? "table-data" : ""
                      }
                      {...cell.getCellProps()}
                    >
                      {getCell(cell)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
