"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  code?: string;
};

export default function CouponModal({ open, onClose, code }: Props) {
  if (!open) return null;

  const handleCopy = async () => {
    try {
      if (code) await navigator.clipboard.writeText(code);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg z-10 p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Your Coupon</h3>
        <p className="text-sm text-gray-600 mb-4">Use the code below at checkout. This is a demo coupon.</p>
        <div className="flex items-center justify-between bg-gray-100 rounded-md p-3 mb-4">
          <span className="font-mono text-sm break-all">{code || "—"}</span>
          <Button onClick={handleCopy} className="ml-4">Copy</Button>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800">Close</Button>
        </div>
      </div>
    </div>
  );
}
