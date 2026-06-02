import { useEffect } from "react"

export function useFavicon(iconUrl: string, themeColor?: string) {
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = iconUrl
    link.type = 'image/svg+xml'

    if (!themeColor) return

    const meta = document.querySelector("meta[name='theme-color']")
    if (meta) {
      const oldColor = meta.getAttribute("content")
      meta.setAttribute("content", themeColor)
      return () => {
        if (oldColor) meta.setAttribute("content", oldColor)
      }
    } else {
      const newMeta = document.createElement('meta')
      newMeta.name = 'theme-color'
      newMeta.content = themeColor
      document.head.appendChild(newMeta)
      return () => {
        document.head.removeChild(newMeta)
      }
    }
  }, [iconUrl, themeColor])
}
