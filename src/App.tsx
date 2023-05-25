import { useMemo, useRef, useState } from "react"
import { ColorPicker } from "./ColorPicker"

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
    <div className="App">
      <ColorPicker color={color} colorList={colors} onChange={change} onChangeEnd={changeEnd} />
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
  )
}
