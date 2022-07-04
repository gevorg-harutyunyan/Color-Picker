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

  const colors = ["red", "blue", "green", "cyan", "#123456"]

  return (
    <div className="App">
      <div
        style={{
          position: "absolute",
          left: "0px",
        }}
      >
        <ColorInput
          color={"#123456"}
          colorList={colors}
          onChange={change}
          onChangeEnd={changeEnd}
        />
      </div>
      <div
        ref={testRef}
        style={{
          width: 200,
          height: 200,
          float: "right",
          backgroundColor: "#123456",
        }}
      ></div>
    </div>
  )
}

export default App
