"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Text,
  Progress,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Card,
  CardHeader,
  CardBody,
  Heading,
  List,
  ListItem,
  ListIcon,
  Icon,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import {
  FaGraduationCap,
  FaUsers,
  FaMapMarkerAlt,
  FaBriefcase,
  FaHome,
  FaChartLine,
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa"

// Mock data - would be replaced with real API data
const mockUserCreditData = {
  traditional_score: 650,
  holistic_score: 780,
  education: {
    level: "Bachelor's Degree",
    field: "Computer Science",
    continuingEducation: true,
    score: 85,
  },
  support_network: {
    familySupport: true,
    peerReferences: 4,
    communityInvolvement: "Medium",
    score: 90,
  },
  location: {
    stability: "3 years",
    gentrificationImpact: "Medium",
    relocationReason: "Career Opportunity",
    score: 75,
  },
  career: {
    industry: "Technology",
    stability: "4 years",
    growthTrajectory: "Positive",
    score: 88,
  },
  hardship_factors: {
    hasHardships: true,
    type: ["Medical Expenses", "Gentrification"],
    documentation: true,
    score: 70,
  },
}

const HolisticCreditScoring = () => {
  const [creditData, setCreditData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)

  // Colors
  const cardBg = useColorModeValue("white", "navy.700")
  const textColor = useColorModeValue("gray.700", "white")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100")
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400")
  const electricBlue = "#007bff"
  const gold = "#FFD700"

  useEffect(() => {
    // Simulate API call to get credit data
    setTimeout(() => {
      setCreditData(mockUserCreditData)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <Box p={5}>
        <Text>Loading credit assessment...</Text>
        <Progress size="xs" isIndeterminate colorScheme="blue" mt={2} />
      </Box>
    )
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "green.500"
    if (score >= 65) return "yellow.500"
    return "red.500"
  }

  const getScoreDescription = (score) => {
    if (score >= 80) return "Excellent"
    if (score >= 65) return "Good"
    if (score >= 50) return "Fair"
    return "Needs Improvement"
  }

  const renderScoreComparison = () => (
    <Card bg={cardBg} boxShadow="md" mb={5}>
      <CardHeader pb={2}>
        <Heading size="md" color={textColor}>
          Credit Score Comparison
        </Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
          <Box>
            <Text fontSize="lg" fontWeight="medium" mb={2}>
              Traditional Credit Score
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color={getScoreColor(creditData.traditional_score / 8.5)}>
              {creditData.traditional_score}
            </Text>
            <Progress
              value={creditData.traditional_score / 8.5}
              colorScheme={
                creditData.traditional_score >= 700 ? "green" : creditData.traditional_score >= 600 ? "yellow" : "red"
              }
              size="sm"
              mt={2}
              mb={1}
            />
            <Text fontSize="sm" color={secondaryTextColor}>
              Based only on payment history, debt levels, and credit age
            </Text>
          </Box>

          <Box
            borderLeft={{ base: "none", md: "1px solid" }}
            borderTop={{ base: "1px solid", md: "none" }}
            borderColor={borderColor}
            pl={{ base: 0, md: 4 }}
            pt={{ base: 4, md: 0 }}
            mt={{ base: 2, md: 0 }}
          >
            <Text fontSize="lg" fontWeight="medium" mb={2}>
              SnappAiFi Holistic Score
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color={getScoreColor(creditData.holistic_score / 8.5)}>
              {creditData.holistic_score}
            </Text>
            <Progress value={creditData.holistic_score / 8.5} colorScheme="blue" size="sm" mt={2} mb={1} />
            <Text fontSize="sm" color={secondaryTextColor}>
              Includes support networks, education, location stability, and justified hardships
            </Text>
          </Box>
        </SimpleGrid>
      </CardBody>
    </Card>
  )

  const renderFactorDetail = (title, score, icon, details) => (
    <Card bg={cardBg} boxShadow="sm" mb={4}>
      <CardHeader display="flex" alignItems="center" pb={2}>
        <Icon as={icon} mr={2} color={electricBlue} boxSize={5} />
        <Heading size="sm" color={textColor}>
          {title}
        </Heading>
        <Spacer />
        <Box bg={getScoreColor(score)} color="white" borderRadius="full" px={3} py={1} fontSize="sm" fontWeight="bold">
          {score}
        </Box>
      </CardHeader>
      <CardBody pt={0}>
        <List spacing={2}>
          {details.map((detail, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <ListIcon
                as={detail.positive ? FaCheck : FaExclamationTriangle}
                color={detail.positive ? "green.500" : "yellow.500"}
              />
              <Text fontSize="sm">{detail.text}</Text>
              {detail.tooltip && (
                <Tooltip label={detail.tooltip} placement="top">
                  <Box as="span" ml={1} cursor="help">
                    <Icon as={FaInfoCircle} color={secondaryTextColor} boxSize={3} />
                  </Box>
                </Tooltip>
              )}
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  )

  return (
    <Box>
      {renderScoreComparison()}

      <Tabs isLazy variant="enclosed" onChange={setActiveTab} colorScheme="blue" mb={5}>
        <TabList>
          <Tab _selected={{ color: electricBlue, borderColor: electricBlue, borderBottomColor: "transparent" }}>
            Score Factors
          </Tab>
          <Tab _selected={{ color: electricBlue, borderColor: electricBlue, borderBottomColor: "transparent" }}>
            Improvement Plan
          </Tab>
          <Tab _selected={{ color: electricBlue, borderColor: electricBlue, borderBottomColor: "transparent" }}>
            History
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {renderFactorDetail("Education", creditData.education.score, FaGraduationCap, [
                { text: `${creditData.education.level} in ${creditData.education.field}`, positive: true },
                {
                  text: creditData.education.continuingEducation
                    ? "Pursuing continuing education"
                    : "No continuing education activities",
                  positive: creditData.education.continuingEducation,
                },
              ])}

              {renderFactorDetail("Support Network", creditData.support_network.score, FaUsers, [
                {
                  text: `Family support: ${creditData.support_network.familySupport ? "Available" : "Not available"}`,
                  positive: creditData.support_network.familySupport,
                },
                {
                  text: `${creditData.support_network.peerReferences} positive peer references`,
                  positive: creditData.support_network.peerReferences >= 3,
                },
                {
                  text: `${creditData.support_network.communityInvolvement} community involvement`,
                  positive: creditData.support_network.communityInvolvement !== "Low",
                },
              ])}

              {renderFactorDetail("Location Stability", creditData.location.score, FaMapMarkerAlt, [
                {
                  text: `${creditData.location.stability} at current residence`,
                  positive: Number.parseInt(creditData.location.stability) >= 2,
                  tooltip: "Stable housing for 2+ years increases score",
                },
                {
                  text: `Gentrification impact: ${creditData.location.gentrificationImpact}`,
                  positive: false,
                  tooltip: "Recognized as a hardship factor",
                },
                {
                  text: `Relocation reason: ${creditData.location.relocationReason}`,
                  positive: creditData.location.relocationReason === "Career Opportunity",
                },
              ])}

              {renderFactorDetail("Career Trajectory", creditData.career.score, FaBriefcase, [
                { text: `${creditData.career.industry} industry`, positive: true },
                {
                  text: `${creditData.career.stability} career stability`,
                  positive: Number.parseInt(creditData.career.stability) >= 2,
                },
                {
                  text: `${creditData.career.growthTrajectory} growth trajectory`,
                  positive: creditData.career.growthTrajectory === "Positive",
                },
              ])}

              {renderFactorDetail("Financial Hardship Context", creditData.hardship_factors.score, FaHome, [
                {
                  text: `Identified hardships: ${creditData.hardship_factors.type.join(", ")}`,
                  positive: true,
                  tooltip: "Documented hardships are considered in score calculations",
                },
                {
                  text: `Hardship documentation: ${creditData.hardship_factors.documentation ? "Provided" : "Not provided"}`,
                  positive: creditData.hardship_factors.documentation,
                },
              ])}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <Card bg={cardBg} boxShadow="md">
              <CardHeader>
                <Heading size="md" color={textColor}>
                  Personalized Improvement Plan
                </Heading>
              </CardHeader>
              <CardBody>
                <Text mb={4}>Follow these recommended actions to improve your holistic credit score:</Text>

                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaChartLine} color={electricBlue} />
                    <Text as="span" fontWeight="bold">
                      Join a professional networking group
                    </Text>
                    <Text mt={1} ml={6} fontSize="sm" color={secondaryTextColor}>
                      Expanding your professional network strengthens your support system and creates opportunities
                    </Text>
                  </ListItem>

                  <ListItem>
                    <ListIcon as={FaGraduationCap} color={electricBlue} />
                    <Text as="span" fontWeight="bold">
                      Complete online financial literacy course
                    </Text>
                    <Text mt={1} ml={6} fontSize="sm" color={secondaryTextColor}>
                      SnappAiFi offers free courses that can improve your education factor
                    </Text>
                  </ListItem>

                  <ListItem>
                    <ListIcon as={FaUsers} color={electricBlue} />
                    <Text as="span" fontWeight="bold">
                      Add more peer references
                    </Text>
                    <Text mt={1} ml={6} fontSize="sm" color={secondaryTextColor}>
                      Ask trusted colleagues or mentors to provide references
                    </Text>
                  </ListItem>

                  <ListItem>
                    <ListIcon as={FaHome} color={electricBlue} />
                    <Text as="span" fontWeight="bold">
                      Document housing stability plan
                    </Text>
                    <Text mt={1} ml={6} fontSize="sm" color={secondaryTextColor}>
                      If you're affected by gentrification, document your plan for stable housing
                    </Text>
                  </ListItem>
                </List>
              </CardBody>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card bg={cardBg} boxShadow="md">
              <CardHeader>
                <Heading size="md" color={textColor}>
                  Score History
                </Heading>
              </CardHeader>
              <CardBody>
                <Text mb={4}>Your holistic credit score over time:</Text>

                {/* This would be a chart component in the real implementation */}
                <Box h="300px" border="1px" borderColor={borderColor} borderRadius="md" p={4} mb={4}>
                  <Text textAlign="center" color={secondaryTextColor}>
                    Score history chart would appear here
                  </Text>
                </Box>

                <Divider my={4} />

                <Text fontWeight="medium" mb={2}>
                  Key Events
                </Text>
                <List spacing={3}>
                  <ListItem>
                    <Text fontWeight="medium">April 2023</Text>
                    <Text fontSize="sm" color={secondaryTextColor}>
                      Holistic Score increased 45 points after adding peer references and documenting career advancement
                    </Text>
                  </ListItem>

                  <ListItem>
                    <Text fontWeight="medium">January 2023</Text>
                    <Text fontSize="sm" color={secondaryTextColor}>
                      Holistic Score increased 30 points after documenting gentrification impact and relocation plan
                    </Text>
                  </ListItem>

                  <ListItem>
                    <Text fontWeight="medium">October 2022</Text>
                    <Text fontSize="sm" color={secondaryTextColor}>
                      Baseline holistic score established at 705
                    </Text>
                  </ListItem>
                </List>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

const Spacer = () => <Box flex="1" />

export default HolisticCreditScoring
