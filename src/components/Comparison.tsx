import { TrendingUp, DollarSign } from "lucide-react"
import homePageData from "@/data/homePageData.json"

const Comparison = () => {
  const { comparison } = homePageData

  const svgBg = encodeURIComponent(`
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h100v100H0z" fill="none"/>
      <path d="M0 0h50v50H0zM50 50h50v50H50z" fill="#ffffff" fillOpacity="0.02"/>
    </svg>
  `)

  const getIcon = (iconName: string) => {
    const icons = {
      TrendingUp,
      DollarSign,
    }
    return icons[iconName as keyof typeof icons] || TrendingUp
  }

  return (
    <section className={comparison.sectionClassName}>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,${svgBg}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
      ></div>

      <div className={comparison.containerClassName}>
        <div className="flex items-center justify-center">
          <div className={comparison.cardClassName}>
            <div className="flex items-center justify-center gap-4 mb-8">
              {comparison.icons.map((icon, index) => {
                const IconComponent = getIcon(icon.name)
                return <IconComponent key={index} className={icon.className} />
              })}
              <div className={comparison.vsText.className}>{comparison.vsText.text}</div>
            </div>

            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {comparison.title.split("5% of ad spend")[0]}
                <span className="text-red-400">5% of ad spend</span>
                {comparison.title.split("5% of ad spend")[1]}
              </h2>

              <p className="text-xl sm:text-2xl text-soft-gray">
                <span className={comparison.highlightText.own.className}>{comparison.highlightText.own.text}</span> an
                account.
                <span className={comparison.highlightText.run.className}> {comparison.highlightText.run.text}</span>{" "}
                your ops.
                <span className={comparison.highlightText.keep.className}> {comparison.highlightText.keep.text}</span>{" "}
                your profits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Comparison
