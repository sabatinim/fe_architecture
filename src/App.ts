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
    Header(Cell("aaa"), Cell("bbb"), Cell("ccc")),
    Rows(
      Row(Cell("a"), Cell("b"), buttonBuilder("1")),
      Row(Cell("c"), Cell("d"), buttonBuilder("2"))
    )
  ),
  actual
)
