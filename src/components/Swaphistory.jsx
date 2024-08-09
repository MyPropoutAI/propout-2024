import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    date: "May 8, 4.30pm",
    from: "LISK",
    to: "USDT",
    address: "0x9cBe3..c13",
  },
  {
    date: "May 9, 12.30pm",
    from: "USDT",
    to: "LISK",
    address: "0x9cBe3..c13",
  },
  {
    date: "May 10, 2.30pm",
    from: "LISK",
    to: "USDT",
    address: "0x9cBe3..c13",
  },
  {
    date: "May 10, 2.30pm",
    from: "LISK",
    to: "USDT",
    address: "0x9cBe3..c13",
  },
  {
    date: "May 10, 2.30pm",
    from: "LISK",
    to: "USDT",
    address: "0x9cBe3..c13",
  },
  {
    date: "May 11, 12.30pm",
    from: "USDT",
    to: "LISK",
    address: "0x9cBe3..c13",
  },
];

const Swaphistory = () => {
  return (
    <div className="text-[#FFFF]/50">
      <p className=" text-left text-gray-900 px-3 text-lg py-3">
        Recent trades
      </p>
      <hr />

      <div className="w-full">
        <Table>
          <TableCaption>A list of your recent Transactions.</TableCaption>
          <TableHeader className="text-gray-900">
            <TableRow>
              <TableHead className="text-gray-900">Date</TableHead>
              <TableHead className="text-gray-900">From</TableHead>
              <TableHead className="text-gray-900">To</TableHead>
              <TableHead className="text-right text-gray-900">
                Address
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((items, index) => {
              return (
                <TableRow
                  key={index}
                  className="md:text-[15px] text-[12px] font-light text-gray-700"
                >
                  {
                    <TableCell
                      className="md:font-medium font-light text-gray-700"
                      key={index}
                    >
                      {items.date}
                    </TableCell>
                  }
                  {
                    <TableCell
                      className="md:font-medium font-light text-gray-700"
                      key={index}
                    >
                      {items.from}
                    </TableCell>
                  }
                  {
                    <TableCell
                      className="md:font-medium font-light text-gray-700"
                      key={index}
                    >
                      {items.to}
                    </TableCell>
                  }
                  {
                    <TableCell className="md:font-medium font-light text-right text-gray-700">
                      {items.address}
                    </TableCell>
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Swaphistory;
