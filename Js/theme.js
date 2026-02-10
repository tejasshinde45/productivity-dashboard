import { updateFaviconColor } from "./favicon.js"

export function themeChange() {
    const themeBtn = document.querySelector('.theme-btn')
    const root = document.documentElement

    const themes = [
        { pri: '#0E0A14', sec: '#1B132B', tri1: '#3A2A5E', tri2: '#B69CFF' },
        { pri: '#081A1F', sec: '#0F2F36', tri1: '#1E5A66', tri2: '#6FE7F0' },
        { pri: '#1A0B0B', sec: '#2E1414', tri1: '#5C2626', tri2: '#FF8A8A' },
        { pri: '#0D1B12', sec: '#163324', tri1: '#2E6B4E', tri2: '#7CFFB2' },
        { pri: '#1B1409', sec: '#2F2312', tri1: '#5E4420', tri2: '#FFD166' },
        { pri: '#0A101C', sec: '#131F38', tri1: '#253B73', tri2: '#8FB3FF' },
        { pri: '#140A12', sec: '#261425', tri1: '#4F1F4C', tri2: '#FF7AD9' },
        { pri: '#0F0F0F', sec: '#1F1F1F', tri1: '#3A3A3A', tri2: '#FFFFFF' },
        { pri: '#11140A', sec: '#1F2A12', tri1: '#3F5C1F', tri2: '#C7FF6B' },
        { pri: '#0B141A', sec: '#132633', tri1: '#264A66', tri2: '#4DD0FF' }
    ]

    function applyTheme(theme) {
        root.style.setProperty('--pri', theme.pri)
        root.style.setProperty('--sec', theme.sec)
        root.style.setProperty('--tri1', theme.tri1)
        root.style.setProperty('--tri2', theme.tri2)
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
