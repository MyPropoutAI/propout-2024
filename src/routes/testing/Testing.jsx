import { Button } from "../../components/ui/button";

const Testing = () => {
  return (
    <div>
      <h1>Buttons</h1>
      <Button variant="orangeBTN" className="rounded-sm">
        Orange Button
      </Button>
      <br />
      <br />
      <Button variant="purpleBTN" className="rounded-sm">
        Purple Button
      </Button>
      <br />
      <br />
      <Button variant="loginBTN" className="rounded-sm">
        Login Button
      </Button>
      <br /> <br />
      <Button variant="caseScenario">Case Scenario</Button>
    </div>
  );
};

export default Testing;
