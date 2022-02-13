import { v4 } from "uuid";
import { QueryExecResult } from "sql.js";
import '@styles/Editor/ResultsTable.scss'
import React from "react";
interface Props {
table: QueryExecResult | undefined,
};

const ResultsTable: React.FC<Props> = ({table}) => {
  if(!table) return null;
  
  return (
  <table>
    <thead>
        <tr className="headers">
        {table.columns.map((column) => (
          <th
          id={`result-table-column-${v4()}`}
          key={`result-table-column-${v4()}`}>
            {column}
          </th>
        ))}
        </tr>
    </thead>
    <tbody>
     {
      table.values.map((values) => (
        <React.Fragment key={`result-table-fragment-${v4()}`}>
          <tr key={`result-table-tr-${v4()}`}>
            {values.map(val => (
            <td
            key={`result-table-td-${v4()}`}
            id={`result-table-td-${v4()}`}>
              {val ? val : <i key={`result-table-td-i-${v4()}`}>null</i>}
            </td>
            ))}
          </tr>
        </React.Fragment>
      )
      )
    }
    </tbody>
  </table>);
}

export default ResultsTable;
