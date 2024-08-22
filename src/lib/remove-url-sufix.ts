export const removeUrlPrefix = (url: string) => {
  return url.replace(/^https?:\/\/(www\.)?/, '')
}
