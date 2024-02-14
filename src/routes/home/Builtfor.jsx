import Wrapper from "../../components/Wrapper";
import { Button } from "../../components/ui/button";

const cards = [
  {
    title: "COMMUNITIES",
    desc: "Streamlined property listing, search, and house hunting process",
  },
  {
    title: "GOVERNMENT",
    desc: "Property Identification Database System. Improved digital and economic security. Projecting pacesetter for further digital economic innovations to come...",
  },
  {
    title: "INNOVATORS",
    desc: "Adopt and leverage the use of AI tools to enhance the digital economy",
  },
  {
    title: "INVESTORS",
    desc: " Property asset investment opportunities. Both foreign and local participation",
  },
];

const Builtfor = () => {
  return (
    <div className=" bg-decoration-line bg-cover bg-center">
      <Wrapper>
        <div className="text-center text-white text-2xl md:text-3xl py-10">
          <p className="font-[700]">Propout is Built For:</p>
          <div className="mt-10 flex flex-wrap justify-center gap-10">
            {cards.map((item) => (
              <Card key={item.title} title={item.title} desc={item.desc} />
            ))}
          </div>
          <div className="mt-10">
            <Button variant="normal" className="px-8 md:px-44">
              Rent API
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Builtfor;

const Card = ({ title, desc }) => {
  return (
    <div className="border-8 text-center p-10">
      <p className="text-2xl mb-8 text-orange">{title}</p>
      <p className="text-sm max-w-[300px] leading-relaxed">{desc}</p>
    </div>
  );
};
