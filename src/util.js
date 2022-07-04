const X = 0,
  Y = 1

export const isClickedInElement = (event, id) =>
  event.path.some((elem) => elem.id === id)

export const transformToValue = (number, max) => parseInt((100 / max) * number)

export const transformToX = (opacity, max) => parseInt(opacity / (100 / max))

export const getAlpha = (value) => value / 100

export const getHex = (value) =>
  ("0" + parseInt(value, 10).toString(16)).slice(-2)

export const rgb2hex = (rgb) => {
  rgb = rgb.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  )
  return rgb && rgb.length === 4
    ? getHex(rgb[1]) + getHex(rgb[2]) + getHex(rgb[3])
    : ""
}

export const setBackground = (element, value) => {
  element.style.background = value
}

export const setMainBackground = (element, value) => {
  element.getElementsByClassName("bg-main")[0].style.background = value
}

export const pointerMove = () => {
  let area, pointer

  const setAreaAndPointer = (areaEl, pointerEl) => {
    area = areaEl
    pointer = pointerEl
  }

  const getPointerԼimit = () => {
    const areaRect = area.getBoundingClientRect()
    return {
      top: 0,
      bottom: parseInt(areaRect.height),
      left: 0,
      right: parseInt(areaRect.width),
    }
  }

  const getPointerNewCoords = (event) => {
    const areaBorder = getPointerԼimit()
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

  const changePointerX = (X) => {
    pointer.style.left = X + "px"
  }

  const changePointerY = (Y) => {
    pointer.style.top = Y + "px"
  }

  const changePointerCoords = ([X, Y]) => {
    changePointerX(X)
    changePointerY(Y)
  }

  const updateCoords = (coefficient) => {
    const limit = getPointerԼimit()
    changePointerCoords([
      coefficient[X] * limit.right,
      coefficient[Y] * limit.bottom,
    ])
  }
  const updateCoordX = (coefficient) => {
    const limit = getPointerԼimit()
    changePointerX(coefficient * limit.right)
  }

  const coordsToCoefficient = ([X, Y]) => {
    const areaRect = area.getBoundingClientRect()
    return [X / areaRect.width, Y / areaRect.height]
  }

  const updateAreaBackground = (color) => {
    setMainBackground(area, color)
  }

  const updatePointerColor = (color) => {
    setBackground(pointer, color)
  }

  // setBackground
  // setMainBackground
  return {
    getPointerԼimit,
    getPointerNewCoords,
    changePointerX,
    changePointerCoords,
    updateCoords,
    updateCoordX,
    coordsToCoefficient,
    updateAreaBackground,
    updatePointerColor,
    setAreaAndPointer,
  }
}

export const setTextValue = (element, value) => {
  element.children[0].value = value
}

export const linearGradient = (value) =>
  `linear-gradient(to right,transparent 0%, ${value} 100%)`

export const updateRGB = (RGBA, obj) => {
  RGBA.R = obj.R
  RGBA.G = obj.G
  RGBA.B = obj.B
}

export const HSVAtoRGBA = (hsva) => {
  const saturation = hsva.s / 100
  const value = hsva.v / 100
  let chroma = saturation * value
  let hueBy60 = hsva.h / 60
  let x = chroma * (1 - Math.abs((hueBy60 % 2) - 1))
  let m = value - chroma

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

export const RGBAtoHSVA = (rgba) => {
  const red = rgba.r / 255
  const green = rgba.g / 255
  const blue = rgba.b / 255
  const xmax = Math.max(red, green, blue)
  const xmin = Math.min(red, green, blue)
  const chroma = xmax - xmin
  const value = xmax
  let hue = 0
  let saturation = 0

  if (chroma) {
    if (xmax === red) {
      hue = (green - blue) / chroma
    }
    if (xmax === green) {
      hue = 2 + (blue - red) / chroma
    }
    if (xmax === blue) {
      hue = 4 + (red - green) / chroma
    }
    if (xmax) {
      saturation = chroma / xmax
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

export const RGBAToHex = (rgba) => {
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

export const strToRGBA = (str) => {
  const regex =
    /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i
  let match, rgba

  // Use canvas to convert the string to a valid color string
  const ctx = document.createElement("canvas").getContext("2d")
  ctx.fillStyle = str
  match = regex.exec(ctx.fillStyle)

  if (match) {
    rgba = {
      r: match[3] * 1,
      g: match[4] * 1,
      b: match[5] * 1,
      a: match[6] * 1,
    }

    // Workaround to mitigate a Chromium bug where the alpha value is rounded incorrectly
    rgba.a = +rgba.a.toFixed(2)
  } else {
    match = ctx.fillStyle
      .replace("#", "")
      .match(/.{2}/g)
      .map((h) => parseInt(h, 16))
    rgba = {
      r: match[0],
      g: match[1],
      b: match[2],
      a: 1,
    }
  }

  return rgba
}

export const RGBAToStr = (rgba, isAlpha = true) => {
  if (!isAlpha || rgba.a === 1) {
    return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`
  } else {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
  }
}
