import {Cell, Header, html, Row, Rows, Select, Table} from "../src/view/Table";

describe('Table rendering', function () {

  it('should render table data rows', function () {
    const actual = html(
      Table("ddd",
        Header(Cell("aaa"), Cell("bbb"), Cell("ccc")),
        Rows(
          Row(Cell("a"), Cell("b"), Cell("c")),
          Row(Cell("d"), Cell("e"), Cell("f"))
        )
      )
    )

    expect(actual).toContain('<table class="ddd">')
    expect(actual).toContain("<tr><th>aaa</th><th>bbb</th><th>ccc</th></tr>")
    expect(actual).toContain("<tr><td>a</td><td>b</td><td>c</td></tr>")
    expect(actual).toContain("<tr><td>d</td><td>e</td><td>f</td></tr>")
  });

  it('should trigger item click event', function () {
    const actual = html(
      Table("ddd",
        Header(Cell("aaa")),
        Rows(
          Row(Select("one", "two"))
        )
      )
    )

    expect(actual).toContain(`<tr><td><select><option>one</option><option>two</option></select></td></tr>`)
  });
});