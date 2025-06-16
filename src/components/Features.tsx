import { Shield, Key, Rocket } from "lucide-react"
import homePageData from "@/data/homePageData.json"

const Features = () => {
  const { features } = homePageData

  const getIcon = (iconName: string) => {
    const icons = {
      Shield,
      Key,
      Rocket,
    }
    return icons[iconName as keyof typeof icons] || Shield
  }

  return (
    <section className={features.sectionClassName}>
      <div className={features.containerClassName}>
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">{features.title}</h2>
          <p className="text-xl text-soft-gray max-w-2xl mx-auto">{features.subtitle}</p>
        </div>

        <div className={features.gridClassName}>
          {features.features.map((feature, index) => {
            const IconComponent = getIcon(feature.icon)
            return (
              <div key={index} className={feature.itemClassName}>
                <div className="flex justify-center">
                  <div className={feature.iconContainerClassName}>
                    <IconComponent className={feature.iconClassName} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>

                <p className="text-soft-gray leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
