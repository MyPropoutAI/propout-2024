import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PaymentInterface({ userId, propertyId }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlan) {
      alert(
        `Payment processed for ${selectedPlan} plan! user_id: ${userId} property_Id: ${propertyId}`
      );
    } else {
      alert("Please select a plan");
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Plan
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="">Select a plan</option>
              <option value="Basic">Basic (₦0)</option>
              <option value="Pro">Pro (₦0)</option>
              <option value="Enterprise">Enterprise (₦0)</option>
            </select>
          </div>
          <div>
            <Input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <Input
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </div>
          <Button variant="default" type="submit" className="w-full">
            Pay Now
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
