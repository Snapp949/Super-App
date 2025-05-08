"use client"

import { Box, Heading, Text, SimpleGrid, Card, CardBody, Icon, useColorModeValue } from "@chakra-ui/react"
import LaunchFeatureTour from "src/components/onboarding/LaunchFeatureTour"
import LaunchAITour from "src/components/onboarding/LaunchAITour"
import { FaChartLine, FaUsers, FaLightbulb } from "react-icons/fa"

const InnovationDashboard = () => {
  const textColor = useColorModeValue("gray.700", "white")
  const cardBg = useColorModeValue("white", "gray.800")

  return (
    <Box>
      <Heading size="lg" mb={4} color={textColor}>
        Innovation Dashboard
      </Heading>
      <Text mb={6} color={textColor}>
        Welcome to your Innovation Hub. Explore and manage your patents and Non-Fungible Funds (NFFs) here.
      </Text>

      <Box mb={6} display="flex" gap={4}>
        <LaunchFeatureTour />
        <LaunchAITour />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        <Card bg={cardBg} id="credit-score-card">
          <CardBody>
            <Icon as={FaChartLine} boxSize={8} color="blue.500" mb={3} />
            <Heading size="md" mb={2}>
              Holistic Credit Score
            </Heading>
            <Text>
              View and improve your holistic credit assessment based on a comprehensive evaluation of your financial
              profile.
            </Text>
          </CardBody>
        </Card>

        <Card bg={cardBg} id="support-collective-card">
          <CardBody>
            <Icon as={FaUsers} boxSize={8} color="green.500" mb={3} />
            <Heading size="md" mb={2}>
              Support Collective
            </Heading>
            <Text>Create and manage support goals with contributions from your community network.</Text>
          </CardBody>
        </Card>

        <Card bg={cardBg} id="innovation-card">
          <CardBody>
            <Icon as={FaLightbulb} boxSize={8} color="purple.500" mb={3} />
            <Heading size="md" mb={2}>
              Innovation Portfolio
            </Heading>
            <Text>Submit, track, and tokenize your patented innovations as Non-Fungible Funds.</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  )
}

export default InnovationDashboard
