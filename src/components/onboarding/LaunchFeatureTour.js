"use client"
import { Button, Icon, useDisclosure } from "@chakra-ui/react"
import { FaMapMarkerAlt } from "react-icons/fa"
import GuidedFeatureTour from "./GuidedFeatureTour"

// Sample tour steps - these would typically be customized based on the page
const defaultTourSteps = [
  {
    targetId: "credit-score-card",
    title: "Holistic Credit Score",
    content:
      "This is your holistic credit score, which considers your full financial picture including support networks, education, and hardships.",
    narration:
      "Your holistic credit score is displayed here. Notice how it's higher than traditional credit scores because we consider your full financial picture, including your support networks, education achievements, and justified hardships.",
  },
  {
    targetId: "support-collective-card",
    title: "Support Collective",
    content: "Track your support goals and the contributions you've received from your community.",
    narration:
      "The Support Collective section shows your active support goals and the contributions you've received. This community support is a key factor in your holistic credit assessment.",
  },
  {
    targetId: "innovation-card",
    title: "Innovation Portfolio",
    content: "Your patented innovations and their tokenized value as Non-Fungible Funds.",
    narration:
      "Your Innovation Portfolio displays the value of your patented ideas that have been tokenized as Non-Fungible Funds. These assets can be invested in and grow in value over time.",
  },
]

const LaunchFeatureTour = ({
  tourSteps = defaultTourSteps,
  variant = "outline",
  size = "md",
  icon = FaMapMarkerAlt,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        leftIcon={<Icon as={icon} />}
        colorScheme="purple"
        variant={variant}
        size={size}
        onClick={onOpen}
        {...props}
      >
        Feature Tour
      </Button>

      <GuidedFeatureTour steps={tourSteps} isOpen={isOpen} onClose={onClose} enableVoice={true} autoStart={true} />
    </>
  )
}

export default LaunchFeatureTour
