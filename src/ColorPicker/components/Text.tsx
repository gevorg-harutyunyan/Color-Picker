import { FC, memo, RefObject } from "react"
import { strToRGBA } from "../util"
import { RGBA } from "../types"
import * as Styled from "../styled"

type Props = {
  textRef: RefObject<HTMLInputElement>
  onChange: (rgba: RGBA) => void
}

export const Text: FC<Props> = memo(({ textRef, onChange }) => {
  const change = (e: any) => {
    if (e.code === "Enter") {
      onChange(strToRGBA(e.target?.value))
    }
  }

  return (
    <Styled.TextContainer>
      <Styled.TextInput ref={textRef} onKeyDown={change} />
    </Styled.TextContainer>
  )
})
