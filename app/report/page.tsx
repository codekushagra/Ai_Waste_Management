"use client";

import { useState, useCallback, useEffect } from "react";
import { MapPin, Upload, CheckCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import type {} from "@types/google.maps";
import { Libraries } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { Toast, toast } from "react-hot-toast";
import { createReport, getRecentReports, getUserByEmail } from "@/utils/db/actions";

const geminiApiKey = process.env.GEMINI_API_KEY as any;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const libraries: Libraries = ['places']

export default function ReportPage() {
    const [user, setUser] = useState('');
    const router = useRouter();

    const [reports, setReports] = useState<Array<{
        id: number;
        location: string;
        number: string;
        wasteType: string;
        amount: string;
        createdAt: string;
    }>>([]);

    const [newReport, setNewReport] = useState({
        location: "",
        type: "",
        amount: "",
        mobile:""
    });

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failure'>('idle');

    const [verificationResult, setVerificationResults] = useState<{
        wasteType: string;
        quantity: string;
        confidence: number;
    } | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsApiKey,
        libraries: libraries,
    });

    const onLoad = useCallback((ref: google.maps.places.SearchBox) => {
        setSearchBox(ref);
    }, []);

    const onPlaceChange = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places && places.length > 0) {
                const place = places[0];
                setNewReport(prev => ({
                    ...prev,
                    location: place.formatted_address || ""
                }))
            }
        }
    }

    // For text/select inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewReport({ ...newReport, [name]: value });
    }

    // For file input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            }
            reader.readAsDataURL(selectedFile);
        }
    }

    const readFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        })
    }

    const handleVerify = async () => {
        if (!file) return;

        setVerificationStatus('verifying');

        try {
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            const model = genAI.getGenerativeModel({
                model: 'gemini-2.0-flash'
            })
            const base64Data = await readFileAsBase64(file);

            const imageParts = [
                {
                    inlineData: {
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

            // Remove Markdown code block markers if present
            const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/i);
            const jsonString = jsonMatch ? jsonMatch[1] : text.trim();

            try {
                const parsedResult = JSON.parse(jsonString);
                if (parsedResult.wasteType && parsedResult.quantity && parsedResult.confidence) {
                    setVerificationResults(parsedResult)
                    setVerificationStatus('success')
                    setNewReport({
                        ...newReport,
                        type: parsedResult.wasteType,
                        amount: parsedResult.quantity,
                    });
                } else {
                    console.error("Invalid Verification Results", parsedResult)
                    setVerificationStatus("failure")
                }
            } catch (e) {
                console.error("Failed to parse JSON response", e)
                setVerificationStatus("failure")
            }

        } catch (e) {
            console.error("Error verifying waste", e)
            setVerificationStatus("failure")
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (verificationStatus !== 'success' || !user) {
            toast.error("Please verify the waste before submitting or log in")
            return
        }
        setIsSubmitting(true);

        try {
            const report = (await createReport(
                (user as any).id,
                newReport.location,
                newReport.type,
                newReport.amount,
                preview || undefined,
                newReport.mobile,
                verificationResult ? JSON.stringify(verificationResult) : undefined,
                
            )) as any;

            const formattedReport = {
                id: report.id,
                location: report.location,
                number:report.number,
                wasteType: report.wasteType,
                amount: report.amount,
                createdAt: report.createdAt.toISOString().split('T')[0]
            }
            setReports([formattedReport, ...reports])
            setNewReport({
                location: "",
                type: "",
                amount: "",
                mobile:""
            })
            setFile(null)
            setPreview(null)
            setVerificationStatus('idle')
            setVerificationResults(null)

            toast.success(`Report submitted successfully! You've earned ${report.points} points`)
        } catch (e) {
            console.error("Error submitting report", e)
            toast.error("Failed to submit report")
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            const email = localStorage.getItem('userEmail')
            if (email) {
                let user = await getUserByEmail(email);
                setUser(user);

                const recentReports = await getRecentReports() as any
                const formattedReports = recentReports.map((report: any) => ({
                    ...report,
                    createdAt: report.createdAt.toISOString().split('T')[0]
                }))
                setReports(formattedReports)
            } else {
                toast.error("Please log in to submit a report")
                router.push('/')
            }
        }
        checkUser()
    }, [router])

    return (
        <div className="p-8 max-w-4xl mx-auto ">
            <h1 className="text-3xl font-semibold mb-6 text-white">Report Waste</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg mb-12">
                <div className="mb-8">
                    <label htmlFor="waste-image" className="block text-lg font-medium text-gray-700 mb-2">
                        Upload Waste Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-green-500 transition-colors duration-300">
                        <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="waste-image"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500"
                                >
                                    <span>Upload a file</span>
                                    <input id="waste-image" name="waste-image" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
                {preview && (
                    <div className="mt-4 mb-8">
                        <img src={preview} alt="Waste preview" className="max-w-full h-auto rounded-xl shadow-md" />
                    </div>
                )}
                <Button
                    type="button"
                    onClick={handleVerify}
                    className="w-full mb-8 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg rounded-xl transition-colors duration-300"
                    disabled={!file || verificationStatus === 'verifying'}
                >
                    {verificationStatus === 'verifying' ? (
                        <>
                            <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            Verifying...
                        </>
                    ) : 'Verify Waste'}
                </Button>

                {verificationStatus === 'success' && verificationResult && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8 rounded-r-xl">
                        <div className="flex items-center">
                            <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                            <div>
                                <h3 className="text-lg font-medium text-green-800">Verification Successful</h3>
                                <div className="mt-2 text-sm text-green-700">
                                    <p>Waste Type: {verificationResult.wasteType}</p>
                                    <p>Quantity: {verificationResult.quantity}</p>
                                    <p>Confidence: {(verificationResult.confidence * 100).toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {verificationStatus === 'success' && verificationResult && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            {isLoaded ? (
                                <StandaloneSearchBox
                                    onLoad={onLoad}
                                    onPlacesChanged={onPlaceChange}
                                >
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={newReport.location}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                                        placeholder="Enter waste location"
                                    />
                                </StandaloneSearchBox>
                            ) : (
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={newReport.location}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                                    placeholder="Enter waste location"
                                />
                            )}
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
                            <input
                                type="text"
                                id="type"
                                name="type"
                                value={newReport.type}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-gray-100"
                                placeholder="Verified waste type"
                                readOnly
                            />
                        </div>
                        <div>
                          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
<input
    type="number"
    id="mobile"
    name="mobile"
    value={newReport.mobile}
    onChange={handleInputChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
    placeholder="Enter your mobile number"
/>
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Estimated Amount</label>
                            <input
                                type="text"
                                id="amount"
                                name="amount"
                                value={newReport.amount}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-gray-100"
                                placeholder="Verified amount"
                                readOnly
                            />
                        </div>
                    </div>
                )}
                <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-xl transition-colors duration-300 flex items-center justify-center"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            Submitting...
                        </>
                    ) : 'Submit Report'}
                </Button>
            </form>

            <h2 className="text-3xl font-semibold mb-6 text-white">Recent Reports</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <MapPin className="inline-block w-4 h-4 mr-2 text-green-500" />
                                        {report.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.number}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.wasteType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}