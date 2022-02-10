import { v4 } from "uuid";
import { QueryExecResult } from "sql.js";
import '@styles/Editor/ResultsTable.scss'
interface Props {
table: QueryExecResult
};

const ResultsTable: React.FC<Props> = ({table}) => {
  return (
  <table id={`result-table-${v4()}`} style={{
    gridTemplateColumns: `repeat(${table.columns.length}, 1fr)`,
    width: 400,
  }}>
        <tr className="headers">
        {table.columns.map((column) =>
          <th id={`result-table-column-${v4()}`}>{column}</th>
        )}
        </tr>
     {
      table.values.map((values) => <tr>
        {values.map(val => ( <td id={`result-table-td-${v4()}`}>{val ? val : <i>null</i>}</td>
        ))}
      </tr>
      )
    }
  </table>);
}

export default ResultsTable;
