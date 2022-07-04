import { useEffect, useRef } from "react"
import * as Styled from "./styled"
import { getAlpha, transformToValue, transformToX } from "./util"

export const OpacityRange = ({ opacityPointer, onChange, onChangeEnd }) => {
  const opacityRef = useRef()
  const pointerRef = useRef()
  const mouseMove = (e) => {
    const limit = opacityPointer.getPointerԼimit()
    const [X] = opacityPointer.getPointerNewCoords(e)
    opacityPointer.changePointerX(X)
    onChange(getAlpha(transformToValue(X, limit.right)))
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
    opacityPointer.setAreaAndPointer(opacityRef.current, pointerRef.current)
    opacityRef.current.addEventListener("mousedown", mouseDown)
  }, [])

  return (
    <Styled.RangeContainer ref={opacityRef}>
      <Styled.Pointer ref={pointerRef} />
      <Styled.BgLattice />
      <Styled.BgMainGradient color="red" className="bg-main" />
    </Styled.RangeContainer>
  )
}
