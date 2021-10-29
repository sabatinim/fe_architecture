import {ButtonWith, renderButton} from "../src/view/Button";

describe('Button rendering', function () {

  it('should render button', function () {

    let Button = ButtonWith(() => {}, "CSS", "LABEL");

    let button = renderButton(Button({}))

    expect(button.outerHTML).toEqual('<button type="button" class="CSS" value="LABEL">LABEL</button>')
  })

  it('on click button', function () {

    let expected = ""
    let callBack = (event: any) => {
      expected = event.props
    };
    let Button = ButtonWith(callBack, "CSS", "LABEL");

    let button = renderButton(Button({field: "aaa", another_field: "bbb"}))

    button.click()

    expect(expected).toEqual({field: "aaa", another_field: "bbb"})
  })
})