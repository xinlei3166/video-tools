import { ipcMain, shell, dialog } from 'electron'
import { customAlphabet } from 'nanoid'
import path from 'path'
import os from 'os'

import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
// @ts-ignore
import { path as ffprobePath } from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath.replace('app.asar', 'app.asar.unpacked'))
ffmpeg.setFfprobePath(ffprobePath.replace('app.asar', 'app.asar.unpacked'))

import { promisify } from 'util'
import { exec as _exec } from 'child_process'
const exec = promisify(_exec)

async function convertM3u8ToMp4(m3u8Url: string) {
  const { stdout, stderr } = await exec('ls -al', { timeout: 30000 })
  return stdout
}

const win = global && (global as any).win

export function initEvent() {
  ipcMain.on('alert', (event, params) => {
    const options = typeof params === 'object' ? params : { type: 'info', message: params }
    dialog.showMessageBox(options)
  })
}

export function initHandler() {
  ipcMain.handle('m3u8-mp4', (event, params) => {
    return new Promise(async resolve => {
      const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      const nanoid = customAlphabet(alphabet, 12)
      const arr = params.split('/')
      const filename = nanoid().toLowerCase() + '-' + arr[arr.length - 1].replace(/.m3u8/, '.mp4')
      const filepath = path.join(os.homedir(), 'Downloads', filename)
      ffmpeg(params)
        .on('end', function () {
          resolve(filepath)
        })
        .save(filepath)
    })
  })

  ipcMain.handle('showMessageBox', (event, params) => {
    const options = typeof params === 'object' ? params : { type: 'info', message: params }
    dialog.showMessageBox(options)
  })

  ipcMain.handle('showItemInFolder', (event, params) => {
    shell.showItemInFolder(params)
  })
}
