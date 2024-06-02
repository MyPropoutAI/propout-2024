import { Button } from "../../components/ui/button";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";
import times from "lodash/times";

const Testing = () => {
  return (
    <>
      <div style={{ height: "500px" }}>
        <Marquee
          velocity={12}
          minScale={0.7}
          resetAfterTries={200}
          scatterRandomly
        >
          {times(5, Number).map((id) => (
            <Motion
              key={`child-${id}`}
              initDeg={randomIntFromInterval(0, 360)}
              direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
              velocity={10}
              radius={50}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "yellow",
                  textAlign: "center",
                  lineHeight: "50px",
                }}
              >
                {id}
              </div>
            </Motion>
          ))}
        </Marquee>
      </div>

      <div>
        1. public/images/investment.svg 2. Fractional_ownership 3.
        public/images/Community_crowding.svg 4.
        public/images/property_information.svg 5.
        public/images/property_proof.svg 6.
        public/images/Making_informed_property_decisions.svg 7.
        public/images/ai_assistance.svg
      </div>
    </>
  );
};

export default Testing;
