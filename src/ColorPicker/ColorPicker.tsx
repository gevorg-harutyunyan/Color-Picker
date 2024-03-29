import { FC, useCallback, useEffect, useRef } from "react"
import { ColorRange } from "./components/ColorRange"
import { OpacityRange } from "./components/OpacityRange"
import { ColorArea } from "./components/ColorArea"
import { Text } from "./components/Text"
import { ColorList } from "./components/ColorList"
import {
  linearGradient,
  strToRGBA,
  RGBAToStr,
  RGBAToHex,
  RGBAtoHSVA,
  HSVAtoRGBA,
  setTextValue,
  areaPointer,
  mainColorPointer,
  opacityPointer,
} from "./util"
import { HSVA, RGBA } from "./types"

type Props = {
  initialColor: string
  colorList: string[]
  onChange: (color: string) => void
  onChangeEnd: (color: string) => void
}

export const Picker: FC<Props> = ({ initialColor, colorList, onChange, onChangeEnd }) => {
  const textRef = useRef<HTMLInputElement>(null)

  let HSVA: HSVA = {
    h: 0,
    s: 0,
    v: 0,
    a: 1,
  }
  let RGBA: RGBA = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  }

  useEffect(() => {
    RGBA = strToRGBA(initialColor)
    HSVA = RGBAtoHSVA(RGBA)
    update()
  }, [])

  const dispatch = () => {
    setTextValue(textRef.current, RGBAToHex(RGBA))
    onChange(RGBAToHex(RGBA))
  }

  const updatePointerColors = () => {
    const color = RGBAToStr(HSVAtoRGBA(HSVA))
    const hueColor = `hsl(${HSVA.h}, 100%, 50%)`
    areaPointer.updatePointerColor(color)
    areaPointer.updateAreaBackground(hueColor)
    mainColorPointer.updatePointerColor(hueColor)
    opacityPointer.updateAreaBackground(linearGradient(color))
  }

  const updatePointerCoords = () => {
    areaPointer.updateCoords([HSVA.s / 100, (100 - HSVA.v) / 100])
    mainColorPointer.updateCoordX(HSVA.h / 360)
    opacityPointer.updateCoordX(HSVA.a)
  }

  const update = () => {
    updatePointerColors()
    updatePointerCoords()
    setTextValue(textRef.current, RGBAToHex(RGBA))
  }

  const changeArea = useCallback((saturation: number, value: number) => {
    HSVA.s = saturation
    HSVA.v = value
    RGBA = HSVAtoRGBA(HSVA)
    updatePointerColors()
    dispatch()
  }, [])

  const changeMainColor = useCallback((hue: number) => {
    HSVA.h = hue
    RGBA = HSVAtoRGBA(HSVA)
    updatePointerColors()
    dispatch()
  }, [])

  const changeOpacity = useCallback((opacity: number) => {
    HSVA.a = opacity
    RGBA.a = opacity
    dispatch()
  }, [])

  const changeColor = useCallback((rgba: RGBA) => {
    RGBA = rgba
    HSVA = RGBAtoHSVA(rgba)
    update()
    const color = RGBAToHex(RGBA)
    onChange(color)
    onChangeEnd(color)
  }, [])

  const changeEnd = useCallback(() => {
    onChangeEnd(RGBAToHex(RGBA))
  }, [])

  return (
    <div className="colorPicker" onClick={(e) => e.stopPropagation()}>
      <ColorArea onChange={changeArea} onChangeEnd={changeEnd} />
      <div className="container">
        <ColorRange onChange={changeMainColor} onChangeEnd={changeEnd} />
        <OpacityRange onChange={changeOpacity} onChangeEnd={changeEnd} />
        <Text textRef={textRef} onChange={changeColor} />
        <ColorList colorList={colorList} onChange={changeColor} />
      </div>
    </div>
  )
}
