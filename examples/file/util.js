const fs = require('fs')
const path = require('path')

/**
 * @param {string} dir 文件夹地址
 * @return {Array} 返回文件夹路径列表
 */
export function getDirAllFilePath (dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.log(err)
        return reject(err)
      }

      files = files.map((fileName) => {
        return path.resolve(dir, fileName)
      })

      return resolve(files)
    })
  })
}

/**
 * 遍历文件路径列表，并且执行回调函数
 * @param {Array} files 数组
 * @param {Function} callback 回调函数，传入当前文件路径
 */
export function walkerFiles (filepathList, callback) {
  filepathList.forEach((filePath) => {
    callback(filePath)
  })
}
