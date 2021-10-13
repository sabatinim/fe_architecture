//ADT
type Header = CellString[]
type Select = { actions: string[], tag: "Select" }
type CellString = { value: string, tag: "Cell" }
type Cell = CellString | Select
type Row = Cell[]
type Rows = Row[]
export type Table = { class: string, header: Header, rows: Rows }

const render = (cell: Cell): string => {
  switch (cell.tag) {
    case "Cell":
      return `<td>${cell.value}</td>`;
    case "Select":
      return `<td><select>${cell.actions.map(a => `<option>${a}</option>`).join("")}</select></td>`
  }
}

export const html = (t: Table): String => {
  let header = `<tr>${t.header.map(c => `<th>${c.value}</th>`).join("")}</tr>`

  let rows = t.rows.map(row => `<tr>${row.map(render).join("")}</tr>`).join("")

  return `<table class="${t.class}"><thead>${header}</thead><tbody>${rows}</tbody></table>`
}

export const Table = (c: string, h: Header, r: Rows): Table => ({class: c, header: h, rows: r})
export const Header = (...cols: CellString[]): Header => cols
export const Rows = (...row: Row[]): Rows => row
export const Row = (...cells: Cell[]): Row => cells
export const Cell = (v: string): CellString => ({value: v, tag: "Cell"})
export const Select = (...actions: string[]): Select => ({actions: actions, tag: "Select"})
