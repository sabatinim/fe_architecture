//ADT

type Header = CellString[]
type Button = { value: string, func: any, css: string, tag: "Button" }
type CellString = { value: string, tag: "Cell" }
type Cell = CellString | Button
type Row = Cell[]
type Rows = Row[]
export type Table = { class: string, header: Header, rows: Rows }

function render_button(b: Button) {
  let button = document.createElement("button")
  button.setAttribute("type", "button")
  button.setAttribute("class", b.css)
  button.value = b.value
  button.append(document.createTextNode(b.value))
  button.addEventListener("click", b.func)
  return button;
}

function element_from(cell: Cell) {
  switch (cell.tag) {
    case "Cell":
      return document.createTextNode(cell.value)
    case "Button":
      return render_button(cell)
  }
}

export const renderTable = (t: Table, element: HTMLElement) => {
  let table = document.createElement("table")
  table.setAttribute("class", t.class)

  let thead = table.createTHead()
  let tr = document.createElement("tr")
  t.header.forEach(h => {
    let th = document.createElement("th")
    let text = document.createTextNode(h.value)
    th.append(text)
    tr.append(th)
  })

  let tbody = table.createTBody()
  t.rows.forEach(row => {
    let tr = document.createElement("tr")
    row.forEach(cell => {
      let td = document.createElement("td")

      td.append(element_from(cell))
      tr.append(td)
    })
    tbody.append(tr)
  })

  thead.append(tr)
  table.append(thead)
  table.append(tbody)
  element.append(table)
}

export const Table = (c: string, h: Header, r: Rows): Table => ({class: c, header: h, rows: r})
export const Header = (...cols: CellString[]): Header => cols
export const Rows = (...row: Row[]): Rows => row
export const Row = (...cells: Cell[]): Row => cells
export const Cell = (v: string): CellString => ({value: v, tag: "Cell"})
export const ButtonWith = (callBack: (event: any) => void, css: string) =>
  (value: string): Button => ({value: value, func: callBack, css: css, tag: "Button"})
