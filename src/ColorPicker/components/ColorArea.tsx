import { FC, useEffect, useRef } from "react"
import { PointerMoveFn } from "ColorPicker/types"
import * as Styled from "../styled"

type Props = {
  areaPointer: PointerMoveFn
  onChange: (saturation: number, value: number) => void
  onChangeEnd: () => void
}

export const ColorArea: FC<Props> = ({
  areaPointer,
  onChange,
  onChangeEnd,
}) => {
  const areaRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef<HTMLDivElement>(null)

  const mouseMove = (e: MouseEvent) => {
    const coords = areaPointer.getPointerNewCoords(e)
    areaPointer.changePointerCoords(coords)
    const [xCoefficient, yCoefficient] = areaPointer.coordsToCoefficient(coords)
    const Saturation = Math.round(xCoefficient * 100)
    const Value = 100 - Math.round(yCoefficient * 100)
    onChange(Saturation, Value)
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
    if (!areaRef.current || !pointerRef.current) return
    areaPointer.setAreaAndPointer(areaRef.current, pointerRef.current)
    areaRef.current?.addEventListener("mousedown", mouseDown)
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
