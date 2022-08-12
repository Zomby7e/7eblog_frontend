/**
 * Import external JavaScript from web
 * @param src url of the js file
 */
function loadJs (src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    document.body.appendChild(script)

    script.onload = (event) => {
      resolve(event)
    }
    script.onerror = (error) => {
      reject(error)
    }
  })
}

export default loadJs
