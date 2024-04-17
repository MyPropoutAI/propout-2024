// import { prepareContractCall, resolveMethod } from "thirdweb";
// // import { useSendTransaction } from "@thirdweb-dev/react";
// import { useSendTransaction } from "thirdweb/react";

// import { contract } from "./utils";

// export async function ListPropertyFunction(form) {
//   const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();

//   const {
//     _propertyTitle,
//     price,
//     _description,
//     _images,
//     _propertyAddress,
//     owner,
//   } = form;

//   const transaction = await prepareContractCall({
//     contract,
//     method: resolveMethod("listProperty"),
//     params: [
//       owner,
//       price,
//       _propertyTitle,
//       _images,
//       _propertyAddress,
//       _description,
//     ],
//   });
//   const { transactionHash } = await sendTransaction(transaction);

//   return { transactionHash, isLoading, isError };
// }

import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { contract } from "./utils";

export const useListProperty = () => {
  const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();

  const listProperty = async (form) => {
    const {
      _propertyTitle,
      price,
      _description,
      _images,
      _propertyAddress,
      owner,
    } = form;

    const transaction = await prepareContractCall({
      contract,
      method: resolveMethod("listProperty"),
      params: [
        owner,
        price,
        _propertyTitle,
        _images,
        _propertyAddress,
        _description,
      ],
    });
    console.log(transaction);

    // const { transactionHash } = await sendTransaction(transaction);

    // return { transactionHash, isLoading, isError };
  };

  return { listProperty, isLoading, isError };
};
