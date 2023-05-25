import { FC, KeyboardEvent, memo, RefObject } from "react"
import { strToRGBA } from "../util"
import { RGBA } from "../types"

type Props = {
  textRef: RefObject<HTMLInputElement>
  onChange: (rgba: RGBA) => void
}

const TextComponent: FC<Props> = ({ textRef, onChange }) => {
  const change = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      const target = e.target as HTMLInputElement
      onChange(strToRGBA(target.value))
    }
  }

  return (
    <div>
      <input ref={textRef} className="textInput" onKeyDown={change} />
    </div>
  )
}

export const Text: FC<Props> = memo(TextComponent)
