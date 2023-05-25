import { FC, memo } from "react"
import { strToRGBA } from "../util"
import { RGBA } from "../types"

type Props = {
  colorList: string[]
  onChange: (rgba: RGBA) => void
}

const ColorListComponent: FC<Props> = ({ colorList, onChange }) => {
  const clicked = (color: string) => () => {
    onChange(strToRGBA(color))
  }

  return (
    <div className="listContainer">
      {colorList.map((color, index) => {
        return <div key={index} className="listItem" style={{ backgroundColor: color }} onClick={clicked(color)} />
      })}
    </div>
  )
}

export const ColorList: FC<Props> = memo(ColorListComponent)
