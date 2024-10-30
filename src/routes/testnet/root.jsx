import { Outlet } from "react-router-dom";
import Eclipse from "../../components/Eclipse";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";

const TestnetRoot = () => {
  return (
    <>
      <AuthHeader bg="bg-[#2A0144]" />
      <div className="flex justify-center py-6 md:py-20 bg-[#220136] relative isolate">
        <div className="bg-hero absolute inset-0 -z-10 bg-cover bg-center">
          <Eclipse />
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default TestnetRoot;
