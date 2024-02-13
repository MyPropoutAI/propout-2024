import Wrapper from "./Wrapper";
import { Button } from "./ui/button";

const ChatBot = () => {
  return (
    <div className=" bg-decoration-line-2 border-t border-gray-400 bg-cover bg-center text-white">
      <Wrapper>
        <div className="py-10 flex flex-col gap-6 justify-center items-center">
          <img src="/images/chatbot.svg" alt="" className="w-20" />
          <Button variant="normal" className="px-8 md:px-44">
            Chat with Propout A.I
          </Button>
        </div>
      </Wrapper>
    </div>
  );
};

export default ChatBot;
