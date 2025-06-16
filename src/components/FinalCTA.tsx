import { Mail, MessageCircle, Bitcoin, ArrowRight } from 'lucide-react'
import homePageData from '@/data/homePageData.json'

const FinalCTA = () => {
  const { contact } = homePageData

  const getIcon = (iconName: string) => {
    const icons = {
      Mail,
      MessageCircle,
      Bitcoin,
      ArrowRight,
    }
    return icons[iconName as keyof typeof icons] || Mail
  }

  return (
    <section className={contact.sectionClassName}>
      <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/5 via-transparent to-transparent"></div>

      <div className={contact.containerClassName}>
        <div className="mb-16 space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            {contact.title}
          </h2>
          <p className="text-xl text-soft-gray max-w-2xl mx-auto">
            {contact.subtitle}
          </p>

          <a
            href={contact.primaryButton.href}
            className={contact.primaryButton.className}
          >
            {contact.primaryButton.text}
            {(() => {
              const IconComponent = getIcon(contact.primaryButton.icon)
              return (
                <IconComponent className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              )
            })()}
          </a>
        </div>

        <div className="border-t border-gray-800 pt-16 space-y-8">
          <h3 className="text-2xl font-bold text-white">
            {contact.contactTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contact.contacts.map((contactItem, index) => {
              const IconComponent = getIcon(contactItem.icon)
              return (
                <div key={index} className={contact.contactCardClassName}>
                  <IconComponent className={contactItem.iconClassName} />
                  <h4 className="text-white font-semibold">
                    {contactItem.title}
                  </h4>
                  {contactItem.href ? (
                    <a
                      href={contactItem.href}
                      className="text-soft-gray hover:text-neon-blue transition-colors block"
                    >
                      {contactItem.value}
                    </a>
                  ) : (
                    <p className="text-soft-gray">{contactItem.value}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">{contact.copyright}</p>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
