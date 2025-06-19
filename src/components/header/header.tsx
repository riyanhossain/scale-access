'use client'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  const navLinks = useMemo(
    () => [
      { name: 'Performance', href: '#performance' },
      { name: 'Trusted By', href: '#trusted-by' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Buy Now', href: '#pricing', isButton: true },
    ],
    []
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      const sections = navLinks.map((link) => link.href.substring(1))

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section)
            break
          }
        }
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) setActiveLink(hash.substring(1))
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [navLinks])

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md bg-dark-gray' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="block flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={64}
              priority
              className="transition-transform duration-300 hover:scale-105 h-16 object-contain w-auto"
            />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.isButton ? (
                    <Link
                      href={link.href}
                      className={`group bg-neon-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-neon-blue/25 flex items-center gap-2${
                        activeLink === link.href.substring(1)
                          ? 'bg-blue-700'
                          : ''
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className={`relative font-medium text-gray-800  py-2 group${
                        activeLink === link.href.substring(1)
                          ? 'text-blue-600'
                          : ''
                      }`}
                    >
                      <span>{link.name}</span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                          activeLink === link.href.substring(1)
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      ></span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'transform rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'transform -rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        <div
          className={`md:hidden fixed top-0 right-0 h-full w-full bg-dark-gray shadow-lg transition-transform transform duration-300 ease-in-out z-40 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-20 px-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.isButton ? (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group bg-neon-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-300 block text-center max-w-max"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 font-medium outline-none ${
                        activeLink === link.href.substring(1)
                          ? 'text-blue-600'
                          : 'text-gray-800'
                      } hover:text-blue-600 transition-colors`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </header>
  )
}

export default Header
