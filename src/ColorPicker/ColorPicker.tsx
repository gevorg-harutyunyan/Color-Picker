import { FC, useEffect, useRef } from "react"
import { ColorRange } from "./components/ColorRange"
import { OpacityRange } from "./components/OpacityRange"
import { ColorArea } from "./components/ColorArea"
import { Text } from "./components/Text"
import { ColorList } from "./components/ColorList"
import {
  linearGradient,
  pointerMove,
  strToRGBA,
  RGBAToStr,
  RGBAToHex,
  RGBAtoHSVA,
  HSVAtoRGBA,
  setTextValue,
} from "./util"
import { RGBA } from "./types"
import * as Styled from "./styled"

type Props = {
  initialColor: string
  colorList: string[]
  onChange: (color: string) => void
  onChangeEnd: (color: string) => void
}

export const ColorPicker: FC<Props> = ({
  initialColor,
  colorList,
  onChange,
  onChangeEnd,
}) => {
  const textRef = useRef<HTMLDivElement>(null)

  const areaPointer = pointerMove()
  const mainColorPointer = pointerMove()
  const opacityPointer = pointerMove()

  let HSVA = {
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

  const changeArea = (saturation: number, value: number) => {
    HSVA.s = saturation
    HSVA.v = value
    RGBA = HSVAtoRGBA(HSVA)
    updatePointerColors()
    dispatch()
  }

  const changeMainColor = (hue: number) => {
    HSVA.h = hue
    RGBA = HSVAtoRGBA(HSVA)
    updatePointerColors()
    dispatch()
  }

  const changeOpacity = (opacity: number) => {
    HSVA.a = opacity
    RGBA.a = opacity
    dispatch()
  }

  const changeColor = (rgba: RGBA) => {
    RGBA = rgba
    HSVA = RGBAtoHSVA(rgba)
    update()
    onChangeEnd(RGBAToHex(RGBA))
  }

  const changeEnd = () => {
    onChangeEnd(RGBAToHex(RGBA))
  }

  return (
    <Styled.ColorPicker
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
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
        <Text textRef={textRef} onChange={changeColor} />
        <ColorList colorList={colorList} onChange={changeColor} />
      </Styled.Container>
    </Styled.ColorPicker>
  )
}
