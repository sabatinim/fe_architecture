import {Cell, Header, renderTable, Row, Rows, Table} from "./view/Table";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonWith} from "./view/Button";


let buttonBuilder = ButtonWith(
  (event: any) => {
    // @ts-ignore
    document.getElementById("detail")?.innerHTML =
      `</br><span>Person: ${event.props["name"]} - ${event.props["surname"]}</br>Address: ${event.props["address"]}</span>`
  },
  "btn btn-outline-info", "Detail"
)

let tableModel = Table(
  "table table-hover",
  Header(Cell("Name"), Cell("Surname"), Cell("Actions")),
  Rows(
    Row(Cell("Marco"), Cell("Sabatini"), buttonBuilder({
      name: "Marco",
      surname: "Sabatini",
      address: "Rocket Square, 1"
    })),
    Row(Cell("Mario"), Cell("Rossi"), buttonBuilder({
      name: "Mario",
      surname: "Rossi",
      address: "Rocket Square, 2"
    }))
  )
);

document.getElementById("table")?.append(renderTable(tableModel))