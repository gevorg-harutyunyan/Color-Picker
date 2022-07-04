import { useEffect, useRef, useState } from "react"
import * as Styled from "./styled"
import { ColorPicker } from "./CollorPicker"

export const ColorInput = ({ color, colorList, onChange, onChangeEnd }) => {
  const ref = useRef()
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const openColorPicker = () => setIsColorPickerOpen(true)
  const closeColorPicker = () => setIsColorPickerOpen(false)
  const toggleColorPicker = () => setIsColorPickerOpen(!isColorPickerOpen)

  const click = () => {
    openColorPicker()
  }

  useEffect(() => {
    ref.current.addEventListener("click", click)
    return () => {
      ref.current.removeEventListener("click", click)
    }
  }, [])

  const change = (color) => {
    ref.current.style.backgroundColor = color
    onChange(color)
  }

  const changeEnd = (color) => {
    ref.current.style.backgroundColor = color
    onChangeEnd(color)
  }

  return (
    <Styled.ColorIcon ref={ref} color={color}>
      {isColorPickerOpen && (
        <ColorPicker
          initialColor={color}
          colorList={colorList}
          closeColorPicker={closeColorPicker}
          onChange={change}
          onChangeEnd={changeEnd}
        />
      )}
    </Styled.ColorIcon>
  )
}
