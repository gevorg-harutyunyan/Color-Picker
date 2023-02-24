import { FC, memo } from "react"
import { strToRGBA } from "../util"
import { RGBA } from "../types"
import * as Styled from "../styled"

type Props = {
  colorList: string[]
  onChange: (rgba: RGBA) => void
}

export const ColorList: FC<Props> = memo(({ colorList, onChange }) => {
  const clicked = (color: string) => () => {
    onChange(strToRGBA(color))
  }

  return (
    <Styled.ListContainer>
      {colorList.map((color, index) => {
        return (
          <Styled.ListItem key={index} color={color} onClick={clicked(color)} />
        )
      })}
    </Styled.ListContainer>
  )
})
