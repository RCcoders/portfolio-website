import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
}

export function FadeInOnScroll({ 
  children, 
  className = '', 
  threshold = 0.1,
  delay = 0 
}: ScrollAnimationProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold })

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isIntersecting 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export function SlideInOnScroll({ 
  children, 
  className = '', 
  direction = 'left',
  threshold = 0.1 
}: ScrollAnimationProps & { direction?: 'left' | 'right' }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold })

  const translateClass = direction === 'left' ? 'translate-x-10' : '-translate-x-10'

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isIntersecting 
          ? 'opacity-100 translate-x-0' 
          : `opacity-0 ${translateClass}`
      } ${className}`}
    >
      {children}
    </div>
  )
}