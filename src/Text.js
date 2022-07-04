import * as Styled from "./styled"
import { strToRGBA } from "./util"

export const Text = ({ textRef, onChange }) => {
  const change = (e) => {
    if (e.code === "Enter") {
      onChange(strToRGBA(e.target.value))
    }
  }

  return (
    <Styled.TextContainer ref={textRef}>
      <Styled.TextInput contentEditable={true} onKeyDown={change} />
    </Styled.TextContainer>
  )
}
