"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, Users, Bot, Briefcase, Code, Filter, Grid3X3, List, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/Navbar';

interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  type: 'recruiter' | 'developer' | 'ai' | 'collaborator';
  status: 'online' | 'offline' | 'busy';
  lastActive: string;
  verified: boolean;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Technical Recruiter',
    company: 'Google',
    avatar: '/avatars/sarah.jpg',
    type: 'recruiter',
    status: 'online',
    lastActive: '2 min ago',
    verified: true,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Full Stack Developer',
    company: 'Stripe',
    avatar: '/avatars/marcus.jpg',
    type: 'developer',
    status: 'online',
    lastActive: '5 min ago',
    verified: true,
  },
  {
    id: '3',
    name: 'CodeMentor AI',
    role: 'Programming Assistant',
    company: 'AI Assistant',
    avatar: '/avatars/ai-code.jpg',
    type: 'ai',
    status: 'online',
    lastActive: 'Always available',
    verified: false,
  },
  {
    id: '4',
    name: 'Alex Rivera',
    role: 'Talent Acquisition Lead',
    company: 'Meta',
    avatar: '/avatars/alex.jpg',
    type: 'recruiter',
    status: 'busy',
    lastActive: '1 hour ago',
    verified: true,
  },
  {
    id: '5',
    name: 'Emma Thompson',
    role: 'Frontend Developer',
    company: 'Vercel',
    avatar: '/avatars/emma.jpg',
    type: 'collaborator',
    status: 'online',
    lastActive: '10 min ago',
    verified: true,
  },
  {
    id: '6',
    name: 'Career Coach AI',
    role: 'Career Development',
    company: 'AI Assistant',
    avatar: '/avatars/ai-career.jpg',
    type: 'ai',
    status: 'online',
    lastActive: 'Always available',
    verified: false,
  },
  {
    id: '7',
    name: 'David Kim',
    role: 'Engineering Manager',
    company: 'Netflix',
    avatar: '/avatars/david.jpg',
    type: 'recruiter',
    status: 'offline',
    lastActive: '3 hours ago',
    verified: true,
  },
  {
    id: '8',
    name: 'Lisa Park',
    role: 'DevOps Engineer',
    company: 'AWS',
    avatar: '/avatars/lisa.jpg',
    type: 'developer',
    status: 'online',
    lastActive: '1 min ago',
    verified: true,
  },
];

const recentContacts = mockContacts.slice(0, 4);

export default function NewChatPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(mockContacts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = mockContacts;

    if (selectedType !== 'all') {
      filtered = filtered.filter(contact => contact.type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  }, [searchQuery, selectedType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'busy': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recruiter': return <Briefcase className="w-4 h-4" />;
      case 'developer': return <Code className="w-4 h-4" />;
      case 'ai': return <Bot className="w-4 h-4" />;
      case 'collaborator': return <Users className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'recruiter': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'developer': return 'bg-green-100 text-green-700 border-green-200';
      case 'ai': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'collaborator': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleStartChat = (contact: Contact) => {
    router.push(`/chat/${contact.id}`);
  };

  const ContactCard = ({ contact }: { contact: Contact }) => (
    <Card 
      className="bg-white border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer group"
      onClick={() => handleStartChat(contact)}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="w-12 h-12 border-2 border-black">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="bg-accent text-black font-semibold">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div 
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-black truncate group-hover:text-gray-700 transition-colors">
                {contact.name}
              </h3>
              {contact.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-1 truncate">{contact.role}</p>
            <p className="text-xs text-gray-500 mb-3 truncate">{contact.company}</p>
            
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline" 
                className={`text-xs ${getTypeBadgeColor(contact.type)} border`}
              >
                <span className="mr-1">{getTypeIcon(contact.type)}</span>
                {contact.type}
              </Badge>
              <span className="text-xs text-gray-400">{contact.lastActive}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ContactListItem = ({ contact }: { contact: Contact }) => (
    <Card 
      className="bg-white border-2 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer group"
      onClick={() => handleStartChat(contact)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-10 h-10 border-2 border-black">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="bg-accent text-black font-semibold">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div 
              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${getStatusColor(contact.status)}`}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0">
                <h3 className="font-semibold text-black truncate group-hover:text-gray-700 transition-colors">
                  {contact.name}
                </h3>
                {contact.verified && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{contact.lastActive}</span>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center space-x-2 min-w-0">
                <p className="text-sm text-gray-600 truncate">{contact.role}</p>
                <span className="text-gray-400">•</span>
                <p className="text-sm text-gray-500 truncate">{contact.company}</p>
              </div>
              
              <Badge 
                variant="outline" 
                className={`text-xs ${getTypeBadgeColor(contact.type)} border flex-shrink-0 ml-2`}
              >
                <span className="mr-1">{getTypeIcon(contact.type)}</span>
                {contact.type}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-48"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="grid gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="border-2 border-black bg-white hover:bg-accent hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-black mb-1">Start New Conversation</h1>
            <p className="text-gray-600">Connect with recruiters, developers, and AI assistants</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-2 border-black p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search contacts by name, role, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-2 border-black focus:border-black focus:ring-0 bg-white"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full lg:w-48 border-2 border-black bg-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contacts</SelectItem>
                <SelectItem value="recruiter">Recruiters</SelectItem>
                <SelectItem value="developer">Developers</SelectItem>
                <SelectItem value="ai">AI Assistants</SelectItem>
                <SelectItem value="collaborator">Collaborators</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border-2 border-black bg-white">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Contacts */}
        {searchQuery === '' && selectedType === 'all' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Recent Conversations</h2>
            <div className="grid gap-3">
              {recentContacts.map((contact) => (
                <ContactListItem key={`recent-${contact.id}`} contact={contact} />
              ))}
            </div>
          </div>
        )}

        {/* Suggested Contacts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-black">
              {searchQuery ? `Search Results (${filteredContacts.length})` : 'Suggested Contacts'}
            </h2>
            {filteredContacts.length > 0 && (
              <span className="text-sm text-gray-500">
                {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {filteredContacts.length === 0 ? (
            <Card className="bg-white border-2 border-black">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">No contacts found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery 
                    ? `No contacts match "${searchQuery}". Try a different search term.`
                    : `No contacts found for the selected filter.`
                  }
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('all');
                  }}
                  className="border-2 border-black bg-white hover:bg-accent hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                >
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid'
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "grid gap-3"
            }>
              {filteredContacts.map((contact) => 
                viewMode === 'grid' 
                  ? <ContactCard key={contact.id} contact={contact} />
                  : <ContactListItem key={contact.id} contact={contact} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}