import * as React from "react";
import * as ReactDOM from "react-dom";
import {Cell, Header, html, Row, Rows, Select, Table} from "./view/Table";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HTMLTable = (t: Table) => <div dangerouslySetInnerHTML={{__html: `${(html(t))}`}}/>

let table =
  <HTMLTable
    class="table table-hover"
    header={Header(Cell("aaa"), Cell("bbb"), Cell("ccc"))}
    rows={
      Rows(
        Row(Cell("a"), Cell("b"), Select("f", "g", "h")),
        Row(Cell("d"), Cell("e"), Select("f", "g", "h"))
      )
    }
  />
;

let App: React.FunctionComponent = () => <div className="App">
  <div className="col-6">{table}</div>
</div>

ReactDOM.render(<App/>, document.getElementById("root"));