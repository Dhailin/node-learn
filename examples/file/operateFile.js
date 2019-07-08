const fs = require('fs')
const path = require('path')

/**
 * 读取文件内容，文件内容类型为UTF-8
 * @param {String} file 文件路径
 */
function readFile (file) {
  fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err

    console.log(data)
  })
}

/**
 * 写入文件内容，文件内容类型为UTF-8
 * @param {String} file 文件路径
 * @param {String} data 待写入的文件数据
 * @param {String} flag 文件写入模式
 */
function writeFile (file, data, flag) {
  switch (flag) {
    // 如果存在该文件，则覆盖。
    case 'rewrite':
      flag = 'w'
      break
    // 打开文件，追加内容，不存在则创建文件
    case 'append':
    default:
      flag = 'a'
      break
  }

  fs.writeFile(file, data, { encoding: 'utf-8', flag }, (err) => {
    if (err) throw err
  })
}

const textPath = path.resolve(__dirname, './files/text.txt')

// 读取文件
readFile(textPath)
// 写入文件
writeFile(textPath, '\n新写入内容', 'append')
// 查看文件是否被改写
readFile(textPath)
