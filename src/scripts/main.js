// JavaScript entry point, loaded as an ES module by the base layout.
// Import your modules and styles from here, e.g.:
//   import { initMenu } from './modules/menu.js'

/**
 * Swap the "no-js" class on <html> for "js" so CSS can target
 * scripted and non-scripted states.
 */
function markJavaScriptEnabled() {
  const documentElement = document.documentElement
  documentElement.classList.replace('no-js', 'js')
}

markJavaScriptEnabled()
