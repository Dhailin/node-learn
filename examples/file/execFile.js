const path = require('path')
const childProcess = require('child_process')
const { getDirAllFilePath, walkerFiles } = require('./util')
const fileDirPath = path.resolve(__dirname, 'files')

/**
 * 执行JS文件
 * @param {String} filePath 文件路径
 */
function execJsFile (filePath) {
  childProcess.exec(`node ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.log(error.stack)
      console.log('Error code: ' + error.code)
      console.log('Signal received: ' + error.signal)
    }
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + stderr)
  })
}

// 先获取文件夹路径，然后遍历文件，对每一个文件做处理
getDirAllFilePath(fileDirPath)
  .then((pathList) => {
    walkerFiles(pathList, execJsFile)
  })
