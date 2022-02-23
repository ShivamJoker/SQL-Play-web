import { QueryExecResult } from 'sql.js';
import '@styles/Editor/ResultsTable.scss';
import React from 'react';
import randomString from '@utils/randomString';

interface Props {
table: QueryExecResult | undefined,
}

function ResultsTable({ table }: Props) {
  if (!table) return null;

  return (
    <table>
      <thead>
        <tr className="headers">
          {table.columns.map((column) => (
            <th
              id={`result-table-column-${randomString()}`}
              key={`result-table-column-${randomString()}`}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
      table.values.map((values) => (
        <React.Fragment key={`result-table-fragment-${randomString()}`}>
          <tr key={`result-table-tr-${randomString()}`}>
            {values.map((val) => (
              <td
                key={`result-table-td-${randomString()}`}
                id={`result-table-td-${randomString()}`}
              >
                {val || <i key={`result-table-td-i-${randomString()}`}>null</i>}
              </td>
            ))}
          </tr>
        </React.Fragment>
      ))
    }
      </tbody>
    </table>
  );
}

export default ResultsTable;
