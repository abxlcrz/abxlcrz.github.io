"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

type CommandOutput = {
  command: string;
  output: string | React.ReactNode;
};

type BatchContent = {
  type: "batch";
  content: string[];
};

interface BatchLoaderProps {
  content: string[];
}

const BatchLoader: React.FC<BatchLoaderProps> = ({ content }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const batchInterval = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedLines((prev) => [...prev, content[currentIndex]]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(batchInterval);
      }
    }, 200); // Adjust speed here (200ms between lines)

    return () => clearInterval(batchInterval);
  }, [content]);

  return (
    <div className="space-y-1">
      {displayedLines.map((line, index) => (
        <div key={index} className="text-muted-foreground min-h-5">
          {line || '\u00A0'}
        </div>
      ))}
      {!isComplete && <div className="text-primary animate-pulse">▊</div>}
    </div>
  );
}

const BOOT_SEQUENCE = [
  "[SYSTEM] Initializing secure connection...",
  "[KERNEL] Loading core modules... [OK]",
  "[MEMORY] Allocating 2048MB RAM... [OK]",
  "[DISK] Mounting encrypted file systems... [OK]",
  "[NETWORK] Establishing network protocols... [OK]",
  "[AUTH] Verifying credentials... [OK]",
  "[GPU] Initializing graphics pipeline... [OK]",
  "[USER] Loading profile data... [OK]",
  "[TERM] Starting terminal interface... [OK]",
  "",
  "[SYSTEM] All systems operational.",
  "[ACCESS] Welcome, user.",
  "",
];

// AI Chat function to detect prompts and generate responses
const isPromptLike = (input: string): boolean => {
  const promptIndicators = [
    'what', 'how', 'why', 'can you', 'could you', 'would you', 'do you',
    'explain', 'tell me', 'describe', 'help me', 'generate', 'create',
    'write', 'make', 'build', 'show me', 'give me', 'teach me'
  ];
  
  const lowerInput = input.toLowerCase();
  return promptIndicators.some(indicator => lowerInput.includes(indicator)) && 
         input.length > 10 && 
         input.includes(' ');
};

const generateAIResponse = (prompt: string): BatchContent => {
  // Simple rule-based responses based on keywords using batch loader
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('backend') || lowerPrompt.includes('server') || lowerPrompt.includes('api')) {
    return {
      type: "batch",
      content: [
        "🤖 AI Assistant:",
        "",
        "Based on my experience as a Backend Engineer, I can help with backend architecture, API design, microservices, and cloud infrastructure.",
        "",
        "I've worked with TypeScript, Golang, AWS, and Kubernetes in fintech environments.",
        "",
        "What specific backend challenge are you facing?"
      ]
    };
  }
  
  if (lowerPrompt.includes('fintech') || lowerPrompt.includes('finance') || lowerPrompt.includes('payment')) {
    return {
      type: "batch",
      content: [
        "🤖 AI Assistant:",
        "",
        "I have extensive fintech experience working at Pomelo and Naranja X.",
        "",
        "My focus areas include:",
        "• Card issuance systems", 
        "• KYC governmental validation",
        "• Payment infrastructure",
        "• Regulatory compliance",
        "• Loans and payments",
        "",
        "I've built scalable systems that handle financial transactions and meet regulatory standards.",
        "",
        "How can I help with your fintech project?"
      ]
    };
  }
  
  if (lowerPrompt.includes('career') || lowerPrompt.includes('job') || lowerPrompt.includes('advice')) {
    return {
      type: "batch",
      content: [
        "🤖 AI Assistant:",
        "",
        "As a Backend Engineer with 4+ years in fintech, here's what I've learned:",
        "",
        "Key principles:",
        "• Focus on product impact and user value",
        "• Understand business requirements deeply",
        "• Build scalable architecture from day one",
        "• Always consider regulatory compliance in fintech",
        "",
        "My journey: Naranja X → Pomelo → Founding Engineer at stealth startup",
        "",
        "What career aspect interests you?"
      ]
    };
  }
  
  if (lowerPrompt.includes('startup') || lowerPrompt.includes('founding') || lowerPrompt.includes('entrepreneur')) {
    return {
      type: "batch",
      content: [
        "🤖 AI Assistant:",
        "",
        "Currently working as a Founding Engineer at a stealth EdTech startup.",
        "",
        "Key lessons from startup experience:",
        "• Start with modular monolith for rapid iteration",
        "• Use Infrastructure as Code (IaC) for reliability", 
        "• Align technical decisions with product strategy",
        "• MVP development should focus on core user value",
        "",
        "The experience involves wearing multiple hats - from AWS infrastructure setup to product development.",
        "",
        "What startup challenge can I help with?"
      ]
    };
  }
  
  // Generic response for other prompts
  return {
    type: "batch",
    content: [
      "🤖 AI Assistant:",
      "",
      "I'm Abel's AI assistant! I can chat about:",
      "",
      "Technical topics:",
      "• Backend engineering & architecture",
      "• Fintech systems & payments", 
      "• Startup & product development",
      "• AWS & cloud infrastructure",
      "",
      "I have context about Abel's 4+ years in backend development and fintech.",
      "",
      "Try asking about specific technical topics or career advice!"
    ]
  };
};

const COMMANDS: Record<string, string | React.ReactNode | BatchContent> = {
  help: `Available commands:
  
  about       - Learn more about me
  skills      - View my technical skills
  experience  - See my work experience
  projects    - Browse my projects
  contact     - Get in touch
  clear       - Clear the terminal
  help        - Show this help message
  
  💡 AI Chat: Ask me anything! Just type a question or prompt
     Examples: "How do you design scalable APIs?"
              "Tell me about fintech architecture"
              "What's your experience with startups?"`,

  about: {
    type: "batch",
    content: [
      "I'm a product-minded Backend Engineer with over 4 years of experience in backend development, mainly with Typescript, Golang, AWS, Kubernetes, and other infrastructure tools.",
      "",
      "Currently open to being part of fintech startups, focused on the end-user and product value.",
    ],
  },

  skills: {
    type: "batch",
    content: [
      "Technical Skills:",
      "",
      "Frontend:",
      "  • React / Next.js",
      "  • TypeScript / JavaScript",
      "  • Tailwind CSS",
      "  • HTML5 / CSS3",
      "",
      "Backend:",
      "  • Node.js",
      "  • PostgreSQL / MongoDB",
      "  • REST APIs / GraphQL",
      "  • Serverless Functions",
      "",
      "Tools & Others:",
      "  • Git / GitHub",
      "  • Docker",
      "  • Vercel / AWS",
      "  • CI/CD",
    ],
  },

  experience: {
    type: "batch",
    content: [
      "Work Experience:",
      "",
      "Founding Engineer",
      "Stealth Startup | Aug 2024 - Jun 2025",
      "  • Collaborated with founding team to design innovative EdTech marketplace",
      "  • Aligned product strategy with user needs and market requirements", 
      "  • Implemented secure and scalable AWS infrastructure using IaC",
      "  • Developed scalable modular monolith MVP for rapid iteration",
      "",
      "Backend Engineer", 
      "Pomelo | Jun 2022 - Dec 2023",
      "Buenos Aires, Argentina",
      "  • Enhanced card issuance through SDK with product team collaboration",
      "  • Designed microservice orchestrator for automated client infrastructure setup",
      "  • Boosted NPS and reduced client integration time by 75%",
      "  • Created self-service integration app with sandbox environment",
      "",
      "Backend Engineer",
      "Naranja X | Oct 2021 - May 2022", 
      "CABA, Argentina",
      "  • Led KYC governmental data validation increasing successful onboarding by 30%",
      "  • Implemented scalable microservices with AWS Step Functions and circuit breakers",
      "  • Worked with AI face recognition and PII data security",
      "  • Helped company comply with financial institution regulatory standards",
    ]
  },

  contact: (
    <div className="space-y-3">
      <div className="space-y-2">
        <div>
          Email:{" "}
          <a
            href="mailto:abxlcrz@gmail.com"
            className="text-accent hover:text-primary underline decoration-dotted transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            abxlcrz@gmail.com
          </a>
        </div>
        <div>
          GitHub:{" "}
          <a
            href="https://github.com/abxlcrz"
            className="text-accent hover:text-primary underline decoration-dotted transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/abxlcrz
          </a>
        </div>
        <div>
          LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/abelcruzm"
            className="text-accent hover:text-primary underline decoration-dotted transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/abelcruzm
          </a>
        </div>
        <div>
          Twitter:{" "}
          <a
            href="https://twitter.com/abxlcrz"
            className="text-accent hover:text-primary underline decoration-dotted transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            @abxlcrz
          </a>
        </div>
      </div>
      <div className="mt-4 text-muted-foreground">Lets talk</div>
    </div>
  ),
};

export default function Terminal() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isGlitching, setIsGlitching] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    const bootInterval = setInterval(() => {
      if (currentIndex < BOOT_SEQUENCE.length) {
        setBootMessages((prev) => [...prev, BOOT_SEQUENCE[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => {
          setIsBooting(false);
          setHistory([
            {
              command: "",
              output: (
                <div className="space-y-2">
                  <div className="text-primary font-bold text-lg glitch-text">
                    &gt;&gt; portfolio.sh &lt;&lt;
                  </div>
                  <div className="text-muted-foreground">
                    Type <span className="text-accent">&apos;help&apos;</span>{" "}
                    to see available commands
                  </div>
                </div>
              ),
            },
          ]);
        }, 200);
      }
    }, 50);

    return () => clearInterval(bootInterval);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "") return;

    let output: string | React.ReactNode = "";

    if (trimmedCmd === "clear") {
      setIsGlitching(true);
      setTimeout(() => {
        setHistory([]);
        setIsGlitching(false);
      }, 150);
      return;
    }

    if (trimmedCmd in COMMANDS) {
      const commandOutput = COMMANDS[trimmedCmd as keyof typeof COMMANDS];
      if (
        commandOutput &&
        typeof commandOutput === "object" &&
        "type" in commandOutput &&
        commandOutput.type === "batch"
      ) {
        output = (
          <BatchLoader content={(commandOutput as BatchContent).content} />
        );
      } else {
        output = commandOutput as string | React.ReactNode;
      }
    } else if (isPromptLike(cmd)) {
      // AI Chat functionality - respond to prompt-like inputs with batch loader
      const aiResponse = generateAIResponse(cmd);
      output = <BatchLoader content={aiResponse.content} />;
    } else {
      output = (
        <div>
          <span className="text-destructive glitch-text">ERROR:</span> Command
          not found: <span className="text-destructive">{trimmedCmd}</span>
          <br />
          Type <span className="text-accent">&apos;help&apos;</span> for
          available commands or ask me a question!
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  // Update cursor position when input changes
  useEffect(() => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  }, [input]);

  const updateCursorPosition = () => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(commandHistory[newIndex].length, commandHistory[newIndex].length);
            setCursorPosition(commandHistory[newIndex].length);
          }
        }, 0);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
          setCursorPosition(0);
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.setSelectionRange(commandHistory[newIndex].length, commandHistory[newIndex].length);
              setCursorPosition(commandHistory[newIndex].length);
            }
          }, 0);
        }
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Home" || e.key === "End") {
      // Let the default behavior happen, then update cursor position
      setTimeout(updateCursorPosition, 0);
    }
  };

  return (
    <Card className="w-full max-w-4xl h-[600px] bg-card border-border shadow-2xl overflow-hidden flex flex-col scanline">
      <div className="bg-secondary border-b border-border px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive terminal-flicker" />
          <div className="w-3 h-3 rounded-full bg-muted" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <div className="text-sm text-primary ml-4 font-mono">
          abxlcrz@portfolio:~#
        </div>
      </div>

      <div
        ref={terminalRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm ${
          isGlitching ? "glitch" : ""
        }`}
        onClick={() => !isBooting && inputRef.current?.focus()}
      >
        {isBooting ? (
          <div className="space-y-1">
            {bootMessages.map((message, index) => (
              <div
                key={index}
                className={`text-primary ${
                  index % 3 === 0 ? "glitch-text" : ""
                }`}
              >
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
                <div className="text-muted-foreground whitespace-pre-wrap pl-4">
                  {item.output}
                </div>
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <span className="text-primary">$</span>
              <div className="flex-1 flex items-center relative">
                <div className="absolute inset-0 flex items-center pointer-events-none font-mono">
                  <span className="text-foreground">{input}</span>
                </div>
                <div className="absolute inset-0 flex items-center pointer-events-none font-mono">
                  <span className="invisible">
                    {input.slice(0, cursorPosition)}
                  </span>
                  <span className="text-primary cursor-blink">█</span>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    updateCursorPosition();
                  }}
                  onKeyDown={handleKeyDown}
                  onClick={updateCursorPosition}
                  onKeyUp={updateCursorPosition}
                  className="flex-1 bg-transparent outline-none text-transparent caret-transparent"
                  autoFocus
                  spellCheck={false}
                />
              </div>
            </form>
          </>
        )}
      </div>
    </Card>
  );
}
