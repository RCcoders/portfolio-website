'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type Role = 'system' | 'user' | 'assistant'
type Message = {
  id: string
  role: Role
  content: React.ReactNode | string
  rawText?: string // For sending to API
}

type AskTerminalProps = {
  onClose?: () => void
}

const BOOT_LINES = [
  '> Initializing Raghav Chawla agent...',
  '> Loading knowledge base...',
  '> 47 facts indexed across 8 categories',
  '> Full Stack Dev · AI/ML · Projects · Experience',
  '> Agent ready. Ask anything (type "clear" or click [clear] to reset).',
  '──────────────────────────────────────────────'
]

const SUGGESTED_CHIPS = [
  "What's your strongest project?",
  "Are you open to remote work?",
  "What tech stack do you use?",
  "Tell me about a hard bug"
]

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

export default function AskTerminal({ onClose }: AskTerminalProps) {
  const [bootStep, setBootStep] = useState(0)
  const [isBooting, setIsBooting] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [spinnerFrame, setSpinnerFrame] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Track session storage count
  useEffect(() => {
    const count = parseInt(sessionStorage.getItem('ask_raghav_count') || '0', 10)
    setQuestionCount(count)
  }, [])

  // Boot sequence
  useEffect(() => {
    if (bootStep < BOOT_LINES.length) {
      const timer = setTimeout(() => {
        setBootStep(prev => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setIsBooting(false)
    }
  }, [bootStep])

  // Spinner animation
  useEffect(() => {
    if (!isStreaming) return
    const timer = setInterval(() => {
      setSpinnerFrame(prev => (prev + 1) % SPINNER_FRAMES.length)
    }, 80)
    return () => clearInterval(timer)
  }, [isStreaming])

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, bootStep, isStreaming, inputValue])

  // Focus input on click anywhere
  const handleContainerClick = () => {
    if (!isStreaming && !isBooting) {
      inputRef.current?.focus()
    }
  }

  const handleCommand = (cmd: string): boolean => {
    const c = cmd.toLowerCase().trim()
    if (c === 'clear') {
      setMessages([])
      return true
    }
    if (c === 'help') {
      addSystemMessage(
        <div className="flex flex-col gap-1">
          <div>&gt; Available commands:</div>
          <div>  help     - Show this menu</div>
          <div>  clear    - Clear terminal history</div>
          <div>  projects - List Raghav&apos;s projects</div>
          <div>  contact  - Show contact info</div>
          <div>  resume   - Get resume link</div>
          <div>  stack    - Show tech stack</div>
          <div className="mt-2">&gt; Or click a suggested question below:</div>
          <div className="flex flex-col gap-2 mt-2">
            {SUGGESTED_CHIPS.map(chip => (
              <button 
                key={chip} 
                onClick={(e) => { e.stopPropagation(); submitQuestion(chip) }}
                className="text-left w-fit px-2 py-1 border border-[#1e1e1e] rounded-[4px] text-[#666] hover:border-accent hover:text-accent transition-colors"
              >
                [ {chip} ]
              </button>
            ))}
          </div>
        </div>
      )
      return true
    }
    if (c === 'projects') {
      addSystemMessage(
        <div className="whitespace-pre-wrap">
{`> Notable Projects:
1. AI Code Assistant (Python, React, OpenAI API)
2. E-Commerce Platform (Next.js, Prisma, PostgreSQL)
3. Predictive Maintenance Model (PyTorch, FastApi)
Type "Tell me about project X" for more details.`}
        </div>
      )
      return true
    }
    if (c === 'contact') {
      addSystemMessage(
        <div className="whitespace-pre-wrap">
{`> Contact Info:
Email:    chawlaraghav78@gmail.com
LinkedIn: https://www.linkedin.com/in/raghav-chawla-29255b275/
GitHub:   https://github.com/RCcoders`}
        </div>
      )
      return true
    }
    if (c === 'resume') {
      addSystemMessage(
        <div>
          &gt; Download available at <Link href="/about" className="text-accent underline hover:text-white transition-colors">raghavchawla.com/about</Link>
        </div>
      )
      return true
    }
    if (c === 'stack') {
      addSystemMessage(
        <div className="whitespace-pre-wrap">
{`> Tech Stack:
Frontend: React, Next.js, Vue, Tailwind CSS, TypeScript
Backend:  Node.js, Python, FastAPI, Express
Database: PostgreSQL, Prisma, Supabase
DevOps:   Docker, Git, Bash, Vercel`}
        </div>
      )
      return true
    }
    return false
  }

  const addSystemMessage = (content: React.ReactNode) => {
    setMessages(prev => {
      const newMsgs: Message[] = [...prev, { id: Date.now().toString(), role: 'system' as Role, content }]
      return newMsgs.slice(-20) // keep last 20 (including system and user pairs)
    })
  }

  const submitQuestion = async (text: string) => {
    if (!text.trim() || isStreaming) return
    setInputValue('')
    
    // Add User message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, rawText: text }
    
    setMessages(prev => {
      const newMsgs = [...prev, userMsg]
      return newMsgs.slice(-20) // maintain max history
    })
    
    // Check local commands first
    if (handleCommand(text)) {
      return
    }

    // Rate limiting
    if (questionCount >= 20) {
      addSystemMessage('> Session limit reached. Contact Raghav directly at chawlaraghav78@gmail.com')
      return
    }

    setQuestionCount(prev => {
      const newVal = prev + 1
      sessionStorage.setItem('ask_raghav_count', newVal.toString())
      return newVal
    })

    setIsStreaming(true)

    const responseId = (Date.now() + 1).toString()
    setMessages(prev => [...prev, { id: responseId, role: 'assistant', content: '> ', rawText: '' }])

    try {
      // Build API messages from history
      const apiMessages = messages
        .filter(m => m.rawText && (m.role === 'user' || m.role === 'assistant'))
        .concat(userMsg)
        .map(m => ({ role: m.role, content: m.rawText }))

      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || 'Unable to reach the agent.')
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let done = false
      let fullText = ''

      while (reader && !done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk
        
        setMessages(prev => prev.map(msg => 
          msg.id === responseId 
            ? { ...msg, content: '> ' + fullText, rawText: fullText } 
            : msg
        ))
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Error: Unable to reach the agent. Please try again.';
      setMessages(prev => prev.map(msg => 
        msg.id === responseId 
          ? { ...msg, content: `> [${errMsg}]` } 
          : msg
      ))
    } finally {
      setIsStreaming(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitQuestion(inputValue)
    }
  }

  return (
    <div 
      className="w-full max-w-[860px] mx-auto bg-[#0a0a0a] rounded-lg border border-neutral-900 overflow-hidden shadow-2xl flex flex-col font-mono text-sm md:text-base text-[#aaaaaa]"
      style={{ height: 'min(600px, 80vh)' }}
      onClick={handleContainerClick}
    >
      {/* Terminal Chrome Header */}
      <div className="bg-[#111] px-4 py-3 flex items-center justify-between border-b border-neutral-900 select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose?.() }} 
              className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
              aria-label="Close terminal"
            />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-[12px] text-[#555] tracking-widest font-bold">
            raghav@portfolio: ~/ask
          </div>
        </div>

        <div className="flex items-center gap-3">
          {messages.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setMessages([]); setTimeout(() => inputRef.current?.focus(), 50) }}
              className="text-[11px] text-neutral-400 hover:text-accent font-mono px-2 py-0.5 rounded border border-neutral-800 hover:border-accent/40 transition-colors"
              title="Clear terminal chat history (or type 'clear')"
            >
              [clear]
            </button>
          )}
          {onClose ? (
            <button 
              onClick={(e) => { e.stopPropagation(); onClose() }}
              className="text-xs text-neutral-500 hover:text-white font-mono px-2 py-0.5 rounded hover:bg-neutral-800 transition-colors"
            >
              [✕]
            </button>
          ) : null}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide flex flex-col gap-4">
        {/* Boot Sequence */}
        <div className="flex flex-col gap-1">
          {BOOT_LINES.slice(0, bootStep).map((line, i) => (
            <div key={i} className={i === BOOT_LINES.length - 1 ? 'text-[#333]' : 'text-[#888]'}>
              {line}
            </div>
          ))}
        </div>

        {/* Suggested Chips */}
        {!isBooting && messages.length === 0 && (
          <div className="flex flex-wrap gap-3 mt-2 animate-in fade-in duration-500">
            {SUGGESTED_CHIPS.map(chip => (
              <button 
                key={chip} 
                onClick={(e) => { e.stopPropagation(); submitQuestion(chip) }}
                className="px-3 py-1.5 border border-[#1e1e1e] rounded-[4px] text-[12px] text-[#666] hover:border-accent hover:text-accent transition-colors"
              >
                [ {chip} ]
              </button>
            ))}
          </div>
        )}

        {/* Message History */}
        {messages.map(msg => (
          <div key={msg.id} className="flex flex-col gap-1">
            {msg.role === 'user' ? (
              <div className="text-white">
                <span className="text-[#555] mr-2">raghav@portfolio:~$</span>
                {msg.content}
              </div>
            ) : (
              <div className="text-[#aaa] whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </div>
            )}
          </div>
        ))}

        {/* Input Line */}
        {!isBooting && (
          <div className="flex items-center text-white mt-2 pb-8">
            <span className="text-[#555] mr-2 flex-shrink-0">
              raghav@portfolio:~$
            </span>
            {isStreaming ? (
              <div className="flex items-center text-accent">
                <span className="mr-2">Processing...</span>
                <span>{SPINNER_FRAMES[spinnerFrame]}</span>
              </div>
            ) : (
              <div className="relative flex-1 flex items-center">
                <span className="text-neutral-500 mr-2">[</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-neutral-700 font-mono focus:ring-0 p-0 m-0"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
                <span className="text-neutral-500 ml-2">] ↵</span>
                
                {/* Custom Blinking Cursor Effect if empty */}
                {inputValue === '' && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#444] animate-pulse pointer-events-none"></span>
                )}
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
