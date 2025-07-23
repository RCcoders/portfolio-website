import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Github, ExternalLink, Star, Code } from 'lucide-react'

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  technologies: string[]
  date: string
  category?: string
  featured?: boolean
  githubUrl?: string
  demoUrl?: string
  imageUrl?: string
  status?: 'completed' | 'in-progress' | 'planned'
  stars?: number
}

export default function ProjectCard({
  slug,
  title,
  description,
  technologies,
  date,
  category,
  featured = false,
  githubUrl,
  demoUrl,
  imageUrl,
  status = 'completed',
  stars
}: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/10 border-green-500/30'
      case 'in-progress': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
      case 'planned': return 'text-blue-400 bg-blue-500/10 border-blue-500/30'
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'in-progress': return 'In Progress'
      case 'planned': return 'Planned'
      default: return 'Unknown'
    }
  }

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border transition-all duration-500 hover:scale-105 transform ${
      featured 
        ? 'border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10' 
        : 'border-white/10 hover:border-purple-400/30'
    }`}>
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      <div className="relative">
        {/* Project Image/Preview */}
        <div className="relative h-48 overflow-hidden">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={`${title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Code className="w-16 h-16 text-white/40" />
            </div>
          )}
          
          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                aria-label="View live demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                aria-label="View source code"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 mb-2">
              {category && (
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                  {category}
                </span>
              )}
              <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(status)}`}>
                {getStatusText(status)}
              </span>
            </div>
            
            {stars && (
              <div className="flex items-center gap-1 text-sm text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span>{stars}</span>
              </div>
            )}
          </div>

          {/* Title and Description */}
          <Link href={`/projects/${slug}`} className="block group-hover:text-purple-300 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight">
              {title}
            </h3>
          </Link>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
              <span 
                key={tech}
                className={`px-2 py-1 bg-white/5 backdrop-blur-sm rounded text-xs text-purple-300 border border-white/10 hover:border-purple-400/30 transition-colors tech-delay-${index}`}
              >
                {tech}
              </span>
            {technologies.length > 4 && (
              <span className="px-2 py-1 bg-white/5 backdrop-blur-sm rounded text-xs text-gray-400 border border-white/10">
                +{technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            
            <Link 
              href={`/projects/${slug}`}
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              View Details →
            </Link>
          </div>
        </div>

        {/* Interactive elements */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Card border glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
    </div>
  )
}