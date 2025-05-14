import { motion } from "framer-motion";
import Section from "../../components/Section";
import CampusMap from "../../components/CampusMap";
import TeamMember from "../../components/TeamMember";
import ContactInfo from "../../components/ContactInfo";
// import Section from "../components/Section";
// import Logo from "../components/Logo";

// import InvestmentTable from "../components/InvestmentTable";
// import ProjectionChart from "../components/ProjectionChart";
// import CampusMap from "../components/CampusMap";
// import TeamMember from "../components/TeamMember";
// import ContactInfo from "../components/ContactInfo";

const Index = () => {
  const teamMembers = [
    {

      image: "/lovable-uploads/t3.jpg",
      name: "Olusola Osinoiki",
      title: "Investor Partner, Advisory, Growth",
    },
    {
      image: "/lovable-uploads/t1.jpg",
      name: "Mrs Comfort",
      title: "Investment Officer",
    },
    {
      image: "/lovable-uploads/pt11.jpg",
      name: "Oghoro Jim Wannabee",
      title: "Investment and Accountability Officer",

    },
    {
      image: "/lovable-uploads/t2.jpg",
      name: "Olivier Magdalene .G.",
      title: "Finance and compliance officer",
    },
    {
      image: "/lovable-uploads/t7.jpg",
      name: "Abraham Ekoh",
      title: "Research and Campus scout",
    },
    {

      image: "/lovable-uploads/t4.jpg",
      name: "Oloyede Goodness .O.",
      title: "Research and Campus scout",
    },

    {

      image: "/lovable-uploads/t5.jpg",
      name: "Odunwa Kome .A.",
      title: "Chief Design and Construction Engineer",
    },
    // {
    //   image: "/lovable-uploads/t6.jpg",
    //   name: "Paulo Ribeiro",
    //   title: "Bus. Partner | U-World Pt | Jorge Properties",
    // },


  ];

  // Enhanced animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="bg-background relative">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-background"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] rounded-full bg-accent/20 blur-[100px]" />
        </div>
        <div className="container mx-auto max-w-7xl z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24">
          <motion.div
            variants={elementVariants}
            className="flex flex-col gap-8 order-2 md:order-1"
          >
            <h1 className="gradient-text text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
              Modern Student Living, <br /> Smart Real Estate Investment
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-xl">
              Discover a new era of student accommodation and property
              investment. Purpose-built, tech-enabled, and designed for growth.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-accent text-primary font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Contact Us
              </a>
              <a

                href="/roicalculator"

                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                ROI Calculator
              </a>
            </div>
          </motion.div>
          <motion.div
            variants={elementVariants}
            className="order-1 md:order-2 flex justify-center relative"
          >
            <div className="relative w-full max-w-md aspect-[4/5] image-card hover-scale">
              <img
                src="/lovable-uploads/pp1.jpg"
                alt="Modern building"
                className="object-cover w-full h-full rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Overview Section */}
      <Section id="overview" title="OVERVIEW" titlePosition="center">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-card p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-2 text-primary">
                Who We Are
              </h2>
              <p className="text-lg text-foreground/80">
                PropOut Limited specializes in the development, management, and
                investment of purpose-built student accommodation. Our AI-driven
                platform enables fractional ownership and seamless property
                management, making student housing investments more accessible
                and profitable for all.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2 image-card aspect-[4/3]">
                <img
                  src="/lovable-uploads/pp5.jpg"
                  alt="Modern architecture"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <div className="w-1/2 image-card aspect-[4/3]">
                <img
                  src="/lovable-uploads/pp6.jpg"
                  alt="Glass building"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="image-card aspect-[4/3] w-full mb-4">
              <img
                src="/lovable-uploads/pp10.jpg"
                alt="Modern building"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-2 text-primary">
                Our Vision
              </h2>
              <p className="text-lg text-foreground/80">
                To democratize real estate investment and redefine student
                living through technology, design, and accessibility.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Investment Section */}
      {/* <Section
        id="investment"
        title="INVESTMENT STRUCTURE"
        titlePosition="center"
      >
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <InvestmentTable />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="image-card aspect-[4/5] w-full">
              <img
                src="/lovable-uploads/pp8.jpg"
                alt="CEO"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
            <div className="image-card aspect-[4/5] w-full">
              <img
                src="/lovable-uploads/pp9.jpg"
                alt="CFO"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </Section> */}

      {/* Goals Section */}
      <Section id="goals" title="OUR GOALS" titlePosition="center">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-card p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-2 text-primary">
                Sustainable Impact
              </h2>
              <ul className="list-disc pl-6 text-lg text-foreground/80 space-y-2">
                <li>
                  SDG 4: Quality Education – Safe, affordable, and enabling
                  environments for learning.
                </li>
                <li>
                  SDG 11: Sustainable Cities – Smart, inclusive, and resilient
                  urban development.
                </li>
              </ul>
            </div>
            <div className="image-card aspect-[4/3] w-full">
              <img
                src="/lovable-uploads/pp2.jpg"
                alt="Engineer"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="image-card aspect-[4/3] w-full">
              <img
                src="/lovable-uploads/pp3.jpg"
                alt="Partner"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-2 text-primary">
                Forward Thinking
              </h2>
              <p className="text-lg text-foreground/80">
                We leverage AI and digital platforms to democratize real estate
                investment and make student living accessible, efficient, and
                future-ready.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Problems Section */}
      <Section id="problems" title="PROBLEMS WE SOLVE" titlePosition="center">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-card p-8 rounded-2xl shadow-xl">
              <ul className="list-disc pl-6 text-lg text-foreground/80 space-y-2">
                <li>Lack of purpose-built student facilities</li>
                <li>Subpar living conditions and unaffordable pricing</li>
                <li>Distance, insecurity, and poor infrastructure</li>
              </ul>
            </div>
            <div className="image-card aspect-[4/3] w-full">
              <img
                src="/lovable-uploads/pp11.jpg"
                alt="Advisor"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="image-card aspect-[4/3] w-full">
              <img
                src="/lovable-uploads/pp12.jpg"
                alt="Modern interior"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-2 text-primary">
                Our Solution
              </h2>
              <p className="text-lg text-foreground/80">
                We build, manage, and invest in modern, secure, and affordable
                student accommodation, using technology to optimize every step.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Solution Section */}
      <Section id="solutions" title="OUR SOLUTION" titlePosition="center">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-card p-8 rounded-2xl shadow-xl">
              <ul className="list-disc pl-6 text-lg text-foreground/80 space-y-2">
                <li>Modern amenities and services tailored to student needs</li>
                <li>
                  Affordable pricing, flexible payment, and per-use charge
                </li>
                <li>Enhanced security, safety, and proximity to campus</li>
              </ul>
            </div>
            <CampusMap />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="image-card aspect-[4/3] w-full">
              <img
                src="/lovable-uploads/pp13.jpg"
                alt="Campus Hot Zones Map"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services" title="OUR SERVICES" titlePosition="center">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8 rounded-2xl shadow-xl flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold text-primary mb-2">
              Purpose-Built Student Accommodation
            </h3>
            <p className="text-base text-foreground/80">
              We develop and manage properties in proximity to top universities,
              ensuring fast uptake and consistent returns.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card p-8 rounded-2xl shadow-xl flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold text-primary mb-2">
              AI-Driven Property Management
            </h3>
            <p className="text-base text-foreground/80">
              Our AI engine matches property demand to listings, automates
              maintenance, and maximizes returns for investors.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl shadow-xl flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold text-primary mb-2">
              Design, Development & Maintenance
            </h3>
            <p className="text-base text-foreground/80">
              From blueprint to finish, we offer full-cycle real estate
              services—design, construction, and lifecycle maintenance.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Feasibility Section */}
      {/* <Section
        id="feasibility"
        title="FEASIBILITY & DEMAND"
        titlePosition="center"
      >
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-card p-8 rounded-2xl shadow-xl">
              <ul className="list-disc pl-6 text-lg text-foreground/80 space-y-2">
                <li>
                  Over 2 million tertiary students in Nigeria, most relying on
                  informal or substandard housing
                </li>
                <li>
                  Urbanization and education expansion driving demand in major
                  cities
                </li>
                <li>
                  Rent growth and high occupancy rates indicate a viable revenue
                  stream
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="image-card aspect-[4/3] w-full">
              <img
                src="/lovable-uploads/pp14.jpg"
                alt="Modern building"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </Section> */}

      {/* Projections Section */}
      {/* <Section
        id="projections"
        title="MARKET PROJECTIONS"
        titlePosition="center"
      >
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <ProjectionChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl shadow-xl flex flex-col gap-4"
          >
            <h3 className="text-2xl font-bold text-primary mb-2">
              Nigeria Real Estate Market
            </h3>
            <p className="text-lg text-foreground/80">
              $17.37 Billion market, +13.63% CAGR (2024-2029), 28M unit housing
              deficit, and rapid urban population growth.
            </p>
          </motion.div>
        </div>
      </Section> */}

      {/* Team Section */}
      <Section id="team" title="OUR TEAM" titlePosition="center">
        <div className="container mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              title={member.title}
              index={index}
            />
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="GET IN TOUCH" titlePosition="center">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <ContactInfo />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="image-card aspect-[4/5] w-full"
          >
            <img
              src="/lovable-uploads/hr1.jpg"
              alt="Modern building interior"
              className="object-cover w-full h-full rounded-xl"
            />
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Index;
