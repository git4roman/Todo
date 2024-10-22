import React from "react";

const Table = () => {
  return (
    <>
      <table
        style={{
          width: "600px",

          margin: "20px 0",
          "text-align": "center",
        }}
      >
        <thead>
          <tr>
            <th>Column 1</th>
            <th colSpan="2">Column 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Cell 1
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Cell 2
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Cell 3
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
