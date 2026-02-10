export function updateFaviconColor(color) {
    const favicon = document.getElementById('favicon')
    if (!favicon) return

    let resolvedColor = color
    if (!resolvedColor) {
        resolvedColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--tri1')
            .trim() || '#000'
    }

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="${resolvedColor}"/>
      <rect x="28" y="30" width="44" height="8" rx="4" fill="#000"/>
      <rect x="28" y="46" width="44" height="8" rx="4" fill="#000"/>
      <rect x="28" y="62" width="30" height="8" rx="4" fill="#000"/>
    </svg>
    `
    favicon.href = 'data:image/svg+xml,' + encodeURIComponent(svg)
}
