import React from "react";
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
    from: "FUSE",
    to: "USDT",
    address: "0x9cBe3..c13",
  },
  {
    date: "May 9, 12.30pm",
    from: "USDT",
    to: "FUSE",
    address: "0x9cBe3..c13",
  },
  {
    date: "May 10, 2.30pm",
    from: "FUSE",
    to: "USDT",
    address: "0x9cBe3..c13",
  },
  {
    date: "May 10, 2.30pm",
    from: "FUSE",
    to: "USDT",
    address: "0x9cBe3..c13",
  },
  {
    date: "May 10, 2.30pm",
    from: "FUSE",
    to: "USDT",
    address: "0x9cBe3..c13",
  },
  {
    date: "May 11, 12.30pm",
    from: "USDT",
    to: "FUSE",
    address: "0x9cBe3..c13",
  },
];

const Swaphistory = () => {
  return (
    <div className="text-[#FFFF]/50">
      <p className=" text-left text-white px-3 text-lg py-3">Recent trades</p>
      <hr />

      <div>
        <Table>
          <TableCaption>A list of your recent Transactions.</TableCaption>
          <TableHeader className="text-[#FFFFFF]">
            <TableRow>
              <TableHead className="">Date</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead className="text-right">Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((items, index) => {
              return (
                <TableRow className="text-[15px] font-light">
                  {
                    <TableCell className="font-medium" key={index}>
                      {items.date}
                    </TableCell>
                  }
                  {
                    <TableCell className="font-medium" key={index}>
                      {items.from}
                    </TableCell>
                  }
                  {
                    <TableCell className="font-medium" key={index}>
                      {items.to}
                    </TableCell>
                  }
                  {
                    <TableCell className="font-medium text-right">
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
