import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import ExploreContent from '@/components/ExploreContent'

// Mock profile data with diverse backgrounds and skills
const mockProfiles = [
  {
    id: 1,
    name: 'Alex Chen',
    username: 'alexchen',
    role: 'AI Research Scientist',
    college: 'Stanford University',
    location: 'San Francisco, CA',
    skills: ['AI/ML', 'PyTorch', 'Computer Vision', 'NLP'],
    score: 98,
    rank: 3,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    availability: 'open',
    bio: 'Building the future of AI at scale. Published researcher in computer vision and natural language processing.',
    projects: 12,
    connections: 850
  },
  {
    id: 2,
    name: 'Sarah Williams',
    username: 'sarahw',
    role: 'Full-Stack Engineer',
    college: 'MIT',
    location: 'Boston, MA',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    score: 94,
    rank: 7,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    availability: 'selective',
    bio: 'Full-stack developer passionate about building scalable web applications and developer tools.',
    projects: 18,
    connections: 642
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    username: 'marcusj',
    role: 'AR/VR Developer',
    college: 'Carnegie Mellon',
    location: 'Seattle, WA',
    skills: ['Unity', 'C#', 'AR/VR', '3D Modeling'],
    score: 91,
    rank: 12,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    availability: 'open',
    bio: 'Creating immersive experiences in AR/VR. Specializing in Unity development and spatial computing.',
    projects: 9,
    connections: 423
  },
  {
    id: 4,
    name: 'Priya Patel',
    username: 'priyap',
    role: 'UX Designer',
    college: 'UC Berkeley',
    location: 'San Jose, CA',
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    score: 89,
    rank: null,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    availability: 'unavailable',
    bio: 'Design systems expert focused on creating intuitive user experiences for complex products.',
    projects: 15,
    connections: 567
  },
  {
    id: 5,
    name: 'David Kim',
    username: 'davidk',
    role: 'DevOps Engineer',
    college: 'Georgia Tech',
    location: 'Atlanta, GA',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
    score: 87,
    rank: null,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    availability: 'open',
    bio: 'Cloud infrastructure specialist with expertise in containerization and automation.',
    projects: 11,
    connections: 389
  },
  {
    id: 6,
    name: 'Emma Rodriguez',
    username: 'emmar',
    role: 'Data Scientist',
    college: 'Columbia University',
    location: 'New York, NY',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    score: 96,
    rank: 5,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    availability: 'selective',
    bio: 'Data scientist specializing in predictive analytics and business intelligence solutions.',
    projects: 14,
    connections: 721
  },
  {
    id: 7,
    name: 'James Wilson',
    username: 'jamesw',
    role: 'Blockchain Developer',
    college: 'University of Texas',
    location: 'Austin, TX',
    skills: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi'],
    score: 85,
    rank: null,
    photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    availability: 'open',
    bio: 'Blockchain developer building decentralized applications and smart contract solutions.',
    projects: 8,
    connections: 345
  },
  {
    id: 8,
    name: 'Lisa Chen',
    username: 'lisac',
    role: 'Mobile Developer',
    college: 'UCLA',
    location: 'Los Angeles, CA',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    score: 92,
    rank: 9,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    availability: 'selective',
    bio: 'Mobile app developer creating cross-platform solutions with focus on user experience.',
    projects: 13,
    connections: 598
  },
  {
    id: 9,
    name: 'Ryan Thompson',
    username: 'ryant',
    role: 'Security Engineer',
    college: 'Purdue University',
    location: 'Chicago, IL',
    skills: ['Cybersecurity', 'Penetration Testing', 'Network Security', 'Python'],
    score: 88,
    rank: null,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    availability: 'open',
    bio: 'Cybersecurity specialist focused on protecting digital infrastructure and conducting security assessments.',
    projects: 10,
    connections: 412
  },
  {
    id: 10,
    name: 'Zoe Martinez',
    username: 'zoem',
    role: 'Product Manager',
    college: 'Harvard University',
    location: 'Cambridge, MA',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
    score: 93,
    rank: 8,
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    availability: 'unavailable',
    bio: 'Product manager with experience launching consumer and enterprise products at scale.',
    projects: 16,
    connections: 834
  },
  {
    id: 11,
    name: 'Kevin Zhang',
    username: 'kevinz',
    role: 'Game Developer',
    college: 'University of Washington',
    location: 'Redmond, WA',
    skills: ['Unity', 'C++', 'Game Design', 'Graphics Programming'],
    score: 86,
    rank: null,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    availability: 'open',
    bio: 'Game developer creating immersive gaming experiences with focus on performance optimization.',
    projects: 7,
    connections: 298
  },
  {
    id: 12,
    name: 'Sophia Brown',
    username: 'sophiab',
    role: 'Frontend Developer',
    college: 'Duke University',
    location: 'Durham, NC',
    skills: ['Vue.js', 'CSS', 'JavaScript', 'Accessibility'],
    score: 90,
    rank: 11,
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    availability: 'selective',
    bio: 'Frontend developer passionate about creating accessible and performant web interfaces.',
    projects: 19,
    connections: 678
  }
]

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-8">
        <Suspense fallback={
          <div className="container mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        }>
          <ExploreContent profiles={mockProfiles} />
        </Suspense>
      </div>
    </div>
  )
}