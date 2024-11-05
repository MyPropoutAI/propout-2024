import NewsLetter from "../../components/NewsLetter";
import Builtfor from "../home/Builtfor";
import Info from "./Info";
import LandingHero from "./LandingHero";
import Properties from "./Properties";
// import ChatBot from "../../components/ChatBot";

function Index() {
  return (
    <>
      <LandingHero />
      <Info />
      <Properties />
      <Builtfor />
      <NewsLetter />
    </>
  );
}

export default Index;
