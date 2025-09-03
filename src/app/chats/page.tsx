"use client";

import { useState, useMemo } from "react";
import { Search, Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
  type: "recruiter" | "developer" | "ai" | "collaborator";
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Sarah Chen - Google",
    lastMessage: "I'd love to discuss the Senior Frontend Engineer position. Your portfolio is impressive!",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true,
    type: "recruiter"
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    lastMessage: "The React component architecture looks solid. Should we pair program tomorrow?",
    timestamp: "15m ago",
    unreadCount: 0,
    isOnline: true,
    type: "developer"
  },
  {
    id: "3",
    name: "CodeAI Assistant",
    lastMessage: "I've analyzed your code. Here are some optimization suggestions for better performance.",
    timestamp: "1h ago",
    unreadCount: 1,
    isOnline: true,
    type: "ai"
  },
  {
    id: "4",
    name: "Mike Johnson - Microsoft",
    lastMessage: "Thanks for applying! We'd like to schedule a technical interview for next week.",
    timestamp: "3h ago",
    unreadCount: 3,
    isOnline: false,
    type: "recruiter"
  },
  {
    id: "5",
    name: "Emma Wilson",
    lastMessage: "The API integration is complete. Ready for your review when you have time.",
    timestamp: "5h ago",
    unreadCount: 0,
    isOnline: true,
    type: "collaborator"
  },
  {
    id: "6",
    name: "David Park - Apple",
    lastMessage: "Impressive work on the mobile app. Are you interested in iOS development roles?",
    timestamp: "1d ago",
    unreadCount: 1,
    isOnline: false,
    type: "recruiter"
  },
  {
    id: "7",
    name: "Lisa Zhang",
    lastMessage: "Let's sync up on the database schema changes before the sprint ends.",
    timestamp: "2d ago",
    unreadCount: 0,
    isOnline: true,
    type: "developer"
  },
  {
    id: "8",
    name: "TechBot Pro",
    lastMessage: "Your deployment to production was successful! 🚀",
    timestamp: "2d ago",
    unreadCount: 0,
    isOnline: true,
    type: "ai"
  },
  {
    id: "9",
    name: "James Taylor - Netflix",
    lastMessage: "We have an exciting opportunity in our streaming platform team.",
    timestamp: "3d ago",
    unreadCount: 0,
    isOnline: false,
    type: "recruiter"
  },
  {
    id: "10",
    name: "Rachel Green",
    lastMessage: "The design system documentation looks great! Thanks for the detailed examples.",
    timestamp: "4d ago",
    unreadCount: 0,
    isOnline: false,
    type: "collaborator"
  }
];

function ChatSkeleton() {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-muted rounded-full p-6 mb-6">
        <MessageCircle className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-heading font-semibold mb-2">No messages found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start a new conversation or adjust your search to find existing chats.
      </p>
      <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
        <Plus className="h-4 w-4 mr-2" />
        Start New Chat
      </Button>
    </div>
  );
}

function ChatItem({ chat }: { chat: Chat }) {
  const router = useRouter();
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getTypeColor = (type: Chat["type"]) => {
    switch (type) {
      case "recruiter": return "bg-blue-500";
      case "developer": return "bg-green-500";
      case "ai": return "bg-purple-500";
      case "collaborator": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card 
      className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.01] group border-border/50"
      onClick={() => router.push(`/chats/${chat.id}`)}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback className="bg-muted text-muted-foreground font-medium">
              {getInitials(chat.name)}
            </AvatarFallback>
          </Avatar>
          {chat.isOnline && (
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background"></div>
          )}
          <div className={`absolute -top-1 -left-1 h-3 w-3 ${getTypeColor(chat.type)} rounded-full border border-background`}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {chat.name}
            </h3>
            <div className="flex items-center space-x-2 ml-2">
              {chat.unreadCount > 0 && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs px-2 py-0.5">
                  {chat.unreadCount}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {chat.timestamp}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground truncate leading-relaxed">
            {chat.lastMessage}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return mockChats;
    
    return mockChats.filter(chat => 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleNewChat = () => {
    // In a real app, this would create a new chat or navigate to a contact picker
    router.push("/chats/new");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground mt-1">
              Stay connected with your network
            </p>
          </div>
          
          <Button 
            onClick={handleNewChat}
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border/50 focus:border-accent/50 focus:ring-accent/20"
          />
        </div>

        {/* Chat List */}
        <div className="space-y-3">
          {isLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <ChatSkeleton key={i} />
              ))}
            </>
          ) : filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Stats */}
        {!isLoading && filteredChats.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>{filteredChats.length} conversations</span>
              <span>•</span>
              <span>{filteredChats.filter(c => c.unreadCount > 0).length} unread</span>
              <span>•</span>
              <span>{filteredChats.filter(c => c.isOnline).length} online</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <Button
          onClick={handleNewChat}
          size="lg"
          className="h-14 w-14 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}