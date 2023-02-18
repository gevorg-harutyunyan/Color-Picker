import { FC, RefObject } from "react"
import { strToRGBA } from "../util"
import { RGBA } from "ColorPicker/types"
import * as Styled from "../styled"

type Props = {
  textRef: RefObject<HTMLDivElement> | null | undefined
  onChange: (rgba: RGBA) => void
}

export const Text: FC<Props> = ({ textRef, onChange }) => {
  const change = (e: any) => {
    if (e.code === "Enter") {
      onChange(strToRGBA(e.target?.value))
    }
  }

  return (
    <Styled.TextContainer ref={textRef}>
      <Styled.TextInput onKeyDown={change} />
    </Styled.TextContainer>
  )
}
