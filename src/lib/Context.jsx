import { useContext, createContext } from "react";
import { useAddress, useContractWrite, useContract } from "@thirdweb-dev/react";

import { useToast } from "@/components/ui/use-toast";

const StateContext = createContext();

export const Context = ({ children }) => {
  const { toast } = useToast();
  const { contract } = useContract(
    "0x41b553358eC830A42c677836C995B1E8De38482C"
  );
  const address = useAddress();

  //   functions

  // 1. list properties

  const { mutateAsync: listProperty, isSuccess } = useContractWrite(
    contract,
    "listProperty"
  );
  const callListProperty = async (form) => {
    const { propertyTitle, price, description, images, propertyAddress } = form;
    try {
      const data = await listProperty({
        args: [
          address,
          price,
          propertyTitle,
          images,
          propertyAddress,
          description,
        ],
      });
      toast({
        title: "Success",
        description: "Your property have been listed successfully",
      });
    } catch (err) {
      alert("Something went wrong");
      console.error("contract call failure", err);
    }
  };

  return (
    <StateContext.Provider value={{ contract, address, callListProperty }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
