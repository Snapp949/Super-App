"use client"

import { useState, useEffect, useRef } from "react"
import { Box, Button, Flex, Text, Heading, Portal, VStack, Icon, useColorModeValue } from "@chakra-ui/react"
import { FaArrowRight, FaArrowLeft, FaTimes, FaVolumeUp, FaVolumeMute, FaPause, FaPlay } from "react-icons/fa"

const GuidedFeatureTour = ({ steps = [], isOpen, onClose, autoStart = true, enableVoice = true }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(!enableVoice)
  const [isPaused, setIsPaused] = useState(false)
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(true)

  const speechSynthesisRef = useRef(null)
  const utteranceRef = useRef(null)
  const tooltipRef = useRef(null)

  // Colors
  const tooltipBg = useColorModeValue("white", "gray.800")
  const overlayBg = useColorModeValue("rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.7)")

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthesisRef.current = window.speechSynthesis
    } else {
      console.warn("This browser does not support speech synthesis")
      setSpeechSynthesisSupported(false)
    }

    return () => {
      if (speechSynthesisRef.current && utteranceRef.current) {
        speechSynthesisRef.current.cancel()
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen && steps.length > 0) {
      highlightElement()
      if (autoStart && enableVoice && !isMuted && speechSynthesisSupported) {
        setTimeout(speakNarration, 500)
      }
    }

    return () => {
      if (utteranceRef.current && speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }
    }
  }, [isOpen, currentStep, steps, autoStart, enableVoice, isMuted, speechSynthesisSupported])

  useEffect(() => {
    window.addEventListener("resize", highlightElement)

    return () => {
      window.removeEventListener("resize", highlightElement)
    }
  }, [currentStep, isOpen, steps])

  const highlightElement = () => {
    if (!isOpen || !steps[currentStep]) return

    const targetId = steps[currentStep].targetId
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      })

      // Position tooltip
      positionTooltip(rect)
    } else {
      console.warn(`Target element with ID "${targetId}" not found.`)
      setTargetRect(null)
    }
  }

  const positionTooltip = (targetRect) => {
    if (!tooltipRef.current) return

    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    // Default position is below the target
    let top = targetRect.bottom + 10
    let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2

    // Check if tooltip would go off the bottom of the screen
    if (top + tooltipRect.height > windowHeight) {
      // Place tooltip above target instead
      top = targetRect.top - tooltipRect.height - 10
    }

    // Ensure tooltip stays within horizontal bounds
    left = Math.max(10, Math.min(left, windowWidth - tooltipRect.width - 10))

    tooltipRef.current.style.top = `${top}px`
    tooltipRef.current.style.left = `${left}px`
  }

  const speakNarration = () => {
    if (isMuted || !steps[currentStep]?.narration || !speechSynthesisSupported || !speechSynthesisRef.current) return

    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel()

    try {
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(steps[currentStep].narration)
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
    } else if (isOpen && steps[currentStep]?.narration && speechSynthesisSupported) {
      speakNarration()
    }
  }

  const handleNext = () => {
    stopNarration()
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    stopNarration()
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    stopNarration()
    onClose()
  }

  if (!isOpen || steps.length === 0) return null

  return (
    <Portal>
      {/* Overlay */}
      <Box position="fixed" top={0} left={0} right={0} bottom={0} bg={overlayBg} zIndex={1000} pointerEvents="none" />

      {/* Highlight */}
      {targetRect && (
        <Box
          position="fixed"
          top={targetRect.top - 4}
          left={targetRect.left - 4}
          width={targetRect.width + 8}
          height={targetRect.height + 8}
          boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.75)"
          zIndex={1001}
          border="2px solid"
          borderColor="blue.400"
          borderRadius="md"
          pointerEvents="none"
        />
      )}

      {/* Tooltip */}
      <Box
        ref={tooltipRef}
        position="fixed"
        zIndex={1002}
        bg={tooltipBg}
        borderRadius="md"
        boxShadow="lg"
        p={4}
        maxWidth="350px"
        pointerEvents="auto"
      >
        <VStack align="stretch" spacing={3}>
          <Flex justify="space-between" align="center">
            <Heading size="sm">{steps[currentStep].title}</Heading>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <Icon as={FaTimes} />
            </Button>
          </Flex>

          <Text>{steps[currentStep].content}</Text>

          <Flex justify="space-between" align="center">
            <HStack spacing={2}>
              {enableVoice && speechSynthesisSupported && (
                <>
                  <Button size="sm" variant="ghost" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                    <Icon as={isMuted ? FaVolumeMute : FaVolumeUp} />
                  </Button>

                  {!isMuted && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={isPaused ? resumeNarration : pauseNarration}
                      isDisabled={!isSpeaking || isMuted}
                      aria-label={isPaused ? "Resume" : "Pause"}
                    >
                      <Icon as={isPaused ? FaPlay : FaPause} />
                    </Button>
                  )}
                </>
              )}
            </HStack>

            <HStack spacing={2}>
              <Text fontSize="sm" color="gray.500">
                {currentStep + 1} / {steps.length}
              </Text>
              <Button size="sm" variant="ghost" onClick={handlePrevious} isDisabled={currentStep === 0}>
                <Icon as={FaArrowLeft} />
              </Button>
              <Button size="sm" colorScheme="blue" onClick={handleNext}>
                {currentStep === steps.length - 1 ? "Finish" : <Icon as={FaArrowRight} />}
              </Button>
            </HStack>
          </Flex>
        </VStack>
      </Box>
    </Portal>
  )
}

// HStack component
const HStack = ({ children, ...props }) => (
  <Flex direction="row" {...props}>
    {children}
  </Flex>
)

export default GuidedFeatureTour
