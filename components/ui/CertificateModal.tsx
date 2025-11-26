"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader, X } from "lucide-react";
import { getUserByEmail, getUserBalance } from "@/utils/db/actions";
import { toast } from "react-hot-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultName?: string | null;
  onGenerate: (name: string) => Promise<void> | void;
};

const generateCertificatePDF = (recipientName: string) => {
  const canvas = document.createElement("canvas");
  const width = 1200;
  const height = 900;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f0fdf4");
  gradient.addColorStop(0.5, "#ecfdf5");
  gradient.addColorStop(1, "#f0fdf4");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Decorative border
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 8;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Inner decorative border
  ctx.strokeStyle = "#059669";
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 50, width - 100, height - 100);

  // Green corner decorations (leaf-like)
  const corners = [
    [80, 80],
    [width - 80, 80],
    [80, height - 80],
    [width - 80, height - 80],
  ];

  corners.forEach(([x, y]) => {
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
  });

  // Top Logo/Text Section
  ctx.fillStyle = "#059669";
  ctx.font = "bold 24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("🌍 SWACHH BHARAT ABHIYAN 🌍", width / 2, 100);

  ctx.fillStyle = "#10b981";
  ctx.font = "16px Arial";
  ctx.fillText("Sustainable Development Initiative", width / 2, 135);

  // Main title
  ctx.fillStyle = "#047857";
  ctx.font = "bold 48px Georgia";
  ctx.textAlign = "center";
  ctx.fillText("Certificate of Recognition", width / 2, 220);

  // Decorative line under title
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 200, 250);
  ctx.lineTo(width / 2 + 200, 250);
  ctx.stroke();

  // "This is to certify" text
  ctx.fillStyle = "#1f2937";
  ctx.font = "18px Georgia";
  ctx.textAlign = "center";
  ctx.fillText("This is to certify that", width / 2, 310);

  // Recipient name (larger and bold)
  ctx.fillStyle = "#059669";
  ctx.font = "bold 42px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(recipientName, width / 2, 390);

  // Underline for name
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 250, 410);
  ctx.lineTo(width / 2 + 250, 410);
  ctx.stroke();

  // Achievement text
  ctx.fillStyle = "#1f2937";
  ctx.font = "16px Georgia";
  ctx.textAlign = "center";
  const lines = [
    "has demonstrated exceptional commitment to environmental conservation",
    "and sustainable waste management practices.",
    "",
    "In recognition of your dedicated efforts in promoting",
    "a clean and green environment through participation",
    "in the Swachh Bharat Abhiyan initiative.",
  ];

  let yOffset = 460;
  lines.forEach((line) => {
    ctx.fillText(line, width / 2, yOffset);
    yOffset += 28;
  });

  // Sustainable Development Goals mention
  ctx.fillStyle = "#059669";
  ctx.font = "bold 14px Arial";
  ctx.fillText("Aligned with UN Sustainable Development Goals (SDG 12 & 13)", width / 2, 700);

  // Decorative elements - leaves
  ctx.fillStyle = "#10b981";
  ctx.save();

  // Left leaf
  ctx.translate(150, 750);
  ctx.rotate(-0.3);
  ctx.fillRect(0, 0, 60, 30);
  ctx.restore();

  // Right leaf
  ctx.save();
  ctx.translate(width - 210, 750);
  ctx.rotate(0.3);
  ctx.fillRect(0, 0, 60, 30);
  ctx.restore();

  // Date and signature area
  ctx.fillStyle = "#1f2937";
  ctx.font = "14px Arial";
  ctx.textAlign = "left";

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  ctx.fillText("Date: " + formattedDate, 150, 800);

  ctx.textAlign = "right";
  ctx.fillText("Authorized by: SwachhAI", width - 150, 800);

  // Footer message
  ctx.fillStyle = "#059669";
  ctx.font = "italic 13px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Together for a cleaner, greener future 🌱",
    width / 2,
    height - 40
  );

  return canvas;
};

const downloadCertificate = (recipientName: string) => {
  const canvas = generateCertificatePDF(recipientName);
  if (!canvas) return;

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = `Certificate_${recipientName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.png`;
  link.click();
};

export default function CertificateModal({
  open,
  onClose,
  defaultName,
  onGenerate,
}: Props) {
  const [name, setName] = useState(defaultName || "");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!open) return null;

  const handleGenerate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await onGenerate(name);
      // Fallback: attempt to refresh global balance in case parent did not dispatch
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
          const fetchedUser = await getUserByEmail(userEmail);
          if (fetchedUser) {
            const newBalance = await getUserBalance(fetchedUser.id);
            window.dispatchEvent(new CustomEvent("balanceUpdate", { detail: newBalance }));
            // small confirmation toast
            try {
              toast.success(`Balance updated: ${newBalance} points`, { duration: 2500 });
            } catch (e) {
              console.error("Failed to show toast after balance refresh:", e);
            }
          }
        }
      } catch (e) {
        console.error("CertificateModal: failed to refresh balance fallback:", e);
      }
      // Generate and download certificate
      downloadCertificate(name);
      setShowPreview(false);
      setName("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (!name.trim()) return;
    const canvas = generateCertificatePDF(name);
    if (canvas && canvasRef.current) {
      const img = new Image();
      img.src = canvas.toDataURL("image/png");
      img.onload = () => {
        setShowPreview(true);
      };
    }
  };

  return (
    <>
      {/* Main Certificate Input Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="bg-white rounded-lg shadow-2xl z-10 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">
            Generate Certificate
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Enter the name to appear on your Certificate of Recognition. Your certificate will highlight your contribution to environmental conservation.
          </p>

          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-700">
              Recipient Name
            </span>
            <input
              type="text"
              className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:border-green-500 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </label>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Certificate includes:</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>✓ Recognition from Swachh Bharat Abhiyan</li>
              <li>✓ Sustainable Development Goals alignment</li>
              <li>✓ Environmental conservation acknowledgment</li>
              <li>✓ Date issued and authorized signature</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePreview}
              disabled={loading || name.trim() === ""}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Preview
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={loading || name.trim() === ""}
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPreview(false)} />
          <div className="bg-white rounded-lg shadow-2xl z-[70] p-6 w-full max-w-4xl max-h-[95vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </button>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Certificate Preview
            </h3>

            {/* Certificate Preview */}
            <div className="flex justify-center mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <img
                src={
                  generateCertificatePDF(name)?.toDataURL("image/png") || ""
                }
                alt="Certificate Preview"
                className="max-w-full h-auto shadow-lg rounded"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowPreview(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Close
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Certificate
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
