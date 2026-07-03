'use client'

import { useState, useEffect } from 'react'

export default function AcceptPrivacyButton() {
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    setAccepted(localStorage.getItem('privacyAccepted') === 'true')
  }, [])

  const handleClick = () => {
    localStorage.setItem('privacyAccepted', 'true')
    setAccepted(true)
  }

  return (
    <button
      onClick={handleClick}
      disabled={accepted}
      className={`px-8 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
        accepted
          ? 'bg-neutral-950 text-neutral-600 cursor-not-allowed border border-neutral-900'
          : 'bg-accent hover:opacity-90 text-accent-text'
      }`}
    >
      {accepted ? '[Policy Accepted]' : '[I Understand and Accept]'}
    </button>
  )
}
