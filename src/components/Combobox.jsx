import { Button } from "../components/ui/button";
import { Combobox } from "../components/ui/combobox";

const Combobox2 = () => {
  return (
    <div className="p-4 md:p-6 bg-white gap-5 flex flex-wrap justify-center">
      <Combobox
        options={[
          {
            value: "abuja",
            label: "Abuja",
          },
        ]}
        trigger={"Choose area"}
        search={"area"}
        className="flex-1"
      />
      <Combobox
        options={[
          {
            value: "good",
            label: "Good",
          },
        ]}
        trigger={"Property status"}
        search={"status"}
        className="flex-1"
      />
      <Combobox
        options={[
          {
            value: "abuja",
            label: "Abuja",
          },
        ]}
        trigger={"Property type"}
        search={"type"}
        className="flex-1"
      />

      <Button
        className="hover:shadow-md px-10 rounded-md flex-1 "
        variant="rent"
      >
        Find now
      </Button>
    </div>
  );
};

export default Combobox2;
