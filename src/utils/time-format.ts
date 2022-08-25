/**
 * Convert timestamp(milliseconds) to readable text
 * @param timestamp Accurate to milliseconds
 */
export const toDateChinese = (timestamp: number) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year} 年 ${month} 月 ${day} 日`
}
