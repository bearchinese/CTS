import React, { useState } from 'react'
import './style.css'

type Role = 'student' | 'teacher' | 'system'
type Msg = { role: Role; text: string }

function Bubble({ role, text }: Msg) {
  const cls = 'bubble ' + (role === 'teacher' ? 'teacher' : role === 'system' ? 'system' : 'student')
  return <div className={cls}>{text}</div>
}

export default function App() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [thread, setThread] = useState<Msg[]>([
    { role: 'student', text: '老師，我在圖表題第 3 題卡住，如何找「最適合的班次」？' }
  ])

  async function submitQuestion(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setSubmitting(true)
    setThread(t => [...t, { role: 'student', text: `【提問】${title}\n${body}` }])
    await new Promise(r => setTimeout(r, 600))
    setThread(t => [...t, { role: 'system', text: '（系統）示範解析：先列出「已知條件」與「目標」，再用排除法過濾不符合的選項，剩下者比對到站時間與轉乘次數。' }])
    setTitle(''); setBody(''); setSubmitting(false)
  }

  return (
    <div className="wrap">
      <header className="nav">
        <div className="brand">語文小行星 · 互動解析教室</div>
      </header>

      <main className="container">
        <section className="card">
          <h1>發問 / 解題</h1>
          <form onSubmit={submitQuestion} className="form">
            <input className="input" placeholder="題目標題" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea className="textarea" placeholder="貼上題幹重點、你的想法或卡關處…" value={body} onChange={e=>setBody(e.target.value)} />
            <button className="btn" disabled={submitting}>{submitting ? '送出中…' : '送出提問'}</button>
          </form>
          <div className="chat">
            {thread.map((m,i)=>(<Bubble key={i} {...m} />))}
          </div>
        </section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} 語文小行星</footer>
    </div>
  )
}
