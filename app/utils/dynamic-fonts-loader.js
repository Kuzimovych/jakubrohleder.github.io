import FontFaceObserver from 'fontfaceobserver'

export default function loadFonts() {
  const storage = typeof sessionStorage !== 'undefined' ? sessionStorage : {}

  if (storage.fontsLoaded) {
    document.documentElement.classList.add('fonts-loaded')
    console.debug('Fonts loaded from cache')
    return
  }

  const fontFamilies = {
    Lato: [
      {
        weight: 'normal',
      }, {
        weight: 'bold',
      },
    ],
    Bitter: [
      {
        weight: 'bold',
      }, {
        style: 'italic',
      },
    ],
    Monaco: [{}],
  }

  const fontObservers = Object.keys(fontFamilies).map(family =>
    fontFamilies[family].map(config =>
      new FontFaceObserver(family, config).load()
    )
  )

  Promise.all(fontObservers).then(() => {
    document.documentElement.classList.add('fonts-loaded')
    console.debug('Fonts loaded')
    storage.fontsLoaded = true
  }).catch(() => {
    storage.fontsLoaded = false
  })
}
