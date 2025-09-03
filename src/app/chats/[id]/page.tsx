"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  Copy, 
  ExternalLink, 
  Smile,
  MoreHorizontal,
  Phone,
  Video,
  CheckCheck,
  Check
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Message {
  id: string;
  type: 'text' | 'code' | 'file' | 'system' | 'link';
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  reactions?: { emoji: string; users: string[] }[];
  fileName?: string;
  fileSize?: string;
  language?: string;
  linkPreview?: {
    title: string;
    description: string;
    image: string;
    domain: string;
  };
}

interface ChatData {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company?: string;
  isOnline: boolean;
  lastSeen?: Date;
  messages: Message[];
}

const mockChats: Record<string, ChatData> = {
  "1": {
    id: "1",
    name: "Sarah Chen",
    avatar: "/api/placeholder/32/32",
    role: "Senior Recruiter",
    company: "TechCorp",
    isOnline: true,
    messages: [
      {
        id: "1",
        type: "system",
        content: "Chat started",
        sender: "other",
        timestamp: new Date(Date.now() - 86400000),
        status: "read"
      },
      {
        id: "2",
        type: "text",
        content: "Hi! I came across your profile on 0Unveiled and I'm really impressed with your background. We have an exciting Senior Frontend Developer position that might be perfect for you.",
        sender: "other",
        timestamp: new Date(Date.now() - 82800000),
        status: "read"
      },
      {
        id: "3",
        type: "text",
        content: "Thank you for reaching out! I'd be interested to learn more about the role and the company.",
        sender: "user",
        timestamp: new Date(Date.now() - 82200000),
        status: "read"
      },
      {
        id: "4",
        type: "text",
        content: "Great! We're looking for someone with strong React and TypeScript skills to join our core platform team. The role offers competitive compensation ($140-180k) plus equity, and we're fully remote with quarterly team meetups.",
        sender: "other",
        timestamp: new Date(Date.now() - 81600000),
        status: "read"
      },
      {
        id: "5",
        type: "link",
        content: "Here's our detailed job description: https://techcorp.com/careers/senior-frontend-dev",
        sender: "other",
        timestamp: new Date(Date.now() - 81000000),
        status: "read",
        linkPreview: {
          title: "Senior Frontend Developer - TechCorp",
          description: "Join our innovative team building next-generation cloud platforms. React, TypeScript, remote-first culture.",
          image: "/api/placeholder/300/160",
          domain: "techcorp.com"
        }
      }
    ]
  },
  "2": {
    id: "2",
    name: "Alex Rodriguez",
    avatar: "/api/placeholder/32/32",
    role: "Full Stack Developer",
    company: "StartupXYZ",
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000),
    messages: [
      {
        id: "1",
        type: "text",
        content: "Hey! Saw your React component library on your 0Unveiled profile. Really clean architecture!",
        sender: "other",
        timestamp: new Date(Date.now() - 7200000),
        status: "read"
      },
      {
        id: "2",
        type: "text",
        content: "Thanks! I've been working on making it more modular and accessible.",
        sender: "user",
        timestamp: new Date(Date.now() - 7000000),
        status: "read"
      },
      {
        id: "3",
        type: "code",
        content: `// Here's the hook I mentioned for form validation
import { useState, useCallback } from 'react';

export const useFormValidation = (schema) => {
  const [errors, setErrors] = useState({});
  
  const validate = useCallback((data) => {
    const newErrors = {};
    Object.keys(schema).forEach(key => {
      const validation = schema[key];
      if (!validation.test(data[key])) {
        newErrors[key] = validation.message;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [schema]);
  
  return { errors, validate };
};`,
        sender: "other",
        timestamp: new Date(Date.now() - 6800000),
        status: "read",
        language: "typescript",
        reactions: [{ emoji: "👍", users: ["user"] }]
      }
    ]
  },
  "3": {
    id: "3",
    name: "0Unveiled AI",
    avatar: "/api/placeholder/32/32",
    role: "AI Assistant",
    isOnline: true,
    messages: [
      {
        id: "1",
        type: "text",
        content: "Hello! I'm here to help optimize your profile and suggest improvements based on current market trends. How can I assist you today?",
        sender: "other",
        timestamp: new Date(Date.now() - 3600000),
        status: "read"
      },
      {
        id: "2",
        type: "text",
        content: "I'd like to know how to improve my visibility to recruiters",
        sender: "user",
        timestamp: new Date(Date.now() - 3400000),
        status: "read"
      },
      {
        id: "3",
        type: "text",
        content: "Great question! Based on your profile analysis, here are my top recommendations:\n\n1. Add more specific tech stack details to your projects\n2. Include quantifiable achievements (performance improvements, user growth)\n3. Complete the skills assessment for React and TypeScript\n4. Add a professional headshot - profiles with photos get 40% more views\n\nWould you like me to help you with any of these specifically?",
        sender: "other",
        timestamp: new Date(Date.now() - 3200000),
        status: "delivered"
      }
    ]
  }
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.chatId as string;
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const chatData = mockChats[chatId];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData?.messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Mock message sending
    console.log("Sending message:", message);
    setMessage("");
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const addReaction = (messageId: string, emoji: string) => {
    console.log("Adding reaction:", { messageId, emoji });
  };

  if (!chatData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-semibold mb-2">Chat not found</h2>
            <p className="text-muted-foreground mb-4">This conversation doesn't exist or you don't have access to it.</p>
            <Button onClick={() => router.push("/chats")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chats
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const renderMessage = (msg: Message) => {
    const isUser = msg.sender === 'user';
    
    return (
      <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[70%]`}>
          {!isUser && (
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={chatData.avatar} alt={chatData.name} />
              <AvatarFallback>{chatData.name[0]}</AvatarFallback>
            </Avatar>
          )}
          
          <div className="group relative">
            <Card className={`p-3 ${
              isUser 
                ? 'bg-primary text-primary-foreground' 
                : msg.type === 'system'
                ? 'bg-muted border-dashed'
                : 'bg-card'
            }`}>
              {msg.type === 'text' && (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
              
              {msg.type === 'code' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {msg.language || 'code'}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(msg.content)}
                      className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <pre className="text-sm bg-muted/50 p-2 rounded text-foreground overflow-x-auto">
                    <code>{msg.content}</code>
                  </pre>
                </div>
              )}
              
              {msg.type === 'link' && msg.linkPreview && (
                <div className="space-y-2">
                  <p>{msg.content.split(' ').slice(0, -1).join(' ')}</p>
                  <Card className="p-3 border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <img 
                        src={msg.linkPreview.image} 
                        alt={msg.linkPreview.title}
                        className="w-16 h-16 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{msg.linkPreview.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{msg.linkPreview.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{msg.linkPreview.domain}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Card>
                </div>
              )}
              
              {msg.type === 'file' && (
                <div className="flex items-center gap-3 p-2">
                  <div className="w-10 h-10 bg-accent/20 rounded flex items-center justify-center">
                    <Paperclip className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{msg.fileName}</p>
                    <p className="text-xs text-muted-foreground">{msg.fileSize}</p>
                  </div>
                </div>
              )}
              
              {msg.type === 'system' && (
                <p className="text-xs text-muted-foreground text-center">{msg.content}</p>
              )}
            </Card>
            
            {msg.reactions && msg.reactions.length > 0 && (
              <div className="flex gap-1 mt-1">
                {msg.reactions.map((reaction, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0.5">
                    {reaction.emoji} {reaction.users.length}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${isUser ? 'justify-end' : 'justify-start'}`}>
              <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              {isUser && (
                <div className="flex items-center">
                  {msg.status === 'sent' && <Check className="w-3 h-3" />}
                  {msg.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                  {msg.status === 'read' && <CheckCheck className="w-3 h-3 text-accent" />}
                </div>
              )}
            </div>
            
            {/* Quick reactions */}
            <div className="absolute -right-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => addReaction(msg.id, "👍")}
                        className="h-6 w-6 p-0 text-xs hover:bg-accent/20"
                      >
                        👍
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>React with 👍</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => addReaction(msg.id, "❤️")}
                        className="h-6 w-6 p-0 text-xs hover:bg-accent/20"
                      >
                        ❤️
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>React with ❤️</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Chat Header */}
      <div className="border-b bg-card sticky top-16 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/chats")}
                className="lg:hidden"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={chatData.avatar} alt={chatData.name} />
                    <AvatarFallback>{chatData.name[0]}</AvatarFallback>
                  </Avatar>
                  {chatData.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div>
                  <h2 className="font-heading font-semibold">{chatData.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{chatData.role}</span>
                    {chatData.company && (
                      <>
                        <span>•</span>
                        <span>{chatData.company}</span>
                      </>
                    )}
                  </div>
                  {chatData.isOnline ? (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Online
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Last seen {chatData.lastSeen?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="container max-w-4xl mx-auto px-4 py-6 h-full overflow-y-auto">
          <div className="space-y-1">
            {chatData.messages.map(renderMessage)}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start gap-2 max-w-[70%]">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={chatData.avatar} alt={chatData.name} />
                    <AvatarFallback>{chatData.name[0]}</AvatarFallback>
                  </Avatar>
                  <Card className="p-3 bg-card">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      {/* Message Input */}
      <div className="border-t bg-card sticky bottom-0">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="pr-24 resize-none min-h-[44px]"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e) => console.log("Files selected:", e.target.files)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 w-8 p-0"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="h-11 px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}