import { Button } from "../../components/ui/button";

const About = () => {
  return (
    <div className="flex flex-col space-y-4 items-center py-10 px-16">
      <h1 className="text-3xl font-bold text-center">About Us</h1>
      <p className="w-[70%] text-[14px]">
        Propout' s emergence as a Real Estate Network Technology (RENT) presents
        a groundbreaking opportunity for Nigeria. As the real estate sector
        evolves into a single marketplace, both on a national and global scale,
        Propout' s impact on the country ' s economic growth and sustainability
        cannot be overstated. Here, we delve into the myriad ways in which
        Propout is poised to redefine Nigeria ' s real estate landscape and
        contribute significantly to its economic prosperity, including tax
        revenue generation. As Propout continues its transformative journey in
        the real estate landscape, the introduction of artificial intelligence
        (AI) capabilities amplifies its potential.
      </p>
      <Button className="py-2 my-3  text-center font-semibold rounded-md bg-gradient-to-r from-[#C064F8] to-[#FF087F] text-white  px-4  shadow-sm">
        Learn More...
      </Button>
    </div>
  );
};

export default About;
