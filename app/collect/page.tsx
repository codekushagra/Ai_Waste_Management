'use client'
import { useState, useEffect } from 'react'
import { Trash2, MapPin, CheckCircle, Clock, ArrowRight, Camera, Upload, Loader, Calendar, Weight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import { getWasteCollectionTasks, updateTaskStatus, saveReward, saveCollectedWaste, getUserByEmail } from '@/utils/db/actions' 
import { GoogleGenerativeAI } from "@google/generative-ai"

// Make sure to set your Gemini API key in your environment variables
const geminiApiKey = process.env.GEMINI_API_KEY;

type CollectionTask = {
  id: number;
  location: string,
  wasteType: string,
  amount: string;
  status: 'pending' | 'in_progress' | 'completed' | 'verified' | 'collected';
  date: string;
  collectorId: number | null;
  number: string;
}

const ITEMS_PER_PAGE = 5

export default function CollectPage() {
  const [tasks, setTasks] = useState<CollectionTask[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredWasteType, setHoveredWasteType] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [user, setUser] = useState<{ id: number; email: string; name: string } | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'reward'>('all')

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      setLoading(true)
      try {
        // Fetch user
        const userEmail = localStorage.getItem('userEmail')
        if (userEmail) {
          const fetchedUser = await getUserByEmail(userEmail)
          if (fetchedUser) {
            setUser(fetchedUser)
          } else {
            toast.error('User not found. Please log in again.')
            // Redirect to login page or handle this case appropriately
          }
        } else {
          toast.error('User not logged in. Please log in.')
          // Redirect to login page or handle this case appropriately
        }

        // Fetch tasks (include in-progress tasks assigned to this user)
        let currentUser: any = null
        if (userEmail) {
          const fetchedUser = await getUserByEmail(userEmail)
          if (fetchedUser) {
            setUser(fetchedUser)
            currentUser = fetchedUser
          }
        }

        const fetchedTasks = await getWasteCollectionTasks(currentUser?.id)
        const formattedTasks = fetchedTasks.map((task: any) => ({
          ...task,
          date: task.createdAt.toISOString().split('T')[0]
        }))
        setTasks(formattedTasks as CollectionTask[])
      } catch (error) {
        console.error('Error fetching user and tasks:', error)
        toast.error('Failed to load user data and tasks. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndTasks()
  }, [])

  const [selectedTask, setSelectedTask] = useState<CollectionTask | null>(null)
  const [verificationImage, setVerificationImage] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failure'>('idle')
  const [verificationResult, setVerificationResult] = useState<{
    wasteTypeMatch: boolean;
    quantityMatch: boolean;
    confidence: number;
  } | null>(null)
  const [reward, setReward] = useState<number | null>(null)
  const [showOverrideWarning, setShowOverrideWarning] = useState(false)
  const [isManuallyVerified, setIsManuallyVerified] = useState(false)
  const [verifierName, setVerifierName] = useState('')
  const [verifierNumber, setVerifierNumber] = useState('')

  // Reset verification states when a new task is selected
  useEffect(() => {
    if (selectedTask) {
      setVerificationImage(null)
      setVerificationStatus('idle')
      setVerificationResult(null)
      setIsManuallyVerified(false)
      setShowOverrideWarning(false)
      setVerifierName('')
      setVerifierNumber('')
    }
  }, [selectedTask])

  const handleStatusChange = async (taskId: number, newStatus: CollectionTask['status']) => {
    if (!user) {
      toast.error('Please log in to collect waste.')
      return
    }

    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus, user.id)
      if (updatedTask) {
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus, collectorId: user.id } : task
        ))
        toast.success('Task status updated successfully')
      } else {
        toast.error('Failed to update task status. Please try again.')
      }
    } catch (error) {
      console.error('Error updating task status:', error)
      toast.error('Failed to update task status. Please try again.')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setVerificationImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const readFileAsBase64 = (dataUrl: string): string => {
    return dataUrl.split(',')[1]
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const handleVerifyWithRetry = async (retries = 3, delay = 1000): Promise<any> => {
    if (!selectedTask || !verificationImage || !user) {
      toast.error('Missing required information for verification.')
      return null
    }

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey!)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

        const base64Data = readFileAsBase64(verificationImage)

        const imageParts = [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/jpeg',
            },
          },
        ]

        const prompt = `You are an expert in waste management and recycling. Analyze this image and provide:
        1. Confirm if the waste type matches: ${selectedTask.wasteType}
        2. Estimate if the quantity matches: ${selectedTask.amount}
        3. Your confidence level in this assessment (as a percentage)
        
        Respond in JSON format like this:
        {
          "wasteTypeMatch": true/false,
          "quantityMatch": true/false,
          "confidence": confidence level as a number between 0 and 1
        }`

        const result = await model.generateContent([prompt, ...imageParts])
        const response = await result.response
        const text = response.text()
        
        // Remove markdown code block markers if present
        const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/i)
        const jsonString = jsonMatch ? jsonMatch[1] : text.trim()
        
        const parsedResult = JSON.parse(jsonString)
        return parsedResult
      } catch (error: any) {
        const errorMessage = error?.message || String(error)
        
        // Check if it's a rate limiting error
        if (errorMessage.includes('429') || errorMessage.includes('Resource exhausted')) {
          if (attempt < retries - 1) {
            const waitTime = delay * Math.pow(2, attempt) // Exponential backoff
            console.log(`Rate limited. Retrying in ${waitTime}ms... (Attempt ${attempt + 1}/${retries})`)
            toast.loading(`API rate limited. Retrying in ${waitTime / 1000}s... (Attempt ${attempt + 1}/${retries})`)
            await sleep(waitTime)
            continue
          }
        }
        
        // For other errors or final attempt, throw
        throw error
      }
    }
  }

  const handleVerify = async () => {
    if (!selectedTask || !verificationImage || !user) {
      toast.error('Missing required information for verification.')
      return
    }

    setVerificationStatus('verifying')
    
    try {
      toast.loading('Verifying waste collection...', { id: 'verification' })
      
      const parsedResult = await handleVerifyWithRetry(3, 2000)
      
      if (!parsedResult) {
        toast.error('Failed to get verification result', { id: 'verification' })
        setVerificationStatus('failure')
        return
      }

      setVerificationResult({
        wasteTypeMatch: parsedResult.wasteTypeMatch,
        quantityMatch: parsedResult.quantityMatch,
        confidence: parsedResult.confidence
      })
      setVerificationStatus('success')
      
      if (parsedResult.wasteTypeMatch && parsedResult.quantityMatch && parsedResult.confidence > 0.7) {
        await handleStatusChange(selectedTask.id, 'verified')
        const earnedReward = Math.floor(Math.random() * 50) + 10 // Random reward between 10 and 59
        
        // Save the reward
        await saveReward(user.id, earnedReward)

        // Save the collected waste
        await saveCollectedWaste(selectedTask.id, user.id, parsedResult)

        setReward(earnedReward)
        toast.success(`Verification successful! You earned ${earnedReward} tokens!`, {
          duration: 5000,
          position: 'top-center',
          id: 'verification'
        })
      } else {
        toast.error('Verification failed. The collected waste does not match the reported waste.', {
          duration: 5000,
          position: 'top-center',
          id: 'verification'
        })
      }
    } catch (error: any) {
      console.error('Error verifying waste:', error)
      const errorMessage = error?.message || String(error)
      
      if (errorMessage.includes('429') || errorMessage.includes('Resource exhausted')) {
        toast.error('API quota exceeded. Please try again in a few moments.', {
          duration: 5000,
          id: 'verification'
        })
      } else if (errorMessage.includes('Failed to parse')) {
        toast.error('Could not parse verification response. Please try again.', {
          duration: 5000,
          id: 'verification'
        })
      } else {
        toast.error('Verification failed. Please try again.', {
          duration: 5000,
          id: 'verification'
        })
      }
      setVerificationStatus('failure')
    }
  }

  const handleManualOverride = async () => {
    if (!selectedTask || !user || !isManuallyVerified) {
      toast.error('Please confirm physical verification by checking the box before proceeding.')
      return
    }

    // Validate verifier fields
    if (!verifierName || verifierName.trim() === '') {
      toast.error('Please enter the verifier name before confirming manual verification.')
      return
    }

    if (!verifierNumber || verifierNumber.trim() === '') {
      toast.error('Please enter the verifier mobile number before confirming manual verification.')
      return
    }

    // Basic phone number sanity check (digits, spaces, +, -, parentheses)
    const phoneSanitized = verifierNumber.replace(/[\s\-()]/g, '')
    const phoneValid = /^\+?\d{7,15}$/.test(phoneSanitized)
    if (!phoneValid) {
      toast.error('Please enter a valid verifier mobile number (7-15 digits).')
      return
    }

    try {
      setVerificationStatus('verifying')
      toast.loading('Manually verifying waste...', { id: 'override' })
      
      const manualResult = {
        wasteTypeMatch: true,
        quantityMatch: true,
        confidence: 0.85,
        manualOverride: true
      }

      await handleStatusChange(selectedTask.id, 'verified')
      const earnedReward = Math.floor(Math.random() * 50) + 10

      await saveReward(user.id, earnedReward)
      await saveCollectedWaste(selectedTask.id, user.id, manualResult, verifierName, verifierNumber)

      setReward(earnedReward)
      setVerificationResult({
        wasteTypeMatch: true,
        quantityMatch: true,
        confidence: 0.85
      })
      setVerificationStatus('success')

      toast.success(`Waste verified manually! You earned ${earnedReward} tokens! (Admin verification required)`, {
        duration: 5000,
        position: 'top-center',
        id: 'override'
      })

      setShowOverrideWarning(false)
    } catch (error) {
      console.error('Error in manual override:', error)
      toast.error('Failed to manually verify. Please try again.', {
        duration: 5000,
        id: 'override'
      })
      setVerificationStatus('failure')
    }
  }

  // Filter by search term and status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Apply status filter
    if (statusFilter === 'all') return matchesSearch
    if (statusFilter === 'pending') return matchesSearch && task.status === 'pending'
    if (statusFilter === 'in_progress') return matchesSearch && task.status === 'in_progress'
    if (statusFilter === 'reward') return matchesSearch && (task.status === 'verified' || task.status === 'collected' || task.status === 'completed')
    
    return matchesSearch
  })

  const pageCount = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE)
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Waste Collection Tasks</h1>
      
      {/* Status Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          onClick={() => setStatusFilter('all')}
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          size="sm"
        >
          All Tasks
        </Button>
        <Button
          onClick={() => setStatusFilter('pending')}
          variant={statusFilter === 'pending' ? 'default' : 'outline'}
          size="sm"
        >
          Pending
        </Button>
        <Button
          onClick={() => setStatusFilter('in_progress')}
          variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
          size="sm"
        >
          In Progress
        </Button>
        <Button
          onClick={() => setStatusFilter('reward')}
          variant={statusFilter === 'reward' ? 'default' : 'outline'}
          size="sm"
        >
          Reward Earned
        </Button>
      </div>
      
      <div className="mb-4 flex items-center">
        <Input
          type="text"
          placeholder="Search by area..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedTasks.map(task => (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-medium text-gray-800 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                    {task.location}
                  </h2>
                  <StatusBadge status={task.status} />
                </div>
                <div className="mb-2 text-sm text-gray-600">
                  <p><span className="font-medium">Contact:</span> {task.number}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center relative">
                    <Trash2 className="w-4 h-4 mr-2 text-gray-500" />
                    <span 
                      onMouseEnter={() => setHoveredWasteType(task.wasteType)}
                      onMouseLeave={() => setHoveredWasteType(null)}
                      className="cursor-pointer"
                    >
                      {task.wasteType.length > 8 ? `${task.wasteType.slice(0, 8)}...` : task.wasteType}
                    </span>
                    {hoveredWasteType === task.wasteType && (
                      <div className="absolute left-0 top-full mt-1 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                        {task.wasteType}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Weight className="w-4 h-4 mr-2 text-gray-500" />
                    {task.amount}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    {task.date}
                  </div>
                </div>
                <div className="flex justify-end">
                  {task.status === 'pending' && (
                    <Button onClick={() => handleStatusChange(task.id, 'in_progress')} variant="outline" size="sm">
                      Start Collection
                    </Button>
                  )}
                  {task.status === 'in_progress' && task.collectorId === user?.id && (
                    <Button onClick={() => setSelectedTask(task)} variant="outline" size="sm">
                      Complete & Verify
                    </Button>
                  )}
                  {task.status === 'in_progress' && task.collectorId !== user?.id && (
                    <span className="text-yellow-600 text-sm font-medium">In progress by another collector</span>
                  )}
                  {task.status === 'verified' && (
                    <span className="text-green-600 text-sm font-medium">Reward Earned</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="mr-2"
            >
              Previous
            </Button>
            <span className="mx-2 self-center">
              Page {currentPage} of {pageCount}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="ml-2"
            >
              Next
            </Button>
          </div>
        </>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Verify Collection</h3>
            <p className="mb-4 text-sm text-gray-600">Upload a photo of the collected waste to verify and earn your reward.</p>
            <div className="mb-4">
              <label htmlFor="verification-image" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="verification-image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input id="verification-image" name="verification-image" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            {verificationImage && (
              <img src={verificationImage} alt="Verification" className="mb-4 rounded-md w-full" />
            )}

            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <label className="flex items-start cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isManuallyVerified}
                  onChange={(e) => setIsManuallyVerified(e.target.checked)}
                  className="mt-1 mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <p className="font-medium text-gray-800">I have physically verified this waste</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Check this box to confirm you have personally inspected and verified that the collected waste matches the reported type and quantity, regardless of AI verification results.
                  </p>
                </div>
              </label>
            </div>

            <Button
              onClick={handleVerify}
              className="w-full"
              disabled={!verificationImage || verificationStatus === 'verifying'}
            >
              {verificationStatus === 'verifying' ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Verifying...
                </>
              ) : 'Verify Collection'}
            </Button>

            {verificationStatus === 'success' && verificationResult && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p>Waste Type Match: {verificationResult.wasteTypeMatch ? 'Yes' : 'No'}</p>
                <p>Quantity Match: {verificationResult.quantityMatch ? 'Yes' : 'No'}</p>
                <p>Confidence: {(verificationResult.confidence * 100).toFixed(2)}%</p>
              </div>
            )}

            {verificationStatus === 'failure' && (
              <div className="mt-4 space-y-3">
                <p className="text-red-600 text-center text-sm font-medium">AI verification could not confirm the waste match.</p>
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
                  ℹ️ Please check the box above if you have physically verified this waste, then try again or use the manual verification option below.
                </div>
              </div>
            )}

            {/* Show manual verification action as soon as user checks the confirmation box */}
            {isManuallyVerified && !showOverrideWarning && (
              <div className="mt-4 space-y-3">
                <p className="text-gray-600 text-sm">You've indicated you've physically verified this waste. You can proceed with manual verification below.</p>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                  ⚠️ Manual verification will be flagged for admin review.
                </div>
                <Button 
                  onClick={() => setShowOverrideWarning(true)} 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  Verify Using Physical Check
                </Button>
              </div>
            )}

            {showOverrideWarning && (
              <div className="mt-4 p-4 bg-orange-50 border-2 border-orange-300 rounded-md">
                <p className="font-semibold text-orange-900 mb-2">⚠️ Manual Override Warning</p>
                <p className="text-sm text-orange-800 mb-3">
                  You are confirming that you have physically verified this waste matches the report, even though the AI disagreed. This will be logged for admin verification.
                </p>
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Verifier Name</label>
                    <input
                      type="text"
                      value={verifierName}
                      onChange={(e) => setVerifierName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                      placeholder="Enter verifier full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Verifier Mobile Number</label>
                    <input
                      type="tel"
                      value={verifierNumber}
                      onChange={(e) => setVerifierNumber(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                      placeholder="Enter verifier mobile number"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleManualOverride}
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                    disabled={verificationStatus === 'verifying'}
                  >
                    {verificationStatus === 'verifying' ? (
                      <>
                        <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Manual Verification'
                    )}
                  </Button>
                  <Button 
                    onClick={() => setShowOverrideWarning(false)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <Button onClick={() => {
              setSelectedTask(null)
              setVerificationImage(null)
              setVerificationStatus('idle')
              setShowOverrideWarning(false)
              setIsManuallyVerified(false)
            }} variant="outline" className="w-full mt-2">
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Add a conditional render to show user info or login prompt */}
      {/* {user ? (
        <p className="text-sm text-gray-600 mb-4">Logged in as: {user.name}</p>
      ) : (
        <p className="text-sm text-red-600 mb-4">Please log in to collect waste and earn rewards.</p>
      )} */}
    </div>
  )
}

function StatusBadge({ status }: { status: CollectionTask['status'] }) {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    in_progress: { color: 'bg-blue-100 text-blue-800', icon: Trash2 },
    collected: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
    completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    verified: { color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
  }

  // Provide a safe default if an unknown status is passed
  const cfg = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-100 text-gray-800', icon: Clock }
  const { color, icon: Icon } = cfg

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color} flex items-center`}>
      <Icon className="mr-1 h-3 w-3" />
      {status.replace('_', ' ')}
    </span>
  )
}