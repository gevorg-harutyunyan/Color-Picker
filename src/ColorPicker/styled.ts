import styled, { css } from "styled-components"

export const ColorIcon = styled.div`
  position: absolute;
  border: 1px solid white;
  width: 30px;
  height: 30px;
`

export const ColorPicker = styled.div`
  left: 30px;
  top: 30px;
  position: absolute;
  width: 240px;
  background: #2c2c2c;
  user-select: none;
  box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.45);
`

export const ColorArea = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
`

export const Container = styled.div`
  padding: 20px;
`

export const RangeContainer = styled.div`
  height: 14px;
  margin: 0 auto 20px;
  position: relative;
`

export const Pointer = styled.div<{ area?: boolean }>`
  width: 8px;
  height: 8px;
  position: absolute;
  background: transparent;
  border: 3px solid white;
  outline: 1px solid grey;
  border-radius: 50%;
  margin-left: -6px;
  margin-top: ${({ area = false }) => (area ? "-6px" : 0)};
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
    background: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 10px 10px;
    background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
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
  height: 26px;
  font-size: 26px;
  text-align: center;
  padding: 8px 0;
  border: 1px solid #575757;
  border-radius: 3px;
  outline: none;
  background: transparent;
  color: white;
  cursor: default;

  &:hover {
    border-color: #726d6d;
  }

  &:focus {
    outline: none;
    border: 1px solid #4da6ff;
  }
`

export const ListContainer = styled.div`
  margin: 20px 0 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 13.6px;
`

export const ListItem = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid #777;
  border-radius: 3px;
  display: inline-block;
  background-color: ${({ color }) => color};
`
