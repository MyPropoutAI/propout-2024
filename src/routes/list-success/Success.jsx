import Wrapper from "../../components/Wrapper";
import { Button } from "../../components/ui/button";

const Success = () => {
  return (
    <div>
      <Wrapper>
        <div className="text-center text-success py-10 lg:py-16 flex flex-col justify-center items-center">
          <img src="/images/success-check.png" alt="" />
          <p className="mt-8 text-3xl">Payment Successful</p>
          <Button className="mt-10 px-20 text-white">Got to marketplace</Button>
        </div>
      </Wrapper>
    </div>
  );
};

export default Success;
