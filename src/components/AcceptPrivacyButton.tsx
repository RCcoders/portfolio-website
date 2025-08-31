'use client'

export default function AcceptPrivacyButton() {
  const handleClick = () => {
    alert('Privacy Policy acknowledged!')
    localStorage.setItem('privacyAccepted', 'true')
  }

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
    >
      I Understand and Accept
    </button>
  )
}
