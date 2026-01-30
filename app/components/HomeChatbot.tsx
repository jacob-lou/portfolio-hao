// app/components/HomeChatbot.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageSquare, Send, X } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

async function postChat(message: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data = (await res.json()) as { reply?: string };
  return data.reply ?? "Sorry — I couldn’t respond.";
}

export function HomeChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Fight On ✌️ I’m Hao’s Trojan Bot. Ask: projects, resume, internships, or contact." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showNudge, setShowNudge] = useState(false);

  // auto scroll to bottom when open + messages change
  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // show a "chatbot exists" nudge on first visit (dismissible)
  useEffect(() => {
    const t = window.setTimeout(() => setShowNudge(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  // auto focus input when opened
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(t);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || typing) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTyping(true);

    try {
      const reply = await postChat(text);
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* Main Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[320px] sm:w-[380px] overflow-hidden rounded-xl2 border border-white/12 bg-[#0f0505]/80 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,.45)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-usc-red/22 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-usc-gold" />
                <div className="font-serifDisplay text-base tracking-tight text-white/90">TrojanBot</div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl2 border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="max-h-[420px] min-h-[280px] overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={[
                      "max-w-[85%] rounded-xl2 px-3 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-usc-gold text-black font-medium"
                        : "border border-white/10 bg-white/6 text-white/85",
                    ].join(" ")}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-xl2 border border-white/10 bg-white/6 px-3 py-2 text-sm text-white/70">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/35" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/35 [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/35 [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 bg-black/20 px-3 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void send();
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Try: "What’s your tech stack?"'
                  className="flex-1 rounded-xl2 border border-white/12 bg-white/5 px-3 py-2 text-sm text-white/85 placeholder:text-white/35 outline-none focus:border-usc-gold/55"
                />
                <button
                  type="submit"
                  disabled={typing || !input.trim()}
                  className="inline-flex items-center justify-center rounded-xl2 border border-usc-gold/30 bg-usc-red/25 px-3 py-2 text-usc-gold shadow-insetGlow hover:bg-usc-red/35 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nudge bubble (shows on first visit) */}
      <AnimatePresence>
        {showNudge && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[260px]"
          >
            <div className="rounded-xl2 border border-white/12 bg-[#0f0505]/80 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,.45)] p-3">
              <div className="text-sm text-white/90">
                <span className="text-usc-gold font-semibold">New:</span> Ask my Trojan Bot anything ✌️
              </div>
              <div className="mt-1 text-xs text-white/55">Projects · Resume · Internships · Contact</div>
              <div className="mt-2 flex gap-2">
                <button
                onClick={() => {
                    setShowNudge(false);
                    setOpen(true);
                }}
                className="rounded-xl2 border border-usc-gold/25 bg-usc-red/25 px-3 py-1.5 text-xs text-usc-gold hover:bg-usc-red/35"
                >
                Open
                </button>
                <button
                onClick={() => {
                    setShowNudge(false);
                }}
                className="rounded-xl2 border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
                >
                Got it
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-usc-gold/25 bg-usc-gold text-usc-red shadow-[0_0_30px_rgba(255,204,0,.20)]"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </>
  );
}