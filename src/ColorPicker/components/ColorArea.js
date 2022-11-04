import { useEffect, useRef } from "react"
import * as Styled from "../styled"

export const ColorArea = ({ areaPointer, onChange, onChangeEnd }) => {
  const areaRef = useRef()
  const pointerRef = useRef()
  const mouseMove = (e) => {
    const coords = areaPointer.getPointerNewCoords(e)
    areaPointer.changePointerCoords(coords)
    const [X, Y] = areaPointer.coordsToCoefficient(coords)
    const Saturation = Math.round(X * 100)
    const Value = 100 - Math.round(Y * 100)
    onChange(Saturation, Value)
  }

  const mouseUp = () => {
    window.removeEventListener("mousemove", mouseMove)
    window.removeEventListener("mouseup", mouseUp)
    onChangeEnd()
  }

  const mouseDown = (e) => {
    mouseMove(e)
    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseup", mouseUp)
  }

  useEffect(() => {
    areaPointer.setAreaAndPointer(areaRef.current, pointerRef.current)
    areaRef.current.addEventListener("mousedown", mouseDown)
  }, [])

  return (
    <Styled.ColorArea ref={areaRef}>
      <Styled.Pointer area ref={pointerRef} />
      <Styled.Background className="bg-main" />
      <Styled.Background type="white" />
      <Styled.Background type="black" />
    </Styled.ColorArea>
  )
}
