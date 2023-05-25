import { FC, memo, useCallback, useEffect, useRef, useState } from "react"
import { Picker } from "./ColorPicker"
import "./index.css"

type Props = {
  color?: string
  colorList?: string[]
  onChange?: (color: string) => void
  onChangeEnd?: (color: string) => void
}

const ColorPickerComponent: FC<Props> = ({ color = "#123456", colorList = [], onChange, onChangeEnd }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const closeColorPicker = () => setIsColorPickerOpen(false)
  const toggleColorPicker = () => setIsColorPickerOpen(!isColorPickerOpen)

  const click = () => {
    toggleColorPicker()
  }

  const clickOutside = (e: MouseEvent) => {
    if (isColorPickerOpen && !ref.current?.contains(e.target as Node)) {
      closeColorPicker()
    }
  }

  useEffect(() => {
    ref.current?.style.setProperty("background", color)
  }, [color])

  useEffect(() => {
    isColorPickerOpen && window.addEventListener("mousedown", clickOutside)

    return () => {
      window.removeEventListener("mousedown", clickOutside)
    }
  }, [isColorPickerOpen])

  const change = useCallback((color: string) => {
    ref.current?.style.setProperty("background", color)
    onChange?.(color)
  }, [])

  const changeEnd = useCallback((color: string) => {
    ref.current?.style.setProperty("background", color)
    onChangeEnd?.(color)
  }, [])

  return (
    <div ref={ref} className="colorIcon" onClick={click}>
      {isColorPickerOpen && (
        <Picker initialColor={color} colorList={colorList} onChange={change} onChangeEnd={changeEnd} />
      )}
    </div>
  )
}

export const ColorPicker = memo(ColorPickerComponent)
