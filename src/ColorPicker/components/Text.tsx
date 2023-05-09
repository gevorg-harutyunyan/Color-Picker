import { FC, KeyboardEvent, memo, RefObject } from "react"
import { strToRGBA } from "../util"
import { RGBA } from "../types"
import * as Styled from "../styled"

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
    <Styled.TextContainer>
      <Styled.TextInput ref={textRef} onKeyDown={change} />
    </Styled.TextContainer>
  )
}

export const Text: FC<Props> = memo(TextComponent)
