import * as Styled from "./styled"
import { strToRGBA } from "./util"

export const ColorList = ({ colorList, onChange }) => {
  const clicked = (index) => () => {
    onChange(strToRGBA(colorList[index]))
  }

  return (
    <Styled.ColorList>
      {colorList.map((color, index) => {
        return (
          <Styled.ColorListItem
            key={index}
            color={color}
            onClick={clicked(index)}
          />
        )
      })}
    </Styled.ColorList>
  )
}
