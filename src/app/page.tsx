'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Comparison from '@/components/Comparison'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('section')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen w-full bg-true-black text-white overflow-x-hidden">
      <Hero />
      <Features />
      <Pricing />
      <Comparison />
      <Testimonials />
      <FinalCTA />
    </main>
  )
}
