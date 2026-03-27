import katex from 'katex'

export default function FormulaBlock({ formula, display = false }) {
  let html = ''
  try {
    html = katex.renderToString(formula, {
      throwOnError: false,
      displayMode: display,
    })
  } catch (e) {
    html = `<span class="text-red-400">Formula error</span>`
  }

  return (
    <div
      className={`bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto ${display ? 'text-center' : ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
