"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

type CommandOutput = {
  command: string
  output: string | React.ReactNode
}

const BOOT_SEQUENCE = [
  "[SYSTEM] Initializing secure connection...",
  "[KERNEL] Loading core modules... [OK]",
  "[MEMORY] Allocating 2048MB RAM... [OK]",
  "[DISK] Mounting encrypted file systems... [OK]",
  "[NET] Establishing network protocols... [OK]",
  "[AUTH] Verifying credentials... [OK]",
  "[GPU] Initializing graphics pipeline... [OK]",
  "[USER] Loading profile data... [OK]",
  "[TERM] Starting terminal interface... [OK]",
  "",
  "[SYSTEM] All systems operational.",
  "[ACCESS] Welcome, user.",
  "",
]

const COMMANDS = {
  help: `Available commands:
  
  about       - Learn more about me
  skills      - View my technical skills
  experience  - See my work experience
  projects    - Browse my projects
  contact     - Get in touch
  clear       - Clear the terminal
  help        - Show this help message`,

  about: `Hi, I'm a Full Stack Developer passionate about building elegant web applications.

I specialize in React, Next.js, TypeScript, and modern web technologies. 
I love creating intuitive user experiences and solving complex problems with clean, maintainable code.

When I'm not coding, you can find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee.`,

  skills: `Technical Skills:

Frontend:
  • React / Next.js
  • TypeScript / JavaScript
  • Tailwind CSS
  • HTML5 / CSS3

Backend:
  • Node.js
  • PostgreSQL / MongoDB
  • REST APIs / GraphQL
  • Serverless Functions

Tools & Others:
  • Git / GitHub
  • Docker
  • Vercel / AWS
  • CI/CD`,

  experience: `Work Experience:

Senior Frontend Developer @ TechCorp
2022 - Present
  • Led development of customer-facing dashboard using Next.js and TypeScript
  • Improved page load times by 40% through optimization techniques
  • Mentored junior developers and conducted code reviews

Full Stack Developer @ StartupXYZ
2020 - 2022
  • Built and maintained multiple client projects using React and Node.js
  • Implemented authentication and payment systems
  • Collaborated with designers to create pixel-perfect UIs

Junior Developer @ WebAgency
2019 - 2020
  • Developed responsive websites for various clients
  • Learned modern web development practices
  • Contributed to internal tooling and documentation`,

  projects: `Featured Projects:

1. E-Commerce Platform
   A full-stack e-commerce solution with Stripe integration
   Tech: Next.js, PostgreSQL, Stripe, Tailwind CSS
   
2. Task Management App
   Real-time collaborative task manager
   Tech: React, Firebase, TypeScript
   
3. Portfolio Generator
   CLI tool to generate developer portfolios
   Tech: Node.js, Inquirer, EJS
   
4. Weather Dashboard
   Beautiful weather app with forecasts
   Tech: Next.js, OpenWeather API, Recharts`,

  contact: `Let's Connect!

Email: your.email@example.com
GitHub: github.com/yourusername
LinkedIn: linkedin.com/in/yourusername
Twitter: @yourusername

Feel free to reach out for collaborations, opportunities, or just to say hi!`,
}

export default function Terminal() {
  const [isBooting, setIsBooting] = useState(true)
  const [bootMessages, setBootMessages] = useState<string[]>([])
  const [history, setHistory] = useState<CommandOutput[]>([])
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isGlitching, setIsGlitching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let currentIndex = 0
    const bootInterval = setInterval(() => {
      if (currentIndex < BOOT_SEQUENCE.length) {
        setBootMessages((prev) => [...prev, BOOT_SEQUENCE[currentIndex]])
        currentIndex++
      } else {
        clearInterval(bootInterval)
        setTimeout(() => {
          setIsBooting(false)
          setHistory([
            {
              command: "",
              output: (
                <div className="space-y-2">
                  <div className="text-primary font-bold text-lg glitch-text">
                    &gt;&gt; PORTFOLIO TERMINAL v2.0.1 &lt;&lt;
                  </div>
                  <div className="text-muted-foreground">
                    Type <span className="text-accent">&apos;help&apos;</span> to see available commands
                  </div>
                  <div className="text-muted-foreground text-xs">
                    [System Status: <span className="text-primary">ONLINE</span>]
                  </div>
                </div>
              ),
            },
          ])
        }, 200)
      }
    }, 50)

    return () => clearInterval(bootInterval)
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, bootMessages])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (trimmedCmd === "") return

    let output: string | React.ReactNode = ""

    if (trimmedCmd === "clear") {
      setIsGlitching(true)
      setTimeout(() => {
        setHistory([])
        setIsGlitching(false)
      }, 150)
      return
    }

    if (trimmedCmd in COMMANDS) {
      output = COMMANDS[trimmedCmd as keyof typeof COMMANDS]
    } else {
      output = (
        <div>
          <span className="text-destructive glitch-text">ERROR:</span> Command not found:{" "}
          <span className="text-destructive">{trimmedCmd}</span>
          <br />
          Type <span className="text-accent">&apos;help&apos;</span> for available commands
        </div>
      )
    }

    setHistory((prev) => [...prev, { command: cmd, output }])
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  return (
    <Card className="w-full max-w-4xl h-[600px] bg-card border-border shadow-2xl overflow-hidden flex flex-col scanline">
      <div className="bg-secondary border-b border-border px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive terminal-flicker" />
          <div className="w-3 h-3 rounded-full bg-muted" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <div className="text-sm text-primary ml-4 font-mono">root@portfolio:~#</div>
      </div>

      <div
        ref={terminalRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm ${isGlitching ? "glitch" : ""}`}
        onClick={() => !isBooting && inputRef.current?.focus()}
      >
        {isBooting ? (
          <div className="space-y-1">
            {bootMessages.map((message, index) => (
              <div key={index} className={`text-primary ${index % 3 === 0 ? "glitch-text" : ""}`}>
                {message}
              </div>
            ))}
            <div className="text-primary animate-pulse glitch-text">▊</div>
          </div>
        ) : (
          <>
            {history.map((item, index) => (
              <div key={index} className="space-y-2">
                {item.command && (
                  <div className="flex gap-2">
                    <span className="text-primary">$</span>
                    <span className="text-foreground">{item.command}</span>
                  </div>
                )}
                <div className="text-muted-foreground whitespace-pre-wrap pl-4">{item.output}</div>
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <span className="text-primary">$</span>
              <div className="flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-foreground caret-transparent"
                  autoFocus
                  spellCheck={false}
                />
                <span className="text-foreground">{input}</span>
                <span className="text-primary cursor-blink ml-0.5">█</span>
              </div>
            </form>
          </>
        )}
      </div>
    </Card>
  )
}
