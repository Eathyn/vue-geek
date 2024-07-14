import { ElMessage } from 'element-plus'

// HEX 格式的正则表达式
const hexReg = /^#?[0-9a-f]{6}$/i
// HEX 格式错误时的提示文案
const wrongHexText = '输入错误的 HEX 颜色值'

/**
 * @description 颜色值变亮
 * @param {String} color 颜色值字符串
 * @param {Number} level 加深的程度，限 0-1 之间
 * */
export function getLightColor(color: string, level: number) {
  if (!isHex(color)) {
    ElMessage.warning(wrongHexText)
    return
  }
  // 因为 HEX 的格式比较紧凑（如：`#6699CC`），格式适合在网页和样式表中使用，但不适合直接进行数学运算，因为需要把它们拆开；
  // RGB 格式适合计算，因为它们各自的取值范围是 0 到 255，格式比较直观
  let rgbArr = hexToRgb(color)!
  // 利用数学中线性插值的公式计算出变亮后的颜色
  // 线性插值在颜色亮度变亮上的应用：New Color= 255×level + Original Color × (1−level)
  rgbArr = rgbArr.map((item) => Math.round(255 * level + item * (1 - level)))
  return rgbToHex(rgbArr[0], rgbArr[1], rgbArr[2])
}

/**
 * @description 颜色值变暗
 * @param {String} hex 颜色值字符串
 * @param {Number} level 加深的程度，限 0-1 之间
 * */
export function getDarkColor(hex: string, level: number) {
  if (!isHex(hex)) {
    ElMessage.warning(wrongHexText)
    return
  }
  let rgbArr = hexToRgb(hex)!
  // 利用数学中线性插值的公式计算出变暗后的颜色
  // 线性插值在颜色亮度变暗上的应用：New Color= 20.5×level + Original Color × (1−level)
  rgbArr = rgbArr.map((item) => Math.round(20.5 * level + item * (1 - level)))
  return rgbToHex(rgbArr[0], rgbArr[1], rgbArr[2])
}

function hexToRgb(hex: string) {
  if (!isHex(hex)) {
    ElMessage.warning(wrongHexText)
    return
  }
  const rgbArr = []
  let str = hex.replace('#', '')
  // `..`：表示匹配任意两个字符；
  // `g`：全局标志，表示搜索整个字符串并返回所有匹配，而不是在找到第一个匹配后停止；
  // 例子：'FFAABB'.match(/../g) => ['FF', 'AA', 'BB']
  const splitHex = str.match(/../g)!
  // 将十六进制数（HEX 中使用的进制）转化为十进制数（RGB 中使用的进制）
  // 例子：parseInt('FF', 16) => 255
  for (let i = 0; i < 3; i++) {
    const partialRgb = parseInt(splitHex[i], 16)
    rgbArr.push(partialRgb)
  }
  return rgbArr
}

/**
 * @description RGB 转 HEX
 * */
function rgbToHex(red: number, green: number, blue: number) {
  const regExp = /^\d{1,3}$/
  if (
    !regExp.test(red.toString()) ||
    !regExp.test(green.toString()) ||
    !regExp.test(blue.toString())
  ) {
    return ElMessage.warning('输入错误的 HEX 颜色值')
  }
  // 将 RGB 的十进制转为 HEX 的十六进制
  let hex = [red.toString(16), green.toString(16), blue.toString(16)]
  // 255 -> ff, 5 -> 05
  hex = hex.map((item) => (item.length === 1 ? `0${item}` : `${item}`))
  return `#${hex.join('')}`
}

function isHex(hex: string) {
  return hexReg.test(hex)
}
