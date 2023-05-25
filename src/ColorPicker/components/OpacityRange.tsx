import { FC, memo, useEffect, useRef } from "react"
import { getAlpha, opacityPointer, transformToValue } from "../util"

type Props = {
  onChange: (alpha: number) => void
  onChangeEnd: () => void
}

const OpacityRangeComponent: FC<Props> = ({ onChange, onChangeEnd }) => {
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
    <div ref={opacityRef} className="rangeContainer">
      <div className="background backgroundLattice" />
      <div className="background backgroundMainGradient bg-main" />
      <div ref={pointerRef} className="pointer" />
    </div>
  )
}

export const OpacityRange: FC<Props> = memo(OpacityRangeComponent)
