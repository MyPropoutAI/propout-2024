import { Web3Button } from "@thirdweb-dev/react";

function Web3Btn({ text }) {
  return (
    <Web3Button
      contractAddress="0x5d053EDe66f15A43CD55fFb1Df67754A76DB88F2"
      action={(contract) => {
        console.log(contract);
      }}
    >
      listProperty
    </Web3Button>
  );
}

export default Web3Btn;
