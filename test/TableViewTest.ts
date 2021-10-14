import {ButtonWith, Cell, Header, renderTable, Row, Rows, Table} from "../src/view/Table";

describe('Table rendering', function () {

  it('should render table data rows', function () {
    let actual = document.createElement('div');

    let model = Table("ddd",
      Header(Cell("aaa"), Cell("bbb"), Cell("ccc")),
      Rows(
        Row(Cell("a"), Cell("b"), Cell("c")),
        Row(Cell("d"), Cell("e"), Cell("f"))
      )
    );

    renderTable(model, actual)

    expect(actual.outerHTML).toContain('<table class="ddd">')
    expect(actual.outerHTML).toContain("<tr><th>aaa</th><th>bbb</th><th>ccc</th></tr>")
    expect(actual.outerHTML).toContain("<tr><td>a</td><td>b</td><td>c</td></tr>")
    expect(actual.outerHTML).toContain("<tr><td>d</td><td>e</td><td>f</td></tr>")
  });

  it('should trigger item click event', function () {
    let actual = document.createElement('div');

    let clicked = "---"

    let Button = ButtonWith((event: any) => {
      clicked = event.target.value
    },"sss");

    renderTable(
      Table("ddd",
        Header(Cell("aaa")),
        Rows(
          Row(Button("cccc"))
        )
      ),
      actual
    )

    expect(actual.outerHTML).toContain(`<tr><td><button type="button" class="sss" value="cccc">cccc</button></td></tr>`)

    actual.getElementsByTagName("button")[0].click()
    expect(clicked).toEqual("cccc")
  });
});