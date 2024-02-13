import GetStarted from "./GetStarted";
import HowItWorks from "./HowItWorks";
import ListHero from "./ListHero";

import ChatBot from "../../components/ChatBot";
import Featured from "./Featured";

const List = () => {
  return (
    <div className="bg-main">
      <ListHero />
      <HowItWorks />
      <GetStarted />
      <Featured />
      <ChatBot />
    </div>
  );
};

export default List;
