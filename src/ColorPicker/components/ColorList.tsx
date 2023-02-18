import { FC } from "react"
import { strToRGBA } from "../util"
import { RGBA } from "ColorPicker/types"
import * as Styled from "../styled"

type Props = {
  colorList: string[]
  onChange: (rgba: RGBA) => void
}

export const ColorList: FC<Props> = ({ colorList, onChange }) => {
  const clicked = (color: string) => () => {
    onChange(strToRGBA(color))
  }

  return (
    <Styled.ColorList>
      {colorList.map((color, index) => {
        return (
          <Styled.ColorListItem
            key={index}
            color={color}
            onClick={clicked(color)}
          />
        )
      })}
    </Styled.ColorList>
  )
}
