"use client"

import { Button, Icon, useDisclosure } from "@chakra-ui/react"
import { FaRocket } from "react-icons/fa"
import AIOnboardingFlow from "./AIOnboardingFlow"

const LaunchAITour = ({ variant = "solid", size = "md", ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        leftIcon={<Icon as={FaRocket} />}
        colorScheme="blue"
        variant={variant}
        size={size}
        onClick={onOpen}
        {...props}
      >
        Start AI Tour
      </Button>

      {isOpen && <AIOnboardingFlow isFirstLogin={false} onComplete={onClose} />}
    </>
  )
}

export default LaunchAITour
