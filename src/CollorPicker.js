import { useEffect } from "react"
import * as Styled from "./styled"
import { ColorRange } from "./ColorRange"
import { OpacityRange } from "./OpacityRange"
import {
  isClickedInElement,
  linearGradient,
  pointerMove,
  strToRGBA,
  RGBAToStr,
  RGBAToHex,
  RGBAtoHSVA,
  HSVAtoRGBA,
  setTextValue,
} from "./util"
import { useRef } from "react"
import { ColorArea } from "./ColorArea"
import { Text } from "./Text"
import { ColorList } from "./ColorList"

export const ColorPicker = ({
  initialColor,
  colorList,
  closeColorPicker,
  onChange,
  onChangeEnd,
}) => {
  const textRef = useRef()

  const areaPointer = pointerMove()
  const mainColorPointer = pointerMove()
  const opacityPointer = pointerMove()

  let HSVA = {
    h: 0,
    s: 0,
    v: 0,
    a: 1,
  }
  let RGBA = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  }

  useEffect(() => {
    window.addEventListener("mousedown", function click(e) {
      !isClickedInElement(e, "ColorPicker") && closeColorPicker()
    })
    RGBA = strToRGBA(initialColor)
    HSVA = RGBAtoHSVA(RGBA)
    update()
  }, [])

  const dispatch = () => {
    setTextValue(textRef.current, RGBAToHex(RGBA))
    onChange(RGBAToHex(RGBA))
  }

  const updatePointerColors = () => {
    const color = RGBAToStr(HSVAtoRGBA(HSVA), false)
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

  const changeArea = (saturation, value) => {
    HSVA.s = saturation
    HSVA.v = value
    RGBA = HSVAtoRGBA(HSVA)
    updatePointerColors()
    dispatch()
  }

  const changeMainColor = (hue) => {
    HSVA.h = hue
    RGBA = HSVAtoRGBA(HSVA)
    updatePointerColors()
    dispatch()
  }

  const changeOpacity = (opacity) => {
    HSVA.a = opacity
    RGBA.a = opacity
    dispatch()
  }

  const changeColor = (rgba) => {
    RGBA = rgba
    HSVA = RGBAtoHSVA(rgba)
    update()
    onChangeEnd(RGBAToHex(RGBA))
  }

  const changeEnd = () => {
    onChangeEnd(RGBAToHex(RGBA))
  }

  return (
    <Styled.ColorPicker id="ColorPicker">
      <ColorArea
        areaPointer={areaPointer}
        onChange={changeArea}
        onChangeEnd={changeEnd}
      />
      <Styled.Container>
        <ColorRange
          mainColorPointer={mainColorPointer}
          onChange={changeMainColor}
          onChangeEnd={changeEnd}
        />
        <OpacityRange
          opacityPointer={opacityPointer}
          onChange={changeOpacity}
          onChangeEnd={changeEnd}
        />
        <Text
          textRef={textRef}
          onChange={changeColor}
          onChangeEnd={changeEnd}
        />
        <ColorList colorList={colorList} onChange={changeColor} />
      </Styled.Container>
    </Styled.ColorPicker>
  )
}
