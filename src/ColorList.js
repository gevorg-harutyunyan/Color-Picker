import * as Styled from "./styled"
import { RGBAtoHSVA, strToRGBA } from "./util"

export const ColorList = ({ colorList, onChange }) => {
  const clicked = (e) => {
    const index = parseInt(e.target.id)
    onChange(strToRGBA(colorList[index]))
  }

  return (
    <Styled.ColorList>
      {colorList.map((color, index) => {
        return (
          <Styled.ColorListItem
            key={index}
            id={`${index}-Color List Item`}
            color={color}
            onClick={clicked}
          />
        )
      })}
    </Styled.ColorList>
  )
}
