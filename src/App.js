import { useRef } from "react"
import "./App.css"
import { ColorInput } from "./ColorInput"

function App() {
  const testRef = useRef()
  const change = (color) => {
    testRef.current.style.backgroundColor = color
  }

  const changeEnd = (color) => {
    testRef.current.style.backgroundColor = color
  }

  const colors = ["red", "#6262f5", "green", "cyan", "#123456"]

  const initialColor = "#123456"

  return (
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
  )
}

export default App
