"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, GraduationCap, Users, ToggleLeft, ToggleRight, Filter, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Profile {
  id: number;
  name: string;
  username: string;
  role: string;
  college: string;
  location: string;
  skills: string[];
  score: number;
  rank: number | null;
  photo: string;
  availability: 'open' | 'selective' | 'unavailable';
  bio: string;
  projects: number;
  connections: number;
}

interface ExploreContentProps {
  profiles: Profile[];
}

const skillCategories = [
  { id: "all", label: "All", color: "bg-black text-white" },
  { id: "ai-ml", label: "AI/ML", color: "bg-blue-50 text-blue-700 border border-blue-200" },
  { id: "fullstack", label: "Full-stack", color: "bg-green-50 text-green-700 border border-green-200" },
  { id: "frontend", label: "Frontend", color: "bg-purple-50 text-purple-700 border border-purple-200" },
  { id: "backend", label: "Backend", color: "bg-orange-50 text-orange-700 border border-orange-200" },
  { id: "design", label: "Design", color: "bg-pink-50 text-pink-700 border border-pink-200" },
  { id: "mobile", label: "Mobile", color: "bg-indigo-50 text-indigo-700 border border-indigo-200" },
  { id: "devops", label: "DevOps", color: "bg-gray-50 text-gray-700 border border-gray-200" },
  { id: "data", label: "Data Science", color: "bg-cyan-50 text-cyan-700 border border-cyan-200" },
  { id: "security", label: "Security", color: "bg-red-50 text-red-700 border border-red-200" },
  { id: "blockchain", label: "Blockchain", color: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
  { id: "game", label: "Game Dev", color: "bg-violet-50 text-violet-700 border border-violet-200" },
];

export default function ExploreContent({ profiles }: ExploreContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSkillFilter, setActiveSkillFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique locations and colleges for autocomplete
  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(profiles.map(p => p.location))).sort();
  }, [profiles]);

  const uniqueColleges = useMemo(() => {
    return Array.from(new Set(profiles.map(p => p.college))).sort();
  }, [profiles]);

  // Simulate loading state for search
  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  // Filter profiles based on search and filters
  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      // Search filter
      const searchMatch = !searchTerm || 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      // Skill category filter
      const skillMatch = activeSkillFilter === "all" || 
        profile.skills.some(skill => {
          const skillLower = skill.toLowerCase();
          const roleLower = profile.role.toLowerCase();
          switch (activeSkillFilter) {
            case "ai-ml": return skillLower.includes("ai") || skillLower.includes("ml") || skillLower.includes("machine learning") || skillLower.includes("tensorflow") || skillLower.includes("pytorch") || roleLower.includes("ai") || skillLower.includes("computer vision") || skillLower.includes("nlp");
            case "fullstack": return skillLower.includes("fullstack") || skillLower.includes("full-stack") || skillLower.includes("full stack") || roleLower.includes("full-stack");
            case "frontend": return skillLower.includes("react") || skillLower.includes("vue") || skillLower.includes("angular") || skillLower.includes("frontend") || skillLower.includes("javascript") || skillLower.includes("css") || roleLower.includes("frontend");
            case "backend": return skillLower.includes("node") || skillLower.includes("python") || skillLower.includes("backend") || skillLower.includes("api") || skillLower.includes("server") || roleLower.includes("backend");
            case "design": return skillLower.includes("design") || skillLower.includes("ui") || skillLower.includes("ux") || skillLower.includes("figma") || roleLower.includes("designer") || skillLower.includes("prototyping");
            case "mobile": return skillLower.includes("mobile") || skillLower.includes("ios") || skillLower.includes("android") || skillLower.includes("flutter") || skillLower.includes("react native") || skillLower.includes("swift") || skillLower.includes("kotlin") || roleLower.includes("mobile");
            case "devops": return skillLower.includes("devops") || skillLower.includes("docker") || skillLower.includes("kubernetes") || skillLower.includes("aws") || skillLower.includes("cloud") || skillLower.includes("terraform") || roleLower.includes("devops");
            case "data": return skillLower.includes("data") || skillLower.includes("analytics") || skillLower.includes("sql") || skillLower.includes("pandas") || skillLower.includes("tableau") || roleLower.includes("data scientist") || skillLower.includes("machine learning");
            case "security": return skillLower.includes("security") || skillLower.includes("cybersecurity") || skillLower.includes("penetration") || roleLower.includes("security");
            case "blockchain": return skillLower.includes("blockchain") || skillLower.includes("solidity") || skillLower.includes("web3") || skillLower.includes("smart contracts") || skillLower.includes("defi") || roleLower.includes("blockchain");
            case "game": return skillLower.includes("unity") || skillLower.includes("game") || skillLower.includes("graphics") || roleLower.includes("game developer") || skillLower.includes("c++");
            default: return false;
          }
        });

      // Location filter
      const locationMatch = !locationFilter || profile.location === locationFilter;

      // College filter
      const collegeMatch = !collegeFilter || profile.college === collegeFilter;

      return searchMatch && skillMatch && locationMatch && collegeMatch;
    });
  }, [profiles, searchTerm, activeSkillFilter, locationFilter, collegeFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setActiveSkillFilter("all");
    setLocationFilter("");
    setCollegeFilter("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-black mb-4">Explore Profiles</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover talented professionals from top universities and companies worldwide
          </p>
        </motion.div>
      </div>

      {/* Search and Filters Header */}
      <div className="sticky top-16 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, skills, college, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200 hover:shadow-md"
              />
              {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Skill Category Pills */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {skillCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveSkillFilter(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeSkillFilter === category.id
                        ? category.color
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Location & College Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-black min-w-[140px]"
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={collegeFilter}
                  onChange={(e) => setCollegeFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-black min-w-[140px]"
                >
                  <option value="">All Colleges</option>
                  {uniqueColleges.map(college => (
                    <option key={college} value={college}>{college}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Recruiter Mode Toggle */}
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Recruiter Mode</span>
              <button
                onClick={() => setRecruiterMode(!recruiterMode)}
                className="focus:outline-none"
              >
                {recruiterMode ? (
                  <ToggleRight className="w-6 h-6 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Results Info & Clear Filters */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-black">{filteredProfiles.length}</span> of{" "}
              <span className="font-semibold">{profiles.length}</span> profiles
              {recruiterMode && (
                <Badge className="ml-2 bg-blue-50 text-blue-700 border border-blue-200">
                  Recruiter View
                </Badge>
              )}
            </div>
            
            {(searchTerm || activeSkillFilter !== "all" || locationFilter || collegeFilter) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                size="sm"
                className="text-gray-600 hover:text-black border-gray-200 hover:border-black"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {filteredProfiles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
              <Button onClick={clearFilters} className="bg-black text-white hover:bg-gray-800">
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={`${searchTerm}-${activeSkillFilter}-${locationFilter}-${collegeFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProfiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.05, duration: 0.3 }
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  className="relative bg-black text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Leaderboard Rank Badge */}
                  {profile.rank && profile.rank <= 15 && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      #{profile.rank}
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Profile Photo with Glowing Ring */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-cyan-400/50 transition-all duration-300">
                          <img 
                            src={profile.photo} 
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Glowing ring animation */}
                        <div className="absolute inset-0 rounded-full ring-2 ring-cyan-400/0 group-hover:ring-cyan-400/70 animate-pulse transition-all duration-300" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-lg leading-tight mb-1 group-hover:text-cyan-300 transition-colors">
                          {profile.name}
                        </h3>
                        <p className="text-sm text-gray-300 mb-1">@{profile.username}</p>
                        <p className="text-sm text-cyan-300 font-medium">{profile.role}</p>
                      </div>
                    </div>

                    {/* College & Location */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-300">
                        <GraduationCap className="w-4 h-4 mr-2 text-cyan-400" />
                        {profile.college}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                        {profile.location}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.skills.slice(0, 4).map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/20 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/40 group-hover:text-cyan-300 transition-all duration-300"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.3)" }}
                          transition={{ delay: skillIndex * 0.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Score and Stats */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">Score:</span>
                        <span className="font-bold text-white text-lg">{profile.score}/100</span>
                      </div>
                      {profile.rank && (
                        <div className="text-sm text-cyan-300 font-medium">
                          Rank #{profile.rank}
                        </div>
                      )}
                    </div>

                    {/* Recruiter Mode Additional Info */}
                    {recruiterMode && (
                      <div className="border-t border-white/20 pt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">Projects:</span>
                          <span className="text-white font-medium">{profile.projects}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">Connections:</span>
                          <span className="text-white font-medium">{profile.connections}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            profile.availability === "open" 
                              ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                              : profile.availability === "selective"
                              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                              : "bg-red-500/20 text-red-300 border border-red-500/30"
                          }`}>
                            {profile.availability === "open" && "Open to Work"}
                            {profile.availability === "selective" && "Selective"}
                            {profile.availability === "unavailable" && "Unavailable"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* View Profile Button */}
                    <motion.button
                      className="w-full mt-4 py-3 bg-white text-black font-semibold rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 transform group-hover:scale-[1.02]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Profile
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}