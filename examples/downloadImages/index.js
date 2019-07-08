const request = require('request')
const fs = require('fs')

const filePath = 'https://w.wallhaven.cc/full/96/wallhaven-968d2x.jpg'

/**
 * 下载图片
 * @param {String} dir 下载地址
 * @param {String} imgName 图片名称
 */
function downloadImage (dir, imgName) {
  request(dir)
    .pipe(fs.createWriteStream(imgName))
    .on('errer', (err) => {
      console.log(err)
    })
    .on('finish', () => {
      console.log('结束')
    })
}

downloadImage(filePath, 'download.png')
