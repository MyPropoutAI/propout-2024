import {
  Users,
  Zap,
  Building2,
  Shield,
  BarChart3,
  Brain,
  Gift,
} from "lucide-react";
import Newsletter from "../../components/NewsLetter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main>
        {/* Hero Section */}
        <section
          className="py-16 px-4 bg-gradient-to-r bg-purple-600 to-purple-950 w-full"
          style={{
            backgroundImage: "url(/images/propoutAbout.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-white">ABOUT US</h1>
            <p className="max-w-4xl mx-auto text-white text-lg leading-relaxed mb-12">
              Propouts emergence as a Real Estate Network Technology (RENT)
              presents a groundbreaking opportunity for Nigeria. As the real
              estate sector evolves into a single marketplace, both on a
              national and global scale, Propouts impact on the countrys
              economic growth and sustainability cannot be overstated.
            </p>
          </div>
        </section>

        {/* Making a Difference Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-800">
              HERE WE ARE MAKING A DIFFERENCE
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-purple-100 p-8 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-4 text-purple-800">
                  AI AUTOMATION
                </h3>
                <p>No errors. Garbage in Garbage out</p>
              </div>
              <div className="bg-purple-100 p-8 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-4 text-purple-800">
                  100% TRANSPARENCY AND SPEED
                </h3>
                <p>Secured through blockchain technology</p>
              </div>
              <div className="bg-purple-100 p-8 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-4 text-purple-800">
                  100% COMMUNITY SATISFACTION
                </h3>
                <p>Open participation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Best Services Section */}
        <section className="py-16 px-4 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-purple-800">
              How it works
            </h2>
            <h3 className="text-2xl font-bold text-center mb-12 text-purple-800">
              Our best services
            </h3>
            <p className="text-center mb-12 max-w-2xl mx-auto">
              Utilizing the Propout AI to checkmate and conveniently flip
              property assets remotely. Open participation for all kinds of
              users with the following in-built AI tech integrations to foster
              trust, transparency, and convenience.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Building2, title: "Property trading system" },
                { icon: Shield, title: "Property allocation system" },
                { icon: BarChart3, title: "Property Identification system" },
                { icon: Users, title: "Property verification system" },
                { icon: Brain, title: "AI assistance" },
                { icon: Zap, title: "Governance" },
              ].map((service, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-purple-800 rounded-full p-4">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium">{service.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-purple-800">
              User Benefits
            </h2>
            <p className="text-center mb-12">
              Built for everyone to be inclusive in the real estate game.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                "Investment",
                "Fractional ownership",
                "Community and crowding",
                "Property information request and data",
                "Property proof of ownership",
                "Making informed property decisions",
                "A.I Chatbot",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-purple-800 rounded-full p-4">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="py-16 px-4 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-800">
              OUR ROAD MAP
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-center mb-8 text-purple-800">
                ROADMAP 2024
              </h3>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    quarter: "Q1 2024",
                    date: "January - February",
                    items: [
                      "Social media Launch",
                      "Community Launch",
                      "Website/MVP Launch",
                    ],
                  },
                  {
                    quarter: "Q2 2024",
                    date: "April - May",
                    items: [
                      "Coin Offering Ceremony",
                      "Pre-Sale",
                      "Product development",
                    ],
                  },
                  {
                    quarter: "Q3 2024",
                    date: "July - October",
                    items: [
                      "Testnet Deployment",
                      "Mainnet Deployment",
                      "Product Launch",
                    ],
                  },
                  {
                    quarter: "Q4 2024",
                    date: "December",
                    items: ["Product Launch Party"],
                  },
                ].map((phase, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-purple-100 p-6 rounded-lg">
                      <h4 className="font-bold mb-2 text-purple-800">
                        {phase.quarter}
                      </h4>
                      <p className="text-sm mb-4">{phase.date}</p>
                      <ul className="text-left">
                        {phase.items.map((item, i) => (
                          <li key={i} className="mb-2">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Newsletter />
      </main>
    </div>
  );
}
