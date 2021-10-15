import {ButtonWith, Cell, Header, renderTable, Row, Rows, Table} from "./view/Table";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let actual = document.createElement('div');

document.getElementById("table")?.append(actual)
let buttonBuilder = ButtonWith(
  (event: any) => {
    // @ts-ignore
    document.getElementById("detail")?.innerHTML = `<span>Add Detail of ${event.target.value}</span>`
  },
  "btn btn-outline-info"
)

renderTable(Table(
    "table table-hover",
    Header(Cell("One"), Cell("Two"), Cell("ccc")),
    Rows(
      Row(Cell("Marco"), Cell("Sabatini"), buttonBuilder("Details Marco")),
      Row(Cell("Mario"), Cell("Rossi"), buttonBuilder("Details Mario"))
    )
  ),
  actual
)
