'use client'

export default function AcceptPrivacyButton() {
  const handleClick = () => {
    alert('Privacy Policy acknowledged!')
    localStorage.setItem('privacyAccepted', 'true')
  }

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-r from-sky-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-sky-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
    >
      I Understand and Accept
    </button>
  )
}
