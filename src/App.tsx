import { useRef } from "react"
import { ColorInput } from "./ColorPicker"
import * as Styled from "./styled"

export const App = () => {
  const testRef = useRef<HTMLDivElement>(null)

  const change = (color: string) => {
    testRef.current?.style.setProperty("background", color)
  }

  const changeEnd = (color: string) => {
    testRef.current?.style.setProperty("background", color)
  }

  const colors = ["red", "rgb(98, 98, 245)", "green", "#123456", "#ffcc00"]

  const initialColor = "#123456"

  return (
    <>
      <Styled.GlobalStyles />
      <div className="App">
        <ColorInput
          color={initialColor}
          colorList={colors}
          onChange={change}
          onChangeEnd={changeEnd}
        />
        <div
          ref={testRef}
          style={{
            width: 200,
            height: 200,
            float: "right",
            backgroundColor: initialColor,
          }}
        ></div>
      </div>
    </>
  )
}
