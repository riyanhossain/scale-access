import { Star } from 'lucide-react'
import homePageData from '@/data/homePageData.json'

const Testimonials = () => {
  const { testimonials } = homePageData

  return (
    <section id="trusted-by" className={testimonials.sectionClassName}>
      <div className={testimonials.containerClassName}>
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            {testimonials.title}
          </h2>
          <p className="text-xl text-soft-gray max-w-2xl mx-auto">
            {testimonials.subtitle}
          </p>
        </div>

        <div className={testimonials.gridClassName}>
          {testimonials.testimonials.map((testimonial, index) => (
            <div key={index} className={testimonials.cardClassName}>
              <div className="flex items-center gap-1">
                {[...Array(testimonials.starIcon.count)].map((_, i) => (
                  <Star key={i} className={testimonials.starIcon.className} />
                ))}
              </div>

              <blockquote className="text-soft-gray text-lg leading-relaxed italic font-mono">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className={testimonial.avatarClassName}>
                  {testimonial.author[1]}
                </div>
                <div>
                  <div className="text-white font-semibold">
                    {testimonial.author}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
