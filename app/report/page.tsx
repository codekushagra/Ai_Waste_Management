"use client";

import { useState, useCallback, useEffect } from "react";
import { MapPin, Upload, CheckCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { Toast } from "react-hot-toast";

const geminiApiKey = process.env.GEMINI_API_KEY;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
