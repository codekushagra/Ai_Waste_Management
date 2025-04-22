"use client";

import { useState, useCallback, useEffect } from "react";
import { MapPin, Upload, CheckCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import type {} from "@types/google.maps";
import { Libraries } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { Toast, toast } from "react-hot-toast";

const geminiApiKey = process.env.GEMINI_API_KEY as any;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const libraries: Libraries = ['places']

export default function ReportPage(){
    const [user,setUser] = useState('')
    const router = useRouter();

    const [reports, setReports] = useState<Array<{
        id:number;
        location:string;
        wasteType:string;
        amount:string;
        createdAt:string;
    }>
    >([]);

    const [newReport,setNewReport] = useState({
        location:"",
        type:"",
        amount:""
    })

    const [file, setFile] = useState<File | null>(null);
    const [preview , setPreview] = useState<string | null>(null);

    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failure'>('idle')

    const [verificationResult , setVerificationResults] = useState<{
        wasteType:string;
        quantity:string;
        confidence: number;
    } | null>(null)

    const [isSubmitting,setIsSubmitting] = useState(false)

    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey:googleMapsApiKey,
        libraries: libraries,
    });

    const onLoad = useCallback((ref:google.maps.places.SearchBox)=>{
        setSearchBox(ref);
    },[]);

    const onPlaceChange = ()=>{
        if(searchBox){
            const places = searchBox.getPlaces();
            if(places && places.length >0){
                const place = places[0];
                setNewReport(prev=>({
                    ...prev,
                    location:place.formatted_address || ""
                }))
            }
        }
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement) =>{
        const {name,value} = e.target;
        setNewReport({...newReport, [name]: value})
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files[0]){
            const selectedFile = e.target.files[0]
            setFile(selectedFile)

            const reader = new FileReader();
            reader.onload = (e)=>{
                setPreview(e.target?.result as string)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const readFileAsBase64 = (file:File):Promise<string> =>{
        return new Promise((resolve,reject)=>{
            const reader = new FileReader();
            reader.onload=()=>resolve(reader.result as string)
            reader.onerror = reject;
            reader.readAsDataURL(file)
        })
    }

    const handleVerify = async()=>{
        if(!file)return;

        setVerificationStatus('verifying');

        try {
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            const model = genAI.getGenerativeModel({
                model:'gemini-1.5-flash'
            })
            const base64Data = await readFileAsBase64(file);

            const imageParts = [
                {
                    inlineData:{
                        data: base64Data.split(',')[1],
                        mimeType: file.type
                    }
                }
            ];

            const prompt = `You are a highly experienced environmental analyst specializing in waste classification and recycling processes. You will be provided with an image input containing visible waste materials. Your task is to analyze the image and provide the following information in a structured format:

            1. "wasteType": Identify the primary type of waste shown in the image. Choose from one of the following categories only: "plastic", "paper", "glass", "metal", or "organic".
            2. "quantity": Estimate the approximate amount of waste visible in the image. Provide this value as a number with a unit ("kg" for solid waste or "liters" for liquid/loosely packed organic waste).
            3. "confidence": Indicate your confidence level in this assessment as a decimal between 0 and 1 (e.g., 0.87 for 87% confidence).
            
            Return your response in **strict JSON format** like this:
            {
              "wasteType": "plastic",
              "quantity": "2.5 kg",
              "confidence": 0.91
            }
            
            Only return the JSON response. Do not include any explanations or extra text.`;

            const result = await model.generateContent([prompt, ...imageParts])
            const response = await result.response;
            const text = response.text();


            try {
                const parsedResult = JSON.parse(text);
                if(parsedResult.wasteType && parsedResult.quantity && parsedResult.confidence){
                    setVerificationResults(parsedResult)
                    setVerificationStatus('success')
                    setNewReport({
                        ...newReport,
                        type: parsedResult.wasteType,
                        amount: parsedResult.quantity,

                    });
                }else{
                    console.error("Invalid Verification Results",parsedResult)
                    setVerificationStatus("failure")
                }
            } catch (e) {
                console.error("Failed to parse JSON response",e)
                    setVerificationStatus("failure")
            }

        } catch (e) {
            console.error("Error verifying waste",e)
                    setVerificationStatus("failure")
        }

    };
    const handleSubmit = async(e:React.FormEvent)=>{\
        e.preventDefault();
        if(verificationStatus !== 'success' || !user){
            
            toast.error("Please verify the waste before submitting or log in")
            return
        }
        setIsSubmitting(true);
        

        try {
            const report = await createReport() as any;
        } catch (e) {
            
        }
    }
    
}