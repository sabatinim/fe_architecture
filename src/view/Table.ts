import {Button, renderButton} from "./Button";

//ADT
type Header = CellString[]
type CellString = { value: string, tag: "Cell" }
type Cell = CellString | Button
type Row = Cell[]
type Rows = Row[]
export type Table = { class: string, header: Header, rows: Rows }

function renderCell(cell: Cell) {
  switch (cell.tag) {
    case "Cell":
      return document.createTextNode(cell.value)
    case "Button":
      return renderButton(cell)
  }
}

export const renderTable = (t: Table) => {
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

      td.append(renderCell(cell))
      tr.append(td)
    })
    tbody.append(tr)
  })

  thead.append(tr)
  table.append(thead)
  table.append(tbody)
  return table
}

export const Table = (c: string, h: Header, r: Rows): Table => ({class: c, header: h, rows: r})
export const Header = (...cols: CellString[]): Header => cols
export const Rows = (...row: Row[]): Rows => row
export const Row = (...cells: Cell[]): Row => cells
export const Cell = (v: string): CellString => ({value: v, tag: "Cell"})