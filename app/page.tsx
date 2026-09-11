'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Menu,
  X,
  Snowflake,
  UtensilsCrossed,
  Car,
  Binoculars,
  Mountain,
  Flower,
  ChefHat,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
} from 'lucide-react'

const navLinks = [
  { label: 'Suites', href: '#suites' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Dining', href: '#amenities' },
  { label: 'Rates', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const stats = [
  { value: '40', label: 'Suites' },
  { value: '98%', label: 'Return Guest Rate' },
  { value: '4.9★', label: 'Michelin Dining' },
  { value: 'Year Round', label: 'Open' },
  { value: '2015', label: 'Established' },
]

const experiences = [
  {
    title: 'Alpine Wellness Retreat',
    description: '4 day immersive program with mountain yoga, spa rituals, and nutritionist curated menus.',
    icon: Flower,
  },
  {
    title: 'Private Chef Table Dinner',
    description: 'Intimate 6 course pairing featuring local heritage ingredients and Alpine wines curated by our sommelier.',
    icon: ChefHat,
  },
  {
    title: 'Guided Summit Expeditions',
    description: 'Expert led mountain hiking and climbing experiences with certified alpine guides, departing daily at dawn.',
    icon: Mountain,
  },
]

const suites = [
  {
    name: 'The Glacier Suite',
    description: 'Featuring heated marble bathroom, private balcony with eastern exposure, and panoramic valley views.',
    price: 'From CHF 1,200/night',
  },
  {
    name: 'The Evergreen Suite',
    description: 'Floor to ceiling windows framing ancient pine forests, with a private sauna and deep soaking tub.',
    price: 'From CHF 1,600/night',
  },
  {
    name: 'The Summit Penthouse',
    description: 'Our most exclusive residence with wraparound terrace, private hot tub, and dedicated butler service.',
    price: 'From CHF 2,800/night',
  },
]

const amenities = [
  { title: 'Climate Controlled Spa', description: 'Indoor heated pool, sauna, and steam rooms', icon: Snowflake },
  { title: 'À La Carte Room Dining', description: '24 hour in suite culinary service', icon: UtensilsCrossed },
  { title: 'Helicopter Transfer', description: 'Direct service from Zurich and Geneva', icon: Car },
  { title: 'Personal Concierge', description: 'Dedicated guest relations from booking to checkout', icon: Binoculars },
]

const testimonials = [
  {
    quote: "We have stayed at every luxury mountain resort in Europe. Alpine Haven is the only one we return to twice yearly.",
    author: 'M. Ashworth',
    title: 'CEO, Ashworth Holdings',
    initials: 'MA',
  },
  {
    quote: "The concierge remembered we honeymoon at Lake Como in 2018 and had our favorite wine chilling when we arrived. That is luxury.",
    author: 'J. & C. Mendez',
    title: 'Entrepreneurs, Barcelona',
    initials: 'JC',
  },
  {
    quote: "For executive retreats, nowhere else delivers this level of privacy and refinement. Our board will not meet anywhere else now.",
    author: 'Dr. V. Patel',
    title: 'Founder, Insight Capital',
    initials: 'VP',
  },
]

const pricingTiers = [
  {
    name: 'Seasonal Escape',
    price: 'CHF 1,400',
    period: '/night',
    features: [
      '2 to 3 night minimum stay',
      'Breakfast daily',
      'Spa credit included',
      'Airport transfer',
      'Flexible cancellation',
    ],
  },
  {
    name: 'Alpine Retreat',
    price: 'CHF 2,100',
    period: '/night',
    featured: true,
    features: [
      'Everything in Seasonal',
      '3 course dinner nightly',
      'Private guide service',
      'Wine pairing experience',
      'Curated wellness program',
    ],
  },
  {
    name: 'Luxury Residence',
    price: 'CHF 3,500',
    period: '/night',
    features: [
      'Dedicated concierge',
      'All previous benefits',
      'Private chef consultation',
      'Helicopter service',
      'Custom itinerary design',
    ],
  },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      )
      if (response.ok) {
        setFormStatus('success')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterStatus('loading')
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newsletterEmail, type: 'newsletter' }),
        }
      )
      if (response.ok) {
        setNewsletterStatus('success')
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <main className="min-h-screen bg-[#F9F6F1]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9F6F1]/95 backdrop-blur-sm border-b border-[#E8E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="#" className="font-serif text-2xl text-[#1B4D3E] font-semibold">
              Alpine Haven
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#3A332E] hover:text-[#1B4D3E] transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="bg-[#1B4D3E] hover:bg-[#1B4D3E]/90 text-white"
              >
                <a href="#contact">Book Now</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#3A332E]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-[#F9F6F1] border-b border-[#E8E2DA] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg text-[#3A332E] hover:text-[#1B4D3E] transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 60}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className={`w-full bg-[#1B4D3E] hover:bg-[#1B4D3E]/90 text-white transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: mobileMenuOpen ? `${navLinks.length * 60}ms` : '0ms' }}
            >
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                Book Now
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Split */}
      <section className="pt-20 min-h-screen flex items-center bg-[#FEFDFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#3A332E] leading-tight mb-6">
                Mountain Luxury,
                <br />
                <span className="text-[#1B4D3E]">Uncompromised</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#6B5B54] mb-8 leading-relaxed">
                Escape to 2,000m of alpine serenity. Just 8 guests per room night.
                Private spa. World class cuisine. Where the Swiss Alps meet
                unparalleled refinement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#1B4D3E] hover:bg-[#1B4D3E]/90 text-white px-8"
                >
                  <a href="#contact">Check Availability</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white"
                >
                  <a href="#suites">Explore Our Suites</a>
                </Button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero.png"
                  alt="Alpine Haven luxury mountain lodge at sunrise with snow-capped peaks"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#1B4D3E] text-white px-6 py-3 rounded-lg shadow-lg hidden sm:block">
                <p className="text-sm font-medium">2,000m Elevation</p>
                <p className="text-xs text-white/80">Swiss Alps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-[#F9F6F1] py-12 border-y border-[#E8E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="font-serif text-3xl lg:text-4xl text-[#1B4D3E] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[#6B5B54]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="py-20 lg:py-28 bg-[#FEFDFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#1B4D3E] font-medium mb-3 tracking-wide uppercase text-sm">
              Curated Moments
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A332E] mb-4">
              Signature Experiences
            </h2>
            <p className="text-[#6B5B54] max-w-2xl mx-auto">
              Each stay at Alpine Haven is an opportunity to discover the Alps in ways few ever will.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-[#1B4D3E] to-[#2A5F4E] border-0 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8 text-white">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <exp.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl mb-3">{exp.title}</h3>
                  <p className="text-white/80 leading-relaxed">{exp.description}</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center mt-6 text-sm font-medium hover:underline"
                  >
                    Inquire Now →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Suites Showcase */}
      <section id="suites" className="py-20 lg:py-28 bg-[#F9F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#1B4D3E] font-medium mb-3 tracking-wide uppercase text-sm">
              Accommodations
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A332E] mb-4">
              Our Signature Suites
            </h2>
            <p className="text-[#6B5B54] max-w-2xl mx-auto">
              Forty individually designed sanctuaries, each offering floor to ceiling views of the alpine landscape.
            </p>
          </div>

          <div className="space-y-16">
            {suites.map((suite, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#3A332E] to-[#6B5B54] shadow-lg">
                    {index === 0 && (
                      <Image
                        src="/images/feature.png"
                        alt={suite.name}
                        fill
                        className="object-cover"
                      />
                    )}
                    {index !== 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white/60">
                          <Mountain className="w-16 h-16 mx-auto mb-4 opacity-40" />
                          <p className="font-serif text-xl">{suite.name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#3A332E] mb-4">
                    {suite.name}
                  </h3>
                  <p className="text-[#6B5B54] text-lg leading-relaxed mb-6">
                    {suite.description}
                  </p>
                  <p className="text-[#1B4D3E] font-semibold text-xl mb-6">
                    {suite.price}
                  </p>
                  <Button
                    asChild
                    className="bg-[#1B4D3E] hover:bg-[#1B4D3E]/90 text-white"
                  >
                    <a href="#contact">Reserve This Suite</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-20 lg:py-28 bg-[#FEFDFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#1B4D3E] font-medium mb-3 tracking-wide uppercase text-sm">
              Services
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A332E] mb-4">
              Amenities & Services
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[#1B4D3E] flex items-center justify-center group-hover:bg-[#1B4D3E] transition-colors">
                  <amenity.icon className="w-7 h-7 text-[#1B4D3E] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-[#3A332E] mb-2">{amenity.title}</h3>
                <p className="text-[#6B5B54] text-sm">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Masonry */}
      <section className="py-20 lg:py-28 bg-[#F9F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#1B4D3E] font-medium mb-3 tracking-wide uppercase text-sm">
              Gallery
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A332E] mb-4">
              Moments at Alpine Haven
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { span: 'col-span-2 row-span-2', color: 'from-[#1B4D3E] to-[#2A5F4E]', text: 'Winter Mornings' },
              { span: '', color: 'from-[#6B5B54] to-[#8B7B74]', text: 'Spa Retreat' },
              { span: '', color: 'from-[#3A332E] to-[#5A534E]', text: 'Alpine Dining' },
              { span: '', color: 'from-[#8B7B74] to-[#6B5B54]', text: 'Peak Views' },
              { span: '', color: 'from-[#2A5F4E] to-[#1B4D3E]', text: 'Fireplace Lounge' },
              { span: 'col-span-2', color: 'from-[#5A534E] to-[#3A332E]', text: 'Sunset Terrace' },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.span} aspect-square rounded-xl bg-gradient-to-br ${item.color} flex items-end p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow`}
              >
                <p className="text-white font-serif text-lg sm:text-xl">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 lg:py-28 bg-[#FEFDFB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#1B4D3E] font-medium mb-3 tracking-wide uppercase text-sm">
              Guest Experiences
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A332E] mb-4">
              What Our Guests Say
            </h2>
          </div>

          <div className="relative">
            <Card className="bg-[#F9F6F1] border-0 shadow-lg">
              <CardContent className="p-8 sm:p-12">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#1B4D3E] fill-[#1B4D3E]" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl sm:text-2xl text-[#3A332E] text-center mb-8 leading-relaxed">
                  &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#1B4D3E] flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[currentTestimonial].initials}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#3A332E]">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-sm text-[#6B5B54]">
                      {testimonials[currentTestimonial].title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-[#1B4D3E] flex items-center justify-center text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-[#1B4D3E] flex items-center justify-center text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-[#1B4D3E]' : 'bg-[#E8E2DA]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing" className="py-20 lg:py-28 bg-[#F9F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#1B4D3E] font-medium mb-3 tracking-wide uppercase text-sm">
              Packages
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A332E] mb-4">
              Stay Packages
            </h2>
            <p className="text-[#6B5B54] max-w-2xl mx-auto">
              Choose the experience that suits your alpine escape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden ${
                  tier.featured
                    ? 'bg-[#1B4D3E] text-white border-0 shadow-xl scale-105'
                    : 'bg-[#FEFDFB] border-[#E8E2DA]'
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-4 right-4 bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-8">
                  <h3
                    className={`font-serif text-2xl mb-2 ${
                      tier.featured ? 'text-white' : 'text-[#3A332E]'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span
                      className={`font-serif text-4xl ${
                        tier.featured ? 'text-white' : 'text-[#1B4D3E]'
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span
                      className={tier.featured ? 'text-white/70' : 'text-[#6B5B54]'}
                    >
                      {tier.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <Check
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            tier.featured ? 'text-white/80' : 'text-[#1B4D3E]'
                          }`}
                        />
                        <span
                          className={tier.featured ? 'text-white/90' : 'text-[#6B5B54]'}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${
                      tier.featured
                        ? 'bg-white text-[#1B4D3E] hover:bg-white/90'
                        : 'bg-[#1B4D3E] text-white hover:bg-[#1B4D3E]/90'
                    }`}
                  >
                    <a href="#contact">Reserve Now</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Full */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#1B4D3E] to-[#2A5F4E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Your Alpine Sanctuary Awaits
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join our exclusive guest list and receive seasonal offers, curated experience
            packages, and first access to special events at Alpine Haven.
          </p>
          {newsletterStatus === 'success' ? (
            <div className="bg-white/10 rounded-lg p-6 inline-block">
              <p className="text-white font-medium">
                ✓ Welcome to the Alpine Haven community
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
              />
              <Button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="bg-white text-[#1B4D3E] hover:bg-white/90 whitespace-nowrap"
              >
                {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          )}
          {newsletterStatus === 'error' && (
            <p className="text-white/80 mt-4 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </section>

      {/* Contact Split */}
      <section id="contact" className="py-20 lg:py-28 bg-[#FEFDFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Info */}
            <div>
              <p className="text-[#1B4D3E] font-medium mb-3 tracking-wide uppercase text-sm">
                Reservations
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A332E] mb-6">
                Begin Your Alpine Journey
              </h2>
              <p className="text-[#6B5B54] text-lg mb-8 leading-relaxed">
                Our guest relations team is available to assist with reservations,
                custom itineraries, and any special requests. We look forward to
                welcoming you to Alpine Haven.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F9F6F1] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#1B4D3E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#3A332E] mb-1">Location</h3>
                    <p className="text-[#6B5B54]">Swiss Alps, Switzerland</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F9F6F1] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#1B4D3E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#3A332E] mb-1">Email</h3>
                    <a href="mailto:reservations@alpinehaven.ch" className="text-[#1B4D3E] hover:underline">
                      reservations@alpinehaven.ch
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F9F6F1] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#1B4D3E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#3A332E] mb-1">Concierge</h3>
                    <p className="text-[#6B5B54]">Available 24/7 via contact form</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <Card className="bg-[#F9F6F1] border-0 shadow-lg">
                <CardContent className="p-8">
                  {formStatus === 'success' ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-[#1B4D3E] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-serif text-2xl text-[#3A332E] mb-2">
                        Request Received
                      </h3>
                      <p className="text-[#6B5B54]">
                        Our concierge team will contact you within 24 hours to confirm your reservation details.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#3A332E] mb-2">
                            Full Name
                          </label>
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="bg-white border-[#E8E2DA]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#3A332E] mb-2">
                            Email
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="bg-white border-[#E8E2DA]"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#3A332E] mb-2">
                            Check In
                          </label>
                          <Input
                            type="date"
                            value={formData.checkIn}
                            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className="bg-white border-[#E8E2DA]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#3A332E] mb-2">
                            Check Out
                          </label>
                          <Input
                            type="date"
                            value={formData.checkOut}
                            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                            min={formData.checkIn || new Date().toISOString().split('T')[0]}
                            required
                            className="bg-white border-[#E8E2DA]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#3A332E] mb-2">
                          Number of Guests
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          required
                          className="w-full px-3 py-2 bg-white border border-[#E8E2DA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] text-[#3A332E]"
                        >
                          <option value="">Select guests</option>
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5+">5+ Guests</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#3A332E] mb-2">
                          Special Requests
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          placeholder="Suite preferences, dietary requirements, special occasions..."
                          className="bg-white border-[#E8E2DA]"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full bg-[#1B4D3E] hover:bg-[#1B4D3E]/90 text-white"
                      >
                        {formStatus === 'loading' ? 'Sending Request...' : 'Request Reservation'}
                      </Button>
                      {formStatus === 'error' && (
                        <p className="text-red-600 text-sm text-center">
                          Something went wrong. Please try again or contact us directly.
                        </p>
                      )}
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3A332E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-serif text-2xl mb-4">Alpine Haven</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                A sanctuary of refined mountain luxury in the heart of the Swiss Alps.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#suites" className="text-white/70 hover:text-white transition-colors">
                    Our Suites
                  </a>
                </li>
                <li>
                  <a href="#experiences" className="text-white/70 hover:text-white transition-colors">
                    Experiences
                  </a>
                </li>
                <li>
                  <a href="#amenities" className="text-white/70 hover:text-white transition-colors">
                    Dining
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-white/70 hover:text-white transition-colors">
                    Packages
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Information</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#contact" className="text-white/70 hover:text-white transition-colors">
                    Reservations
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/70 hover:text-white transition-colors">
                    Gift Cards
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/70 hover:text-white transition-colors">
                    Press Inquiries
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/70 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4 mb-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <p className="text-white/70 text-sm">
                Swiss Alps, Switzerland
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Alpine Haven. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#contact" className="text-white/50 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#contact" className="text-white/50 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
