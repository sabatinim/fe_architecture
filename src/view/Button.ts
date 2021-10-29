export type Button = { value: string, func: any, css: string, tag: "Button", props: {} }

export function renderButton(b: Button) {
  let button = document.createElement("button")
  button.setAttribute("type", "button")
  button.setAttribute("class", b.css)
  button.value = b.value
  button.append(document.createTextNode(b.value))
  button.addEventListener(
    "click",
    (e: MouseEvent) => b.func({e: e, props: b.props})
  )

  return button;
}

export const ButtonWith = (callBack: (event: any) => void, css: string, label: string) =>
  (props: Object): Button => ({value: label, func: callBack, css: css, tag: "Button", props: props})