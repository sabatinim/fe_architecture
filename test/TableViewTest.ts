import {Cell, Header, renderTable, Row, Rows, Table} from "../src/view/Table";
import {ButtonWith} from "../src/view/Button";

describe('Table rendering', function () {

  it('should render table data rows', function () {
    let model = Table("ddd",
      Header(Cell("aaa"), Cell("bbb"), Cell("ccc")),
      Rows(
        Row(Cell("a"), Cell("b"), Cell("c")),
        Row(Cell("d"), Cell("e"), Cell("f"))
      )
    );

    let actual = renderTable(model)

    expect(actual.outerHTML).toContain('<table class="ddd">')
    expect(actual.outerHTML).toContain("<tr><th>aaa</th><th>bbb</th><th>ccc</th></tr>")
    expect(actual.outerHTML).toContain("<tr><td>a</td><td>b</td><td>c</td></tr>")
    expect(actual.outerHTML).toContain("<tr><td>d</td><td>e</td><td>f</td></tr>")
  });

  it('should trigger item click event', function () {
    let clicked = "---"

    let Button = ButtonWith((event: any) => {
      clicked = event.props
    }, "sss", "cccc");

    let actual = renderTable(
      Table("ddd",
        Header(Cell("aaa")),
        Rows(
          Row(Button({id: 123, other: "value"}))
        )
      )
    )

    expect(actual.outerHTML).toContain(`<tr><td><button type="button" class="sss" value="cccc">cccc</button></td></tr>`)

    actual.getElementsByTagName("button")[0].click()
    expect(clicked).toEqual({id: 123, other: "value"})
  });
});