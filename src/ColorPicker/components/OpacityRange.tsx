import { FC, useEffect, useRef } from "react"
import { getAlpha, transformToValue } from "../util"
import { PointerMoveFn } from "ColorPicker/types"
import * as Styled from "../styled"

type Props = {
  opacityPointer: PointerMoveFn
  onChange: (alpha: number) => void
  onChangeEnd: () => void
}

export const OpacityRange: FC<Props> = ({
  opacityPointer,
  onChange,
  onChangeEnd,
}) => {
  const opacityRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef<HTMLDivElement>(null)

  const mouseMove = (e: MouseEvent) => {
    const limit = opacityPointer.getPointerLimit()
    const [X] = opacityPointer.getPointerNewCoords(e)
    opacityPointer.changePointerX(X)
    onChange(getAlpha(transformToValue(X, limit.right)))
  }

  const mouseUp = () => {
    window.removeEventListener("mousemove", mouseMove)
    window.removeEventListener("mouseup", mouseUp)
    onChangeEnd()
  }

  const mouseDown = (e: MouseEvent) => {
    mouseMove(e)
    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseup", mouseUp)
  }

  useEffect(() => {
    if (!opacityRef.current || !pointerRef.current) return
    opacityPointer.setAreaAndPointer(opacityRef.current, pointerRef.current)
    opacityRef.current?.addEventListener("mousedown", mouseDown)
  }, [])

  return (
    <Styled.RangeContainer ref={opacityRef}>
      <Styled.Pointer ref={pointerRef} />
      <Styled.Background type="lattice" />
      <Styled.Background type="mainGradient" className="bg-main" />
    </Styled.RangeContainer>
  )
}
