import { FC, memo, useEffect, useRef } from "react"
import { mainColorPointer } from "../util"

type Props = {
  onChange: (hue: number) => void
  onChangeEnd: () => void
}

const ColorRangeComponent: FC<Props> = ({ onChange, onChangeEnd }) => {
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
    <div ref={mainColorRef} className="rangeContainer">
      <div className="background backgroundAll" />
      <div ref={pointerRef} className="pointer" />
    </div>
  )
}

export const ColorRange: FC<Props> = memo(ColorRangeComponent)
