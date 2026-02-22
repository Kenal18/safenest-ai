"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatAdvisor() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hey there! 👋 I'm your SafeNest AI Advisor. Ask me anything about safe investing, emergency funds, or SIPs! Remember, I don't give financial advice, just smart educational tips.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.slice(-4).map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Oops, something went wrong on my end. Wanna try again?" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-20" id="chat">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                    <Bot className="w-8 h-8 text-purple-400" />
                    AI Financial Co-Pilot
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Get GenZ-friendly, conservative guidance on navigating your personal finances.
                </p>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col h-[500px]">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-blue-600" : "bg-purple-600"
                                    }`}
                            >
                                {msg.role === "user" ? (
                                    <User className="w-5 h-5 text-white" />
                                ) : (
                                    <Bot className="w-5 h-5 text-white" />
                                )}
                            </div>
                            <div
                                className={`max-w-[75%] p-4 rounded-2xl text-sm md:text-base leading-relaxed ${msg.role === "user"
                                    ? "bg-blue-600/20 text-blue-100 rounded-tr-sm"
                                    : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-4 flex-row">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-purple-600">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="max-w-[75%] p-4 rounded-2xl text-sm md:text-base leading-relaxed bg-white/5 border border-white/10 text-slate-400 rounded-tl-sm flex items-center gap-2">
                                <span className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                </span>
                                SafeNest AI is typing...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form
                    onSubmit={sendMessage}
                    className="p-4 border-t border-white/10 bg-black/20 flex gap-2"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me about SIPs, emergency funds, or safe investing..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-slate-200"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white p-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center w-12 h-12"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
