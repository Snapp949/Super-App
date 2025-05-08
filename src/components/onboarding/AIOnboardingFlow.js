"use client"

import { useState, useEffect, useRef } from "react"
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Progress,
  Image,
  Icon,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Tooltip,
  useDisclosure,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import {
  FaUsers,
  FaLightbulb,
  FaChartLine,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
  FaVolumeUp,
  FaVolumeMute,
  FaPause,
  FaPlay,
} from "react-icons/fa"

const onboardingSteps = [
  {
    id: "welcome",
    title: "Welcome to SnappAiFi",
    description: "Discover a new approach to wealth building with inclusive financial tools.",
    image: "/abstract-financial-background.png",
    narration:
      "Welcome to SnappAiFi, where we're redefining financial inclusion and wealth building. Our platform combines holistic credit scoring, community support networks, and patent tokenization to create a more equitable financial ecosystem.",
  },
  {
    id: "holistic-credit",
    title: "Holistic Credit Scoring",
    description:
      "Our system considers your full financial picture, including support networks, education, and justified hardships.",
    icon: FaChartLine,
    color: "blue.500",
    narration:
      "Traditional credit scoring often overlooks responsible individuals. Our holistic approach considers your education, support networks, location stability, and context of financial hardships to give you a more accurate credit assessment.",
  },
  {
    id: "support-collective",
    title: "Support Collective",
    description: "Create and receive financial support from your community for specific life goals.",
    icon: FaUsers,
    color: "green.500",
    narration:
      "The Support Collective lets you create financial goals and receive contributions from your community. Whether it's education funding, transportation needs, or housing assistance, your network can help while strengthening your credit score.",
  },
  {
    id: "patent-nff",
    title: "Innovation & Patents",
    description: "Tokenize your intellectual property with our Non-Fungible Fund system.",
    icon: FaLightbulb,
    color: "purple.500",
    narration:
      "Turn your ideas into valuable assets with our patent system. We'll help you identify patentable innovations, guide you through the submission process, and tokenize approved patents as Non-Fungible Funds that can be invested in.",
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "Start exploring the platform and building your financial future.",
    icon: FaCheckCircle,
    color: "green.500",
    narration:
      "Congratulations! You're now ready to explore SnappAiFi and start building your financial future. Begin by checking your holistic credit score, creating a support goal, or submitting an innovation for patent consideration.",
  },
]

const AIOnboardingFlow = ({ isFirstLogin = true, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [hasAutoStarted, setHasAutoStarted] = useState(false)
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(true)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const speechSynthesisRef = useRef(null)
  const utteranceRef = useRef(null)

  // Define default values for colors to avoid conditional hook calls
  const defaultIconBgColor = useColorModeValue("gray.100", "whiteAlpha.200")

  // Colors
  const cardBg = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "white")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const highlightBg = useColorModeValue("blue.50", "blue.900")

  useEffect(() => {
    // Show onboarding modal for first-time users
    if (isFirstLogin) {
      onOpen()
    }
  }, [isFirstLogin, onOpen])

  // Initialize speech synthesis
  useEffect(() => {
    // Check if the browser supports speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthesisRef.current = window.speechSynthesis
    } else {
      console.warn("This browser does not support speech synthesis")
      setSpeechSynthesisSupported(false)
    }

    return () => {
      // Clean up speech synthesis when component unmounts
      if (speechSynthesisRef.current && utteranceRef.current) {
        speechSynthesisRef.current.cancel()
      }
    }
  }, [])

  // Auto-start narration when modal opens
  useEffect(() => {
    if (isOpen && !hasAutoStarted && !isMuted && speechSynthesisSupported) {
      setTimeout(() => {
        speakNarration()
        setHasAutoStarted(true)
      }, 500)
    }
  }, [isOpen, hasAutoStarted, isMuted, speechSynthesisSupported])

  // Handle step change - speak narration
  useEffect(() => {
    if (isOpen && hasAutoStarted && !isMuted && speechSynthesisSupported) {
      speakNarration()
    }
  }, [currentStep, isOpen, hasAutoStarted, isMuted, speechSynthesisSupported])

  const speakNarration = () => {
    if (isMuted || !speechSynthesisSupported || !speechSynthesisRef.current) return

    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel()

    const step = onboardingSteps[currentStep]

    // Create a new utterance
    try {
      const utterance = new SpeechSynthesisUtterance(step.narration)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0

      // Get available voices and set a natural sounding one if available
      const voices = speechSynthesisRef.current.getVoices()
      const preferredVoice = voices.find(
        (voice) =>
          voice.name.includes("Samantha") ||
          voice.name.includes("Google US English Female") ||
          voice.name.includes("Microsoft Zira"),
      )

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      // Set event handlers
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => {
        setIsSpeaking(false)
        setIsPaused(false)
      }
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event)
        setIsSpeaking(false)
        setIsPaused(false)
      }

      // Store reference to current utterance
      utteranceRef.current = utterance

      // Start speaking
      speechSynthesisRef.current.speak(utterance)
      setIsSpeaking(true)
      setIsPaused(false)
    } catch (error) {
      console.error("Error with speech synthesis:", error)
      setSpeechSynthesisSupported(false)
    }
  }

  const pauseNarration = () => {
    if (isSpeaking && !isPaused && speechSynthesisRef.current) {
      try {
        speechSynthesisRef.current.pause()
        setIsPaused(true)
      } catch (error) {
        console.error("Error pausing speech:", error)
      }
    }
  }

  const resumeNarration = () => {
    if (isSpeaking && isPaused && speechSynthesisRef.current) {
      try {
        speechSynthesisRef.current.resume()
        setIsPaused(false)
      } catch (error) {
        console.error("Error resuming speech:", error)
      }
    }
  }

  const stopNarration = () => {
    if (speechSynthesisRef.current) {
      try {
        speechSynthesisRef.current.cancel()
        setIsSpeaking(false)
        setIsPaused(false)
      } catch (error) {
        console.error("Error stopping speech:", error)
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted && speechSynthesisSupported) {
      stopNarration()
    } else if (isOpen && speechSynthesisSupported) {
      speakNarration()
    }
  }

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      stopNarration()
      setCurrentStep(currentStep + 1)
      setCompletedSteps([...completedSteps, onboardingSteps[currentStep].id])
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      stopNarration()
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    stopNarration()
    toast({
      title: "Onboarding skipped",
      description: "You can always access the tour from your profile settings.",
      status: "info",
      duration: 5000,
      isClosable: true,
    })
    onClose()
    if (onComplete) onComplete()
  }

  const handleComplete = () => {
    stopNarration()
    toast({
      title: "Onboarding completed",
      description: "Welcome to SnappAiFi! Your financial journey begins now.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    onClose()
    if (onComplete) onComplete()
  }

  const renderStepContent = () => {
    const step = onboardingSteps[currentStep]
    const iconBgColor = step.color
      ? useColorModeValue(`${step.color.split(".")[0]}.50`, "whiteAlpha.200")
      : defaultIconBgColor

    return (
      <VStack spacing={6} align="center" textAlign="center" py={8}>
        {step.image ? (
          <Image
            src={step.image || "/placeholder.svg"}
            alt={step.title}
            borderRadius="md"
            maxH="200px"
            objectFit="cover"
          />
        ) : (
          <Box bg={iconBgColor} p={5} borderRadius="full" mb={2}>
            <Icon as={step.icon} boxSize={16} color={step.color} />
          </Box>
        )}

        <Heading size="lg" color={textColor}>
          {step.title}
        </Heading>

        <Text fontSize="lg" maxW="500px">
          {step.description}
        </Text>

        {step.id === "complete" && (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4} width="100%">
            <Card bg={cardBg} variant="outline">
              <CardBody textAlign="center">
                <Icon as={FaChartLine} boxSize={8} color="blue.500" mb={3} />
                <Heading size="sm" mb={2}>
                  Check Your Credit
                </Heading>
                <Text fontSize="sm">View your holistic credit score and improvement plan.</Text>
              </CardBody>
            </Card>

            <Card bg={cardBg} variant="outline">
              <CardBody textAlign="center">
                <Icon as={FaUsers} boxSize={8} color="green.500" mb={3} />
                <Heading size="sm" mb={2}>
                  Create a Support Goal
                </Heading>
                <Text fontSize="sm">Start building your support network for financial goals.</Text>
              </CardBody>
            </Card>

            <Card bg={cardBg} variant="outline">
              <CardBody textAlign="center">
                <Icon as={FaLightbulb} boxSize={8} color="purple.500" mb={3} />
                <Heading size="sm" mb={2}>
                  Submit an Innovation
                </Heading>
                <Text fontSize="sm">Turn your ideas into patented, tokenized assets.</Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        )}
      </VStack>
    )
  }

  const renderAudioControls = () => {
    if (!speechSynthesisSupported) return null

    return (
      <HStack spacing={2} mt={2} justifyContent="flex-end">
        <Tooltip label={isMuted ? "Unmute narration" : "Mute narration"}>
          <Button size="sm" variant="ghost" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
            <Icon as={isMuted ? FaVolumeMute : FaVolumeUp} />
          </Button>
        </Tooltip>

        {!isMuted && (
          <Tooltip label={isPaused ? "Resume narration" : "Pause narration"}>
            <Button
              size="sm"
              variant="ghost"
              onClick={isPaused ? resumeNarration : pauseNarration}
              isDisabled={!isSpeaking || isMuted}
              aria-label={isPaused ? "Resume" : "Pause"}
            >
              <Icon as={isPaused ? FaPlay : FaPause} />
            </Button>
          </Tooltip>
        )}
      </HStack>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleSkip} size="xl" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Text>SnappAiFi AI-Guided Tour</Text>
            <Button size="sm" variant="ghost" onClick={handleSkip}>
              <Icon as={FaTimes} />
            </Button>
          </Flex>
        </ModalHeader>
        <ModalBody p={0}>
          <Box px={6}>
            <Flex justify="space-between" align="center" mb={1}>
              <Text fontSize="sm" color="gray.500">
                Step {currentStep + 1} of {onboardingSteps.length}
              </Text>
              {renderAudioControls()}
            </Flex>
            <Progress
              value={(currentStep / (onboardingSteps.length - 1)) * 100}
              size="sm"
              colorScheme="blue"
              borderRadius="full"
              mb={4}
            />
          </Box>

          {renderStepContent()}
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button variant="ghost" mr={3} onClick={handleBack} isDisabled={currentStep === 0}>
            <Icon as={FaArrowLeft} mr={2} />
            Back
          </Button>
          <Button colorScheme="blue" onClick={handleNext}>
            {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
            {currentStep !== onboardingSteps.length - 1 && <Icon as={FaArrowRight} ml={2} />}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

// HStack component for audio controls
const HStack = ({ children, ...props }) => (
  <Flex direction="row" {...props}>
    {children}
  </Flex>
)

export default AIOnboardingFlow
