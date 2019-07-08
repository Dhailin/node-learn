const request = require('request')
const fs = require('fs')
const path = require('path')

const filePath = 'https://w.wallhaven.cc/full/96/wallhaven-968d2x.jpg'

/**
 * 下载图片
 * @param {String} imgUrl 下载地址
 * @param {String} imgName 图片名称
 */
function downloadImage (imgUrl, imgName) {
  const downloadImageDir = path.resolve(__dirname, 'images')

  mkdir(downloadImageDir)
    .then(() => {
      console.log('开始下载')
      imgName = path.resolve(downloadImageDir, imgName)

      request(imgUrl)
        .pipe(fs.createWriteStream(imgName))
        .on('errer', (err) => {
          console.log(err)
        })
        .on('finish', () => {
          console.log('下载结束')
        })
    })
}

/**
 * 查询是否存在该文件夹
 * @param {String} dir 文件夹路径
 */
function isExistDir (dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err) => {
      if (err) {
        console.log(`不存在该${dir}文件夹`)
        resolve(false)
      }

      resolve(true)
    })
  })
}

/**
 *  创建文件夹
 * @param {String} 文件夹路径
 */
function mkdir (dir) {
  return new Promise((resolve, reject) => {
    isExistDir(dir)
      .then((isExist) => {
        // 如果存在直接返回
        if (isExist) {
          return resolve()
        }

        // 创建文件
        console.log('开始创建该文件夹')
        fs.mkdir(dir, (err) => {
          if (err) {
            reject(err)
            throw err
          }
          console.log('文件夹创建成功')
          resolve()
        })
      })
  })
}

downloadImage(filePath, 'download.png')
