const path = require('path')
const fs = require('fs')
const childProcess = require('child_process')

/**
 * @param dir 文件夹地址
 */
function getFilePath (dir) {
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
 * @param {Array} files 数组
 */
function walkerFiles (filepathList) {
  filepathList.forEach((filePath) => {
    childProcess.exec(`node ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.log(error.stack)
        console.log('Error code: ' + error.code)
        console.log('Signal received: ' + error.signal)
      }
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
    })
  })
}

const fileDirPath = path.resolve(__dirname, 'files')

getFilePath(fileDirPath)
  .then((filepathList) => {
    walkerFiles(filepathList)
  })
