import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
const Footer = () => {
  return (
    <Wrapper>
      <div className=" flex justify-between gap-10 px-10 items-center">
        <section className="flex-1 text-[#964CC3]">
          <div>
            <img src="src/components/IMG/pro2 1.svg" alt="" />
          </div>
          <p>Own properties on Propout, and flip at your convenience. </p>
          <p>
            We've enabled properties and other real estate assets further
            visibility through the Prop-tech digital market. Hence a safe and
            trusted tool for all kinds of real estate market
          </p>
        </section>
        <section className="flex-1 flex flex-col gap-5 text-center text-[#964CC3]">
          <div>
            <Link to="" className="underline">
              About us
            </Link>
          </div>
          <div>
            <Link to="" className="underline">
              Contact us
            </Link>
          </div>
          <div>
            <Link to="" className="underline">
              Join waitlist
            </Link>
          </div>
        </section>
        <section className="flex-1">
          <p className="text-[#E08400] font-poppins  md:font-bold text-2xl">
            Follow Us
          </p>
          <div className="flex ">
            <Link to="">
              {" "}
              <img
                className="h-5 w5 mx-1"
                src="src/components/img/logos_facebook.svg"
                alt="Facebook"
              />{" "}
            </Link>
            <Link to="">
              {" "}
              <img
                className="h-5 w5 mx-1"
                src="src/components/img/bi_linkedin.svg"
                alt="linkedin"
              />{" "}
            </Link>
            <Link to="">
              {" "}
              <img
                className="h-5 w5 mx-1"
                src="src/components/img/formkit_twitter.svg"
                alt="X(Twitter)"
              />{" "}
            </Link>

            <Link to="">
              {" "}
              <img
                className="h-5 w5 mx-1"
                src="src/components/img/ri_instagram-fill.svg"
                alt="Instagram"
              />
            </Link>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default Footer;
