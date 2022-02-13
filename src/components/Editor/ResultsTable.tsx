import { v4 } from "uuid";
import { QueryExecResult } from "sql.js";
import '@styles/Editor/ResultsTable.scss'
interface Props {
table: QueryExecResult
};

const ResultsTable: React.FC<Props> = ({table}) => {
  return (
  <table id={`result-table-${v4()}`}>
    <thead>
        <tr className="headers">
        {table.columns.map((column) =>
          <th id={`result-table-column-${v4()}`} key={`result-table-column-${v4()}`}>{column}</th>
        )}
        </tr>
    </thead>
    <tbody>
     {
      table.values.map((values) => <tr key={`result-table-tr-${v4()}`}>
        {values.map(val => ( <td id={`result-table-td-${v4()}`}>{val ? val : <i>null</i>}</td>
        ))}
      </tr>
      )
    }
    </tbody>
  </table>);
}

export default ResultsTable;
