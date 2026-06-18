import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import ScrollReveal from '@/components/ScrollReveal'
import Testimonials from '@/components/Testimonials'

const sampleProjects = [
  {
    id: '1',
    title: 'Brand Storytelling',
    category: 'VIDEO',
    description: 'Cinematic brand films that captivate audiences',
    media: '/videos/brand-storytelling.jpg',
    type: 'image',
  },
  {
    id: '2',
    title: 'Product Launch',
    category: 'VIDEO',
    description: 'Dynamic product showcase content',
    media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    type: 'image',
  },
  {
    id: '3',
    title: 'Drone Cinematography',
    category: 'DRONE',
    description: 'Aerial perspectives for real estate and events',
    media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    type: 'image',
  },
]

export default function Home() {
  return (
    <div className="bg-dark">
      <Hero />

      <ScrollReveal>
        <section className="px-6 py-32 md:px-12 max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              What We Create
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Premium cinematic content that transforms brands into stories.
              From concept to delivery, we craft visual experiences that resonate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleProjects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 0.15}>
                <div className="group cursor-pointer">
                  <div className="h-64 bg-dark-secondary rounded-lg overflow-hidden mb-6 relative">
                    <img
                      src={project.media}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                      <span className="text-white font-light tracking-widest text-sm uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white px-6 py-2">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-light mb-2 group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm uppercase tracking-wider mb-3">
                    {project.category}
                  </p>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <StatsSection />

      <Testimonials />

      <ScrollReveal direction="up">
        <section className="px-6 py-20 md:px-12 bg-dark-secondary">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">
              Ready to Tell Your Story?
            </h2>
            <a
              href="/book"
              className="inline-block px-12 py-4 bg-white text-black font-medium hover:bg-gray-200 transition-colors rounded-sm"
            >
              Book a Consultation
            </a>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}