import path from "path";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Rightsidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  const Tasks = [
    {
      name: "Social Task",
      date: "30/1/2024",
      time: "16:20",
      points: "18",
    },
    {
      name: "Social Task",
      date: "30/1/2024",
      time: "16:20",
      points: "18",
    },
    {
      name: "Social Task",
      date: "30/1/2024",
      time: "16:20",
      points: "18",
    },
    {
      name: "Social Task",
      date: "30/1/2024",
      time: "16:20",
      points: "18",
    },
    {
      name: "Social Task",
      date: "30/1/2024",
      time: "16:20",
      points: "18",
    },
    {
      name: "Social Task",
      date: "30/1/2024",
      time: "16:20",
      points: "18",
    },
    {
      name: "Social Task",
      date: "30/1/2024",
      time: "16:20",
      points: "18",
    },
    {
      name: "Social Task",
      date: "30/1/2024",
      time: "16:20",
      points: "18",
    },
    {
      name: "Social Task",
      date: "30/1/2024",
      time: "16:20",
      points: "18",
    },
  ];

  return (
    <div>
      <div className="bg-[#FFFF] p-5 h-fit rounded-md">
        <div className="bg-[#FFFF] text-[#320051] flex flex-col ">
          <div className="justify-center flex flex-col items-center">
            <img src="/images/userpic.svg" alt="" />

            <p className="font-bold">Joel Pillar</p>
            <p className="italic ">Lord of real estate asset worldwide</p>
          </div>

          <div className="flex text-[12px] justify-center font-semibold">
            <p className="flex-1">Joined</p>
            <p className="flex-1 border-l border-l-[#320051] border-solid text-right     italic">
              Mar, 18th 2024
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-[#964CC3] text-[#ffff] py-1 px-5 mt-2 rounded-md">
            Edit Profile
          </button>
        </div>
      </div>

      {pathname == "/dashboard/task" && (
        <div className="bg-white p-5 mt-5 rounded-md">
          <div>
            <Table>
              <TableHeader className="text-[#2A0144] font-semibold">
                <TableRow>
                  <TableHead className="w-[200px]">
                    Social Task History
                  </TableHead>

                  <TableHead className="text-right"> Points</TableHead>
                </TableRow>
              </TableHeader>
              {Tasks.map((task) => (
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="text-[#2A0144] font-bold">
                        {task.name}
                      </div>
                      <span className="text-[#2A0144]/35 text-[10px] flex gap-1 font-semibold">
                        <span> {task.date}</span>
                        <span>{task.time}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <div className="text-[#2A0144]/35">{task.points}</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rightsidebar;
