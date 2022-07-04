import { useEffect, useRef } from "react"
import * as Styled from "./styled"

export const ColorRange = ({ mainColorPointer, onChange, onChangeEnd }) => {
  const mainColorRef = useRef()
  const pointerRef = useRef()
  const mouseMove = (e) => {
    const limit = mainColorPointer.getPointerԼimit()
    const [X] = mainColorPointer.getPointerNewCoords(e)
    mainColorPointer.changePointerX(X)
    const hue = Math.round((X / limit.right) * 360)
    onChange(hue)
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
    mainColorPointer.setAreaAndPointer(mainColorRef.current, pointerRef.current)
    mainColorRef.current.addEventListener("mousedown", mouseDown)
  }, [])

  return (
    <Styled.RangeContainer ref={mainColorRef}>
      <Styled.Pointer ref={pointerRef} />
      <Styled.BgAll />
    </Styled.RangeContainer>
  )
}
