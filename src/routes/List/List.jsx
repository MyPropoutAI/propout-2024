import {
  Building2,
  MessageCircle,
  Search,
  User,
  FileText,
  Briefcase,
  Users,
  Brain,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Newsletter from "../../components/NewsLetter";

export default function List() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative bg-gradient-to-r bg-[#220136] to-purple-950 w-full overflow-hidden"
        style={{
          backgroundImage: "url(/images/exp.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                List Properties online
              </h1>
              <p className="text-gray-100 text-lg mb-8">
                Re-list random properties up for sale or to let. Join the next
                estate affiliate markets
              </p>
              {user ? (
                <Link to="/dashboard">
                  <Button className="border border-purple-500 border-solid text-white">
                    Continue to dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/auth/login">
                  <Button className="border border-purple-500 border-solid text-white">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
            <div className="relative h-[400px]">
              <img
                src="/images/exp2.png"
                alt="Property Listing Illustration"
                className="w-[40rem]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative h-[600px]">
              <img
                src="/images/prop_2-removebg-preview 1.svg"
                alt="Mobile App Screenshots"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 space-x-2">
              <div>
                <h3 className="text-xl font-bold mb-4 py-2 px-4 bg-yellow-400 rounded-md">
                  Case Scenario 1
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Building2 className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Find a listed property</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Re-list on PROPOUT</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Search className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Clients scout for properties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Negotiate (physical or virtual)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Deal-breaker</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <User className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Earn percentage</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 py-2 px-4 bg-yellow-400 rounded-md">
                  Case Scenario 2
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Link Property data with Propout AI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>PROPOUT AI authenticates data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Building2 className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>List real estate property on Propout</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Search className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Virtual inspection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Vetting (Proof of ownership) through P2 system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Deal-breaker</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>
                      AI process payment and records transaction data and
                      history
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 py-2 px-4 bg-yellow-400 rounded-md">
                  Case Scenario 3
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Save files, PDFs, Documents, and Digital assets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Stake assets for long-term rewards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Users className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Learn or facilitate other digital skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Contribute to Propout AI awareness and adoption</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-4">
                      <Users className="h-5 w-5 text-purple-600" />
                    </span>
                    <span>Identify with a thriving community</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-2">
              Looking for a dream home
            </h2>
            <p className="text-gray-600 mb-6">
              We streamline your property desires
            </p>
            <Link to={"/marketplace"}>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700">
                Explore Properties
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ChatBot */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
      <Newsletter />
    </div>
  );
}
