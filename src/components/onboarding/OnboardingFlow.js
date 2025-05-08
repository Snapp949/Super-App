"use client"

import { useState, useEffect } from "react"
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
  useDisclosure,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { FaUsers, FaLightbulb, FaChartLine, FaCheckCircle, FaArrowRight, FaArrowLeft, FaTimes } from "react-icons/fa"

const onboardingSteps = [
  {
    id: "welcome",
    title: "Welcome to SnappAiFi",
    description: "Discover a new approach to wealth building with inclusive financial tools.",
    image: "/abstract-financial-background.png",
  },
  {
    id: "holistic-credit",
    title: "Holistic Credit Scoring",
    description:
      "Our system considers your full financial picture, including support networks, education, and justified hardships.",
    icon: FaChartLine,
    color: "blue.500",
  },
  {
    id: "support-collective",
    title: "Support Collective",
    description: "Create and receive financial support from your community for specific life goals.",
    icon: FaUsers,
    color: "green.500",
  },
  {
    id: "patent-nff",
    title: "Innovation & Patents",
    description: "Tokenize your intellectual property with our Non-Fungible Fund system.",
    icon: FaLightbulb,
    color: "purple.500",
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "Start exploring the platform and building your financial future.",
    icon: FaCheckCircle,
    color: "green.500",
  },
]

const OnboardingFlow = ({ isFirstLogin = true, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  // Colors
  const cardBg = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "white")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  useEffect(() => {
    // Show onboarding modal for first-time users
    if (isFirstLogin) {
      onOpen()
    }
  }, [isFirstLogin, onOpen])

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setCompletedSteps([...completedSteps, onboardingSteps[currentStep].id])
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
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
    const iconBgColor = step.color ? useColorModeValue(`${step.color.split(".")[0]}.50`, "whiteAlpha.200") : undefined

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

  return (
    <Modal isOpen={isOpen} onClose={handleSkip} size="xl" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Text>SnappAiFi Onboarding</Text>
            <Button size="sm" variant="ghost" onClick={handleSkip}>
              <Icon as={FaTimes} />
            </Button>
          </Flex>
        </ModalHeader>
        <ModalBody p={0}>
          <Box px={6}>
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

export default OnboardingFlow
