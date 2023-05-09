import { useMemo, useRef, useState } from "react"
import { ColorInput } from "./ColorPicker"
import * as Styled from "./styled"

export const App = () => {
  const [color, setColor] = useState<string>("#123456")
  const testRef = useRef<HTMLDivElement>(null)

  const change = (color: string) => {
    testRef.current?.style.setProperty("background", color)
  }

  const changeEnd = (color: string) => {
    setColor(color)
  }

  const colors = useMemo(() => ["red", "rgb(98, 98, 245)", "green", "#123456", "#ffcc00"], [])

  return (
    <>
      <Styled.GlobalStyles />
      <div className="App">
        <ColorInput color={color} colorList={colors} onChange={change} onChangeEnd={changeEnd} />
        <div
          ref={testRef}
          style={{
            width: 200,
            height: 200,
            float: "right",
            backgroundColor: color,
          }}
        ></div>
      </div>
    </>
  )
}
