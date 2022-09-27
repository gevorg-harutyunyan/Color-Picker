import { useEffect, useRef, useState } from "react"
import * as Styled from "./styled"
import { ColorPicker } from "./CollorPicker"

export const ColorInput = ({ color, colorList, onChange, onChangeEnd }) => {
  const ref = useRef()
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const closeColorPicker = () => setIsColorPickerOpen(false)
  const toggleColorPicker = () => setIsColorPickerOpen(!isColorPickerOpen)

  const click = (e) => {
    toggleColorPicker()
  }

  const clickOutside = (e) => {
    if (isColorPickerOpen && !ref.current.contains(e.target)) {
      closeColorPicker()
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", clickOutside)

    return () => {
      window.removeEventListener("mousedown", clickOutside)
    }
  }, [isColorPickerOpen])

  const change = (color) => {
    ref.current.style.backgroundColor = color
    onChange(color)
  }

  const changeEnd = (color) => {
    ref.current.style.backgroundColor = color
    onChangeEnd(color)
  }

  return (
    <Styled.ColorIcon ref={ref} color={color} onClick={click}>
      {isColorPickerOpen && (
        <ColorPicker
          initialColor={color}
          colorList={colorList}
          onChange={change}
          onChangeEnd={changeEnd}
        />
      )}
    </Styled.ColorIcon>
  )
}
