"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, CopyIcon } from "lucide-react";

export default function ReferralCodeCopy({ code, title }) {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef(null);

  const copyToClipboard = async () => {
    if (inputRef.current) {
      try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={code}
            readOnly
            className="font-mono bg-muted"
          />
          <Button onClick={copyToClipboard} variant="outline">
            {isCopied ? (
              <>
                <CheckIcon className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
