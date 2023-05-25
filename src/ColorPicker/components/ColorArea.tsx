import { FC, memo, useEffect, useRef } from "react"
import { areaPointer } from "../util"

type Props = {
  onChange: (saturation: number, value: number) => void
  onChangeEnd: () => void
}

const ColorAreaComponent: FC<Props> = ({ onChange, onChangeEnd }) => {
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
    <div ref={areaRef} className="colorArea">
      <div className="background bg-main" />
      <div className="background backgroundWhite" />
      <div className="background backgroundBlack" />
      <div ref={pointerRef} className="pointer pointerArea" />
    </div>
  )
}

export const ColorArea: FC<Props> = memo(ColorAreaComponent)
