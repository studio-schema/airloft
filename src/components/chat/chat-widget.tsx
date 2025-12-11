"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  User,
  Loader2,
} from "lucide-react";

const suggestedQuestions = [
  "What types of events do you host?",
  "How does the balloon venue work?",
  "What's the capacity?",
  "How do I book a private event?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } =
    useChat({
      api: "/api/chat",
    });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300",
          "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400",
          "hover:scale-105 hover:shadow-xl",
          "glow-primary",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <Card className="flex flex-col h-[500px] max-h-[70vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-glass-border bg-background-secondary">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Airloft Assistant</h3>
                <p className="text-xs text-foreground-muted">
                  Ask me anything about our venue
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="glass rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                    <p className="text-sm text-foreground">
                      Hi! I&apos;m the Airloft assistant. I can help you learn about
                      our unique balloon venue and find the perfect event for you.
                      What would you like to know?
                    </p>
                  </div>
                </div>

                {/* Suggested Questions */}
                <div className="pl-11 space-y-2">
                  <p className="text-xs text-foreground-muted">
                    Popular questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question) => (
                      <button
                        key={question}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-glass-border text-foreground-secondary hover:bg-white/10 hover:text-foreground transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-purple-500 to-pink-500"
                        : "bg-background-elevated"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Sparkles className="h-4 w-4 text-white" />
                    ) : (
                      <User className="h-4 w-4 text-foreground-muted" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl p-3 max-w-[80%]",
                      message.role === "assistant"
                        ? "glass rounded-tl-sm"
                        : "bg-primary/20 rounded-tr-sm"
                    )}
                  >
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="glass rounded-2xl rounded-tl-sm p-3">
                  <Loader2 className="h-4 w-4 animate-spin text-foreground-muted" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-glass-border bg-background-secondary"
          >
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                disabled={isLoading || !input.trim()}
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
