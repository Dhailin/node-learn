const Path = require('path')
const fs = require('fs')
const childProcess = require('child_process')

/**
 * @param {string} dir 文件夹地址
 */
function getFilePath (dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.log(err)
        return reject(err)
      }

      files = files.map((fileName) => {
        return Path.resolve(dir, fileName)
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

function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err)
        throw err
      }

      console.log('open', data)
    })
  })
}

// 文件夹路径
const fileDirPath = Path.resolve(__dirname, 'files')

// getFilePath(fileDirPath)
//   .then((filepathList) => {
//     walkerFiles(filepathList)
//   })

readFile(Path.resolve(fileDirPath, 'a.js'))
