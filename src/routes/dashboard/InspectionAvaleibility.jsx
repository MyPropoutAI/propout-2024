import { useState, useEffect } from "react";
import { Calendar } from "../../components/ui/calendar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AgentAvailability() {
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  useEffect(() => {
    // Reset availability slots every week (every Sunday at midnight)
    const now = new Date();
    const daysUntilSunday = 7 - now.getDay();
    const nextSunday = new Date(
      now.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000
    );
    nextSunday.setHours(0, 0, 0, 0);

    const timeUntilReset = nextSunday.getTime() - now.getTime();

    const resetTimer = setTimeout(() => {
      setAvailabilitySlots([]);
      console.log("Availability reset for the new week");
      toast.info("Availability has been reset for the new week");
    }, timeUntilReset);

    return () => clearTimeout(resetTimer);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (date) {
      const existingSlot = availabilitySlots.find(
        (slot) => slot.date.toDateString() === date.toDateString()
      );
      if (existingSlot) {
        setStartTime(existingSlot.startTime);
        setEndTime(existingSlot.endTime);
      } else {
        setStartTime("09:00");
        setEndTime("17:00");
      }
    }
  };

  const handleAddOrUpdateSlot = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }

    setAvailabilitySlots((prev) => {
      const existingIndex = prev.findIndex(
        (slot) => slot.date.toDateString() === selectedDate.toDateString()
      );
      if (existingIndex >= 0) {
        const updatedSlots = [...prev];
        updatedSlots[existingIndex] = {
          date: selectedDate,
          startTime,
          endTime,
        };
        return updatedSlots;
      } else {
        return [...prev, { date: selectedDate, startTime, endTime }];
      }
    });

    toast.success("Availability slot added/updated");
  };

  const handleRemoveSlot = (dateToRemove) => {
    setAvailabilitySlots((prev) =>
      prev.filter(
        (slot) => slot.date.toDateString() !== dateToRemove.toDateString()
      )
    );
    toast.success("Availability slot removed");
  };

  const handleSaveAvailability = () => {
    console.log("Saved availability slots:", availabilitySlots);
    toast.success("Availability saved successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Set Your Availability</CardTitle>
          <CardDescription>
            Select the days and times youre available for house inspections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
              <Button onClick={handleAddOrUpdateSlot}>
                {availabilitySlots.some(
                  (slot) =>
                    slot.date.toDateString() === selectedDate?.toDateString()
                )
                  ? "Update Slot"
                  : "Add Slot"}
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Selected Availability:
            </h3>
            <div className="space-y-2">
              {availabilitySlots.map((slot) => (
                <div
                  key={slot.date.toISOString()}
                  className="flex items-center justify-between bg-secondary p-2 rounded-md"
                >
                  <Badge variant="outline">
                    {daysOfWeek[slot.date.getDay()]} -{" "}
                    {slot.date.toLocaleDateString()}
                  </Badge>
                  <span>
                    {slot.startTime} - {slot.endTime}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveSlot(slot.date)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveAvailability}>Save Availability</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
