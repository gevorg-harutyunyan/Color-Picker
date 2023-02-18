export type RGBA = {
  r: number
  g: number
  b: number
  a: number
}

export type HSVA = {
  h: number
  s: number
  v: number
  a: number
}

export type Coords = [number, number]

type Limit = {
  top: number
  bottom: number
  left: number
  right: number
}

export type PointerMoveFn = {
  setAreaAndPointer: (areaEl: HTMLDivElement, pointerEl: HTMLDivElement) => void
  getPointerLimit: () => Limit
  getPointerNewCoords: (event: MouseEvent) => Coords
  changePointerX: (X: number) => void
  changePointerCoords: (coords: Coords) => void
  updateCoords: (coefficient: number[]) => void
  updateCoordX: (coefficient: number) => void
  coordsToCoefficient: (coords: Coords) => number[]
  updateAreaBackground: (color: string) => void
  updatePointerColor: (color: string) => void
}
