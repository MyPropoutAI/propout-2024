import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaArrowRight } from "react-icons/fa6";

const Helpsetting = () => {
  return (
    <div>
      <h1 className="text-left text-[#320051] font-semibold py-2">
        Help and Support
      </h1>
      <hr />

      <div className="text-[#320051] grid gap-5 grid-cols-dashboard-settings">
        <Card className="max-w-[300px] rounded-lg text-[#320051]">
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>
              Send a direct message to our support and we'll respond as soon as
              possible
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex justify-end">
            <FaArrowRight />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="max-w-[300px] rounded-lg text-[#320051]">
          <CardHeader>
            <CardTitle>Read our guide</CardTitle>
            <CardDescription>
              Get to know more about our prominent project.
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex justify-end">
            <FaArrowRight />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="max-w-[300px] rounded-lg text-[#320051]">
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
            <CardDescription>
              We've answered possible questions you might probably want to ask
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex justify-end">
            <FaArrowRight />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="max-w-[300px] rounded-lg text-[#320051]">
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
            <CardDescription>
              Submit feedback or suggestions for product improvements.
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex justify-end">
            <FaArrowRight />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className="max-w-[300px] rounded-lg text-[#320051]">
          <CardHeader>
            <CardTitle>Troubleshooting Guides</CardTitle>
            <CardDescription>
              Step-by-step instructions to help you resolve common issues or
              errors independently.
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex justify-end">
            <FaArrowRight className="" />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Helpsetting;
