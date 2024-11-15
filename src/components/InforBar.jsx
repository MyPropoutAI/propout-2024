import Link from "next/link";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";

export default function InfoBar() {
  return (
    <Alert
      variant="default"
      className="sticky top-0 left-0 right-0 z-50 rounded-none border-b bg-blue-500"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between w-full">
        <span>
          Please complete your profile to get the most out of our platform.
          <Link
            href="/dashboard/setting"
            className="ml-2 font-medium underline underline-offset-4 hover:text-primary"
          >
            Go to Profile
          </Link>
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0 rounded-full"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
