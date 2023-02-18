import styled, { css } from "styled-components"

export const ColorIcon = styled.div`
  position: absolute;
  border: 1px solid white;
  width: 30px;
  height: 30px;
  background-color: ${({ color }) => color};
`

export const ColorPicker = styled.div`
  left: 30px;
  top: 30px;
  position: absolute;
  width: 310px;
  background-color: white;
`

export const ColorArea = styled.div`
  width: 100%;
  height: 160px;
  position: relative;
`

export const Container = styled.div`
  padding: 20px;
`

export const RangeContainer = styled.div`
  height: 20px;
  margin: 20px auto;
  position: relative;
`

export const Pointer = styled.div<{ area?: boolean }>`
  width: 12px;
  height: 12px;
  position: absolute;
  z-index: 1000;
  background: transparent;
  border: 4px solid white;
  outline: 1px solid grey;
  border-radius: 50%;
  margin-left: -10px;
  margin-top: ${({ area = false }) => (area ? "-10px" : 0)};
`

const backgrounds = {
  white: css`
    background: linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
  `,
  black: css`
    background: linear-gradient(to bottom, transparent 0%, #000 100%);
  `,
  all: css`
    border-radius: 15px;
    background: linear-gradient(
      to right,
      #f00 0%,
      #ff0 16.66%,
      #0f0 33.33%,
      #0ff 50%,
      #00f 66.66%,
      #f0f 83.33%,
      #f00 100%
    );
  `,
  mainGradient: css`
    border-radius: 15px;
  `,
  lattice: css`
    border-radius: 15px;
    background: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  `,
}

type BackgroundType = "white" | "black" | "all" | "mainGradient" | "lattice"

export const Background = styled.div<{ type?: BackgroundType }>`
  position: absolute;
  width: 100%;
  height: 100%;
  ${({ type }) => type && backgrounds[type]}
`

export const TextContainer = styled.div``

export const TextInput = styled.input`
  width: 100%;
  height: 30px;
  font-size: 30px;
  text-align: center;
  padding: 8px 0;
  border: 1px solid #bbb;

  :hover {
  }

  &:focus {
    outline: none;
    border: 1px solid #4da6ff;
  }
`

export const ColorList = styled.div`
  margin-top: 20px;
`

export const ColorListItem = styled.div`
  width: 20px;
  height: 20px;
  margin: 10px;
  border: 1px solid #777;
  border-radius: 3px;
  display: inline-block;
  background-color: ${({ color }) => color};
`
