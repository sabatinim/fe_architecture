import {ButtonWith, Cell, Header, renderTable, Row, Rows, Table} from "./view/Table";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let actual = document.createElement('div');
// @ts-ignore
document.getElementById("root").append(actual)
let buttonBuilder = ButtonWith((event: any) => console.log(`Add Detail of ${event.target.value}`),"btn btn-outline-info")

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
