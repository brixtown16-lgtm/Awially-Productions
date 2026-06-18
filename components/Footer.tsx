'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-secondary border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-light tracking-tight mb-4">AWIALLY PRODUCTIONS</h3>
            <p className="text-gray-400 text-sm">
              Premium cinematic content creation for brands and creators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-white mb-6">Navigate</h4>
            <ul className="space-y-3">
              {['Home', 'Portfolio', 'Book', 'Admin'].map(item => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {['Video Production', 'Photography', 'Drone', 'Animation'].map(service => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-6">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">info@awiably.com</li>
              <li className="text-gray-400">+25724052540</li>
              <li className="text-gray-400">Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} Awially Productions. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
