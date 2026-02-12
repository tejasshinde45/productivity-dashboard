import { updateFaviconColor } from "./favicon.js"

export function themeChange() {
    const themeBtn = document.querySelector('.theme-btn')
    const root = document.documentElement

    const themes = [
        { pri: '#0F172A', sec: '#1E293B', tri1: '#334155', tri2: '#93C5FD', quoteHue: '210deg', quoteSaturation: '0.95' },
        { pri: '#111827', sec: '#1F2937', tri1: '#374151', tri2: '#60A5FA', quoteHue: '205deg', quoteSaturation: '1' },
        { pri: '#0B1320', sec: '#132235', tri1: '#1E3A4B', tri2: '#5FA8D3', quoteHue: '190deg', quoteSaturation: '1.05' },
        { pri: '#0E1A16', sec: '#1A2B24', tri1: '#2B453A', tri2: '#84BFA2', quoteHue: '120deg', quoteSaturation: '0.95' },
        { pri: '#1A1114', sec: '#2A1A1F', tri1: '#4A2B33', tri2: '#C59AA5', quoteHue: '340deg', quoteSaturation: '0.9' },
        { pri: '#171717', sec: '#262626', tri1: '#404040', tri2: '#B8B8B8', quoteHue: '0deg', quoteSaturation: '0.2' },
        { pri: '#0E1628', sec: '#1B2840', tri1: '#2D3E63', tri2: '#D1B77A', quoteHue: '40deg', quoteSaturation: '0.85' },
        { pri: '#14182A', sec: '#222A45', tri1: '#36406B', tri2: '#AAB7E8', quoteHue: '230deg', quoteSaturation: '0.95' },
        { pri: '#10202B', sec: '#1B303E', tri1: '#2F4B5C', tri2: '#9CC3D5', quoteHue: '200deg', quoteSaturation: '0.95' },
        { pri: '#121417', sec: '#20252B', tri1: '#343B45', tri2: '#DDE4EE', quoteHue: '0deg', quoteSaturation: '0.1' }
    ]

    function applyTheme(theme) {
        root.style.setProperty('--pri', theme.pri)
        root.style.setProperty('--sec', theme.sec)
        root.style.setProperty('--tri1', theme.tri1)
        root.style.setProperty('--tri2', theme.tri2)
        root.style.setProperty('--quote-hue', theme.quoteHue)
        root.style.setProperty('--quote-saturation', theme.quoteSaturation)
        updateFaviconColor(theme.tri2)
    }

    let currentTheme = 0
    const savedThemeIndex = Number(localStorage.getItem('themeIndex'))
    if (!Number.isNaN(savedThemeIndex) && themes[savedThemeIndex]) {
        currentTheme = savedThemeIndex
        applyTheme(themes[currentTheme])
    }

    themeBtn.addEventListener('click', () => {
        const t = themes[currentTheme]
        applyTheme(t)
        localStorage.setItem('themeIndex', String(currentTheme))

        currentTheme = (currentTheme + 1) % themes.length
    })
}
