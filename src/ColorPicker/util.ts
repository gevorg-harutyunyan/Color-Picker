import { Coords, HSVA, RGBA } from "./types"

const X = 0,
  Y = 1

export const transformToValue = (number: number, max: number): number => Math.floor((100 / max) * number)

export const getAlpha = (value: number): number => value / 100

const setBackground = (element: HTMLElement, value: string) => {
  element.style.background = value
}

const setMainBackground = (element: HTMLDivElement, value: string) => {
  const mainEl = element.getElementsByClassName("bg-main")[0] as HTMLDivElement
  mainEl.style.background = value
}

export const createPointer = () => {
  let area: HTMLDivElement, pointer: HTMLDivElement

  const setAreaAndPointer = (areaEl: HTMLDivElement, pointerEl: HTMLDivElement) => {
    area = areaEl
    pointer = pointerEl
  }

  const getPointerLimit = () => {
    const areaRect = area.getBoundingClientRect()
    return {
      top: 0,
      bottom: Math.floor(areaRect.height),
      left: 0,
      right: Math.floor(areaRect.width),
    }
  }

  const getPointerNewCoords = (event: MouseEvent): Coords => {
    const areaBorder = getPointerLimit()
    const { x, y } = area.getBoundingClientRect()
    let X = event.clientX - x
    let Y = event.clientY - y

    if (X < areaBorder.left) {
      X = areaBorder.left
    } else if (X > areaBorder.right) {
      X = areaBorder.right
    }
    if (Y < areaBorder.top) {
      Y = areaBorder.top
    } else if (Y > areaBorder.bottom) {
      Y = areaBorder.bottom
    }

    return [X, Y]
  }

  const changePointerX = (X: number): void => {
    pointer.style.left = X + "px"
  }

  const changePointerY = (Y: number): void => {
    pointer.style.top = Y + "px"
  }

  const changePointerCoords = ([X, Y]: Coords): void => {
    changePointerX(X)
    changePointerY(Y)
  }

  const updateCoords = (coefficient: number[]): void => {
    const limit = getPointerLimit()
    changePointerCoords([coefficient[X] * limit.right, coefficient[Y] * limit.bottom])
  }
  const updateCoordX = (coefficient: number): void => {
    const limit = getPointerLimit()
    changePointerX(coefficient * limit.right)
  }

  const coordsToCoefficient = ([X, Y]: Coords): number[] => {
    const areaRect = area.getBoundingClientRect()
    return [X / areaRect.width, Y / areaRect.height]
  }

  const updateAreaBackground = (color: string): void => {
    setMainBackground(area, color)
  }

  const updatePointerColor = (color: string): void => {
    setBackground(pointer, color)
  }

  return {
    setAreaAndPointer,
    getPointerLimit,
    getPointerNewCoords,
    changePointerX,
    changePointerCoords,
    updateCoords,
    updateCoordX,
    coordsToCoefficient,
    updateAreaBackground,
    updatePointerColor,
  }
}

export const areaPointer = createPointer()
export const mainColorPointer = createPointer()
export const opacityPointer = createPointer()

export const setTextValue = (element: HTMLInputElement | null, value: string) => {
  if (!element) return
  element.value = value
}

const attachAlpha = (value: string, alpha: number) => value.split(")").join(`,${alpha})`)

export const linearGradient = (value: string): string =>
  `linear-gradient(to right, transparent 0%, ${attachAlpha(value, 0.6)} 40%, ${value} 100%)`

export const HSVAtoRGBA = (hsva: HSVA): RGBA => {
  const saturation = hsva.s / 100
  const value = hsva.v / 100
  let chroma = saturation * value
  const hueBy60 = hsva.h / 60
  let x = chroma * (1 - Math.abs((hueBy60 % 2) - 1))
  const m = value - chroma

  chroma = chroma + m
  x = x + m

  const index = Math.floor(hueBy60) % 6
  const red = [chroma, x, m, m, x, chroma][index]
  const green = [x, chroma, chroma, x, m, m][index]
  const blue = [m, m, x, chroma, chroma, x][index]

  return {
    r: Math.round(red * 255),
    g: Math.round(green * 255),
    b: Math.round(blue * 255),
    a: hsva.a,
  }
}

export const RGBAtoHSVA = (rgba: RGBA): HSVA => {
  const red = rgba.r / 255
  const green = rgba.g / 255
  const blue = rgba.b / 255
  const xMax = Math.max(red, green, blue)
  const xMin = Math.min(red, green, blue)
  const chroma = xMax - xMin
  const value = xMax
  let hue = 0
  let saturation = 0

  if (chroma) {
    if (xMax === red) {
      hue = (green - blue) / chroma
    }
    if (xMax === green) {
      hue = 2 + (blue - red) / chroma
    }
    if (xMax === blue) {
      hue = 4 + (red - green) / chroma
    }
    if (xMax) {
      saturation = chroma / xMax
    }
  }

  hue = Math.floor(hue * 60)

  const hsva = {
    h: hue < 0 ? hue + 360 : hue,
    s: Math.round(saturation * 100),
    v: Math.round(value * 100),
    a: rgba.a,
  }
  return hsva
}

export const RGBAToHex = (rgba: RGBA): string => {
  let R = rgba.r.toString(16)
  let G = rgba.g.toString(16)
  let B = rgba.b.toString(16)
  let A = ""

  if (rgba.r < 16) {
    R = "0" + R
  }

  if (rgba.g < 16) {
    G = "0" + G
  }

  if (rgba.b < 16) {
    B = "0" + B
  }

  if (rgba.a < 1) {
    const alpha = (rgba.a * 255) | 0
    A = alpha.toString(16)

    if (alpha < 16) {
      A = "0" + A
    }
  }

  return "#" + R + G + B + A
}

const emptyRGBA = {
  r: 0,
  g: 0,
  b: 0,
  a: 0,
}

export const strToRGBA = (str: string): RGBA => {
  const regex = /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i

  // Use canvas to convert the string to a valid color string
  const ctx = document.createElement("canvas").getContext("2d")
  if (!ctx) return emptyRGBA
  ctx.fillStyle = str
  const match = regex.exec(ctx.fillStyle)

  if (match) {
    return {
      r: Number(match[3]),
      g: Number(match[4]),
      b: Number(match[5]),
      a: Number(Number(match[6]).toFixed(2)),
    }
  }

  const match2 = ctx.fillStyle
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((h) => parseInt(h, 16))

  if (!match2) return emptyRGBA

  return {
    r: match2[0],
    g: match2[1],
    b: match2[2],
    a: 1,
  }
}

export const RGBAToStr = (rgba: RGBA): string =>
  `rgb(${rgba.r}, ${rgba.g}, ${rgba.b}${rgba.a !== 1 ? `, ${rgba.a}` : ""})`
