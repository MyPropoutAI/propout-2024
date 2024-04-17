import { useContext, createContext } from "react";
import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";

import { toast } from "sonner";

const StateContext = createContext();

export const Context = ({ children }) => {
  const client = createThirdwebClient({
    clientId: "1639134fe6d77249631aa361f3a9cbe1",
  });
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
      // setListed(true);
    } catch (err) {
      toast.error("Something went wrong", { description: err.reason });
    }
  };

  return (
    <StateContext.Provider value={{ contract, address, callListProperty }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
