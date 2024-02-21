import { useContext, createContext, useState } from "react";
import { useAddress, useContractWrite, useContract } from "@thirdweb-dev/react";

import { toast } from "sonner";

const StateContext = createContext();

export const Context = ({ children }) => {
  const [listed, setListed] = useState(false);

  const { contract } = useContract(
    "0x41b553358eC830A42c677836C995B1E8De38482C"
  );
  const address = useAddress();

  const { mutateAsync: listProperty } = useContractWrite(
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

      toast("Success", {
        description: "Your property have been listed successfully",
        action: {
          label: "View",
          onClick: () => {
            window.open(
              "https://explorer.fuse.io/tx/" + data.receipt.transactionHash,
              "_blank"
            );
          },
        },
      });
      setListed(true);
    } catch (err) {
      toast.error("Something went wrong", { description: err.reason });
    }
  };

  return (
    <StateContext.Provider
      value={{ contract, address, callListProperty, listed, setListed }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
