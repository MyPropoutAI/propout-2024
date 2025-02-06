import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(SEVEN_DAYS_IN_MS);

  useEffect(() => {
    const getEndTime = () => {
      const storedEndTime = localStorage.getItem("countdownEndTime");
      if (storedEndTime) {
        const endTime = Number.parseInt(storedEndTime, 10);
        if (endTime > Date.now()) {
          return endTime;
        }
      }
      const newEndTime = Date.now() + SEVEN_DAYS_IN_MS;
      localStorage.setItem("countdownEndTime", newEndTime.toString());
      return newEndTime;
    };

    const endTime = getEndTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const timeRemaining = endTime - now;

      if (timeRemaining <= 0) {
        // Reset the timer
        const newEndTime = now + SEVEN_DAYS_IN_MS;
        localStorage.setItem("countdownEndTime", newEndTime.toString());
        setTimeLeft(SEVEN_DAYS_IN_MS);
      } else {
        setTimeLeft(timeRemaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);

  return (
    <Card className="bg-red-100 border-red-500">
      <CardContent className="p-4">
        <p className="text-red-600 font-bold text-center text-lg mb-2">
          All ads are free for the next 7 days!
        </p>
        <div className="text-red-600 text-center text-xl font-mono">
          {days.toString().padStart(2, "0")}d :
          {hours.toString().padStart(2, "0")}h :
          {minutes.toString().padStart(2, "0")}m :
          {seconds.toString().padStart(2, "0")}s
        </div>
      </CardContent>
    </Card>
  );
}
