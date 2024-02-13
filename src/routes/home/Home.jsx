import ChatBot from "../../components/ChatBot";
import Builtfor from "./Builtfor";
import HomeHero from "./HomeHero";
import Mobilesneak from "./Mobilesneak";

const Home = () => {
  return (
    <div className=" bg-main">
      <HomeHero />
      <Mobilesneak />
      <Builtfor />
      <ChatBot />
    </div>
  );
};

export default Home;
