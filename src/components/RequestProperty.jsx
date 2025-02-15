"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formatNumberWithCommas = (value) => {
  if (!value) return "";
  // Remove any non-digit characters
  const number = value.replace(/\D/g, "");
  // Format the number with commas
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Ensure API_URL doesn't end with a slash
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3001/api"
).replace(/\/$/, "");
const TIMEOUT_DURATION = 30000; // 30 seconds

export function PropertyRequestForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm();

  // Test the API connection when the component mounts
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(`${API_URL}/test`);
        const data = await response.json();
        console.log("API Test Response:", data);
      } catch (error) {
        console.error("API Test Error:", error);
      }
    };
    testConnection();
  }, []);

  const fetchWithTimeout = async (url, options, timeout) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      console.log("Making request to:", url);
      console.log("Request options:", {
        ...options,
        body: options.body ? JSON.parse(options.body) : undefined,
      });

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      return response;
    } catch (error) {
      clearTimeout(id);
      console.error("Fetch error:", error);
      if (error.name === "AbortError") {
        throw new Error("Request timed out. Please try again.");
      }
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const requestUrl = `${API_URL}/property-request`;

    try {
      console.log("Form data being submitted:", data);
      console.log("Submitting to:", requestUrl);

      const response = await fetchWithTimeout(
        requestUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        },
        TIMEOUT_DURATION
      );

      // First check if the response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);

        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage =
            errorData.message ||
            `Request failed with status: ${response.status}`;
        } catch (e) {
          console.error("Failed to parse error response:", e);
          errorMessage = `Request failed with status: ${response.status}`;
        }

        throw new Error(errorMessage);
      }

      // Try to parse the successful response
      const responseText = await response.text();
      console.log("Raw successful response:", responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse success response:", e);
        throw new Error("Server returned invalid JSON response");
      }

      console.log("Parsed response data:", responseData);

      toast.success(
        responseData.message || "Property request submitted successfully!"
      );
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting request:", error);
      let errorMessage = "Failed to submit request. ";

      if (error.message.includes("Failed to fetch")) {
        errorMessage +=
          "Unable to connect to server. Please check your internet connection.";
      } else if (error.message.includes("timed out")) {
        errorMessage += "Request timed out. Please try again.";
      } else if (error.message.includes("JSON")) {
        errorMessage +=
          "Server returned an invalid response. Please try again later.";
      } else {
        errorMessage += error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog className="bg-white" open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed left-4 bottom-4 z-[100] rounded-md py-2 px-4 bg-purple-800"
            size="large"
          >
            Add Property Request{""}
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add Property Request</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyType"
                rules={{ required: "Property type is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                rules={{ required: "Budget is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your budget"
                        value={formatNumberWithCommas(field.value)}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/,/g, "");
                          field.onChange(rawValue);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Preferred location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional details or requirements"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
