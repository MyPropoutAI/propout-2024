// import React from "react";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const theReferrals = [
  {
    name: "Jerry Lame",
    date: "30/1/2024",
    time: "16:20",
    points: "20",
  },
  {
    name: "Benjamin Smith",
    date: "30/1/2024",
    time: "20:20",
    points: "20",
  },
  {
    name: "Rage Cage",
    date: "30/1/2024",
    time: "20:20",
    points: "20",
  },
  {
    name: "Samuel Page",
    date: "30/1/2024",
    time: "16:20",
    points: "20",
  },
  {
    name: "Ahmed Ahmed",
    date: "30/1/2024",
    time: "16:20",
    points: "20",
  },
  {
    name: "Hamzy Hamzat",
    date: "30/1/2024",
    time: "20:20",
    points: "20",
  },
  {
    name: "Ismail Muh",
    date: "30/1/2024",
    time: "20:20",
    points: "20",
  },
  {
    name: "Tracy Goal",
    date: "30/1/2024",
    time: "16:20",
    points: "20",
  },
  {
    name: "Ismail Muh",
    date: "30/1/2024",
    time: "20:20",
    points: "20",
  },
  {
    name: "Tracy Goal",
    date: "30/1/2024",
    time: "16:20",
    points: "20",
  },
];

const Referrals = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Referrals</TableHead>

            <TableHead className="text-right">Referral points</TableHead>
          </TableRow>
        </TableHeader>
        {theReferrals.map((item) => (
          <TableBody key={item.points}>
            <TableRow key={item.date}>
              <TableCell key={item.name}>
                <div className="text-[#2A0144] font-semibold">{item.name}</div>
                <span className="text-[#2A0144]/35 text-[10px] flex gap-1 font-semibold">
                  <span> {item.date}</span>
                  <span>{item.time}</span>
                </span>
              </TableCell>
              <TableCell className="text-right pr-20">
                <div className="">{item.points}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default Referrals;
