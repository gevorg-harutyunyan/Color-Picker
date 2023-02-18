import { FC, useEffect, useRef } from "react"
import { PointerMoveFn } from "ColorPicker/types"
import * as Styled from "../styled"

type Props = {
  mainColorPointer: PointerMoveFn
  onChange: (hue: number) => void
  onChangeEnd: () => void
}

export const ColorRange: FC<Props> = ({
  mainColorPointer,
  onChange,
  onChangeEnd,
}) => {
  const mainColorRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef<HTMLDivElement>(null)

  const mouseMove = (e: MouseEvent) => {
    const limit = mainColorPointer.getPointerLimit()
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

  const mouseDown = (e: MouseEvent) => {
    mouseMove(e)
    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseup", mouseUp)
  }

  useEffect(() => {
    if (!mainColorRef.current || !pointerRef.current) return
    mainColorPointer.setAreaAndPointer(mainColorRef.current, pointerRef.current)
    mainColorRef.current?.addEventListener("mousedown", mouseDown)
  }, [])

  return (
    <Styled.RangeContainer ref={mainColorRef}>
      <Styled.Pointer ref={pointerRef} />
      <Styled.Background type="all" />
    </Styled.RangeContainer>
  )
}
