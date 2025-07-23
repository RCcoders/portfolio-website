// components/CertCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ExternalLink, Award } from 'lucide-react'

interface CertCardProps {
  slug: string
  title: string
  issuer: string
  date: string
  imageUrl?: string
  description?: string
  credentialUrl?: string
}

export default function CertCard({
  slug,
  title,
  issuer,
  date,
  imageUrl,
  description,
  credentialUrl
}: CertCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:scale-105 transform">
      <Link href={`/certifications/${slug}`}>
        <div className="relative h-48 w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${title} certificate`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-purple-500/20 flex items-center justify-center">
              <Award className="w-12 h-12 text-white/40" />
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm text-purple-300 mb-1">{issuer}</p>
          {description && (
            <p className="text-sm text-gray-300 line-clamp-2 mb-2">{description}</p>
          )}

          <div className="flex justify-between items-center text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>

            <span className="text-purple-400 group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>

      {credentialUrl && (
        <div className="absolute top-4 right-4">
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all"
            title="View Certificate"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  )
}
