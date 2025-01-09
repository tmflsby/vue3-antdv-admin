// 32位 uuid
export const uuid32 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 16位 uuid
export const uuid16 = () => {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => {
    const r = (Math.random() * 16) | 0
    return r.toString(16)
  })
}

// 8位 uuid
export const uuid8 = () => {
  return 'xxxx-xxxx'.replace(/[x]/g, () => {
    const r = (Math.random() * 16) | 0
    return r.toString(16)
  })
}

/**
 * digitNum 位数  8 16 32
 * caseType  1 小写  2 大写
 * lineType  1 有横线  2 无横线
 * */
export const uuid = (digitNum = 32, caseType = 1, lineType = 1) => {
  let uuid = ''
  if (digitNum === 8) {
    uuid = uuid8()
  } else if (digitNum === 16) {
    uuid = uuid16()
  } else {
    uuid = uuid32()
  }
  if (caseType === 2) {
    uuid = uuid.toUpperCase()
  }
  if (lineType === 2) {
    uuid = uuid.replace(/-/g, '')
  }
  return uuid
}
