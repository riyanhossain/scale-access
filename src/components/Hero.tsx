import { ChevronRight, Play } from "lucide-react"
import homePageData from "@/data/homePageData.json"

const Hero = () => {
  const { hero } = homePageData

  const gridSvg = encodeURIComponent(`
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <g fill="#374151" fillOpacity="0.1">
          <circle cx="30" cy="30" r="1"/>
        </g>
      </g>
    </svg>
  `)

  return (
    <section
      className={`relative min-h-screen w-full ${hero.background.gradientClassName} flex items-center justify-center overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-20">
        {hero.background.animatedElements.map((element, index) => (
          <div key={index} className={element.className}></div>
        ))}
      </div>

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,${gridSvg}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "60px 60px",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-true-black/50 to-true-black/80"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className={`${homePageData.animations.fadeInUp} space-y-8`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {hero.title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-400">
                {hero.highlightTitle}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-soft-gray max-w-3xl mx-auto leading-relaxed">{hero.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={hero.primaryButton.href} className={hero.primaryButton.className}>
                {hero.primaryButton.text}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a href={hero.secondaryButton.href} className={hero.secondaryButton.className}>
                <Play className="w-5 h-5" />
                {hero.secondaryButton.text}
              </a>
            </div>
          </div>

          <div className={`${homePageData.animations.fadeInUpDelay} mt-16 w-full`}>
            <div className={hero.mockup.containerClassName}>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  {hero.mockup.browserColors.map((color, index) => (
                    <div key={index} className={`w-3 h-3 ${color} rounded-full`}></div>
                  ))}
                </div>
                <div className="text-soft-gray text-sm font-medium">{hero.mockup.title}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {hero.stats.map((stat, index) => (
                  <div key={index} className={`${hero.mockup.statsClassName} ${stat.className}`}>
                    <div className={`text-3xl sm:text-4xl font-bold mb-2 ${stat.className.split(" ")[0]}`}>
                      {stat.value}
                    </div>
                    <div className="text-soft-gray text-sm uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
