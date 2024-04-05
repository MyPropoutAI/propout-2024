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

const History = [
  {
    name: "Swap",
    date: "30/1/2024",
    time: "15:20",
    address: "propout1...eefxmx",
    amount: "$120",
    points: "20",
  },
  {
    name: "Swap",
    date: "30/1/2024",
    time: "20:20",
    address: "propout1...eefxmx",
    amount: "$190",
    points: "20",
  },
  {
    name: "Stake",
    date: "30/1/2024",
    time: "20:20",
    address: "propout1...eefxmx",
    amount: "$190",
    points: "20",
  },
  {
    name: "Swap",
    date: "30/1/2024",
    time: "15:20",
    address: "propout1...eefxmx",
    amount: "$120",
    points: "20",
  },
  {
    name: "Stake",
    date: "30/1/2024",
    time: "15:20",
    address: "propout1...eefxmx",
    amount: "$120",
    points: "20",
  },
  {
    name: "Swap",
    date: "30/1/2024",
    time: "15:20",
    address: "propout1...eefxmx",
    amount: "$120",
    points: "20",
  },
  {
    name: "Stake",
    date: "30/1/2024",
    time: "15:20",
    address: "propout1...eefxmx",
    amount: "$120",
    points: "20",
  },
];
const Taskhistory = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="font-semibold text-[#2A0144]">
            <TableHead className="w-[150px]">Task History</TableHead>
            <TableHead className="text-">Address</TableHead>
            <TableHead className="text">Amounts</TableHead>
            <TableHead className="text-">Point</TableHead>
          </TableRow>
        </TableHeader>
        {History.map((item) => (
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="text-[#2A0144] font-semibold">{item.name}</div>
                <span className="text-[#2A0144]/35 text-[10px] flex gap-1 font-semibold">
                  <span> {item.date}</span>
                  <span>{item.time}</span>
                </span>
              </TableCell>
              <TableCell className="text-[#2A0144]/35">
                <div className="">{item.address}</div>
              </TableCell>
              <TableCell className="text">
                <div className="font-bold text-[#2A0144]">{item.amount}</div>
              </TableCell>
              <TableCell className="">
                <div className="text-[#2A0144]/35">{item.points}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default Taskhistory;
