declare module 'image-downloader' {
  export type DownloadOptionsType = {
    url: string
    dest: string
    extractFilename?: boolean
  }
  
  export function image(options: DownloadOptionsType): Promise<void>
}