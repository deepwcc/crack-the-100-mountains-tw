function renderMarkdown(text) {
  if (!text) return ''
  const lines = text.split('\n')
  const result = lines.map(line => {
    if (line.startsWith('## ')) {
      return `<h2 class="text-lg font-bold text-cyan-400 mt-4 mb-2">${line.slice(3)}</h2>`
    }
    if (line.startsWith('# ')) {
      return `<h1 class="text-xl font-bold text-cyan-300 mt-4 mb-2">${line.slice(2)}</h1>`
    }
    if (line.startsWith('- ')) {
      return `<li class="ml-4 list-disc text-gray-300">${line.slice(2)}</li>`
    }
    if (line.trim() === '') {
      return '<br />'
    }
    return `<p class="text-gray-300">${line}</p>`
  })
  return result.join('\n')
}

export default function LessonsLearned({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Lessons Learned</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400">Edit (Markdown)</label>
          <textarea
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            rows={10}
            placeholder="## Lessons Learned&#10;- Write your notes here..."
            className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl p-3 text-sm font-mono resize-none focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400">Preview</label>
          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-sm min-h-[200px] prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        </div>
      </div>
    </div>
  )
}
