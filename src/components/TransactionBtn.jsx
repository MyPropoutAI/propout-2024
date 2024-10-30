import {
  ConnectButton,
  TransactionButton,
  useActiveWallet,
  useActiveWalletChain,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

import { client, chain } from "../lib/constants";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const TransactionBtn = ({
  text,
  style,
  transaction,
  onTransactionConfirmed,
  onError,
}) => {
  const wallet = useActiveWallet();
  const chainId = useActiveWalletChain();

  return (
    <div>
      {wallet && chainId.id == chain.id ? (
        <TransactionButton
          transaction={transaction}
          onTransactionConfirmed={onTransactionConfirmed}
          onError={onError}
          style={style}
        >
          {text}
        </TransactionButton>
      ) : (
        <ConnectButton
          connectButton={{
            style: {
              backgroundImage: "linear-gradient(to right, #C064F8, #FF087F)",
              color: "#FFF",
              padding: "20px",
              width: "100%",
              borderRadius: "8px",
              opacity: ".5",
            },
          }}
          client={client}
          wallets={wallets}
          chain={chain}
          switchButton={{
            label: "Wrong Network",
            style: {
              padding: "8px 20px",
              border: "1px solid white",
              width: "100%",

              borderRadius: "8px",
            },
          }}
        />
      )}
    </div>
  );
};

export default TransactionBtn;
