export const hexToRgba = (hex, alpha = 1) => {
  let r = 0
  let g = 0
  let b = 0

  // 3 digits
  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1]
    g = '0x' + hex[2] + hex[2]
    b = '0x' + hex[3] + hex[3]
    // 6 digits
  } else if (hex.length === 7) {
    r = '0x' + hex[1] + hex[2]
    g = '0x' + hex[3] + hex[4]
    b = '0x' + hex[5] + hex[6]
  }

  return `rgba(${+r},${+g},${+b},${alpha})`
}

// 使用示例
// console.log(hexToRgba('#ff5733')) // 输出: "rgba(255,87,51,1)"
// console.log(hexToRgba('#ff5733', 0.5)) // 输出: "rgba(255,87,51,0.5)"

export const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
// console.log(rgbToHex(255, 87, 51)) // 输出: "#ff5733"
