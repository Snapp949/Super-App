"use client"

import { useState, useMemo } from "react"
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Image,
  Icon,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react"
import {
  FaApple,
  FaAndroid,
  FaQrCode,
  FaMobile,
  FaChartLine,
  FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaBell,
  FaFingerprint,
} from "react-icons/fa"

const MobileAppPreview = () => {
  const [activeTab, setActiveTab] = useState(0)

  // Colors
  const cardBg = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "white")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const electricBlue = "#007bff"

  const features = useMemo(
    () => [
      {
        title: "Holistic Credit Monitoring",
        description: "Track your credit score and improvement opportunities on the go.",
        icon: FaChartLine,
        color: "blue.500",
      },
      {
        title: "Support Network",
        description: "Manage your support goals and contributions from anywhere.",
        icon: FaUsers,
        color: "green.500",
      },
      {
        title: "Innovation Tracking",
        description: "Monitor your patent applications and NFF performance.",
        icon: FaLightbulb,
        color: "purple.500",
      },
      {
        title: "Biometric Security",
        description: "Secure access with fingerprint and face recognition.",
        icon: FaFingerprint,
        color: "red.500",
      },
      {
        title: "Real-time Notifications",
        description: "Stay updated on important changes and opportunities.",
        icon: FaBell,
        color: "orange.500",
      },
      {
        title: "Enhanced Privacy",
        description: "Control your data sharing preferences with ease.",
        icon: FaShieldAlt,
        color: "teal.500",
      },
    ],
    [],
  )

  const renderOverviewTab = () => (
    <Box>
      <Flex direction={{ base: "column", lg: "row" }} align="center" justify="space-between" mb={10}>
        <Box maxW={{ base: "100%", lg: "50%" }} mb={{ base: 8, lg: 0 }}>
          <Heading size="xl" mb={4}>
            SnappAiFi Mobile Experience
          </Heading>
          <Text fontSize="lg" mb={6}>
            Take control of your financial future with our comprehensive mobile app. Access all platform features
            anytime, anywhere.
          </Text>
          <HStack spacing={4} mb={6}>
            <Button leftIcon={<FaApple />} colorScheme="blackAlpha" size="lg">
              App Store
            </Button>
            <Button leftIcon={<FaAndroid />} colorScheme="green" size="lg">
              Google Play
            </Button>
          </HStack>
          <HStack>
            <Icon as={FaQrCode} boxSize={10} color={electricBlue} />
            <Text>Scan to download the app</Text>
          </HStack>
        </Box>

        <Box
          maxW={{ base: "280px", lg: "320px" }}
          borderWidth="8px"
          borderColor="black"
          borderRadius="36px"
          overflow="hidden"
          boxShadow="2xl"
        >
          <Image src="/mobile-app-dashboard.png" alt="SnappAiFi Mobile App" w="100%" />
        </Box>
      </Flex>

      <Heading size="lg" mb={6} textAlign="center">
        Key Features
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {features.map((feature, index) => (
          <Card key={index} bg={cardBg}>
            <CardBody>
              <VStack align="start" spacing={3}>
                <Icon as={feature.icon} boxSize={8} color={feature.color} />
                <Heading size="md">{feature.title}</Heading>
                <Text>{feature.description}</Text>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )

  const renderScreenshotsTab = () => (
    <Box>
      <Heading size="lg" mb={6} textAlign="center">
        App Screenshots
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} justifyItems="center">
        <Box borderWidth="8px" borderColor="black" borderRadius="24px" overflow="hidden" boxShadow="lg" maxW="220px">
          <Image src="/mobile-app-dashboard.png" alt="Dashboard Screen" w="100%" />
          <Text textAlign="center" mt={2} fontWeight="medium">
            Dashboard
          </Text>
        </Box>

        <Box borderWidth="8px" borderColor="black" borderRadius="24px" overflow="hidden" boxShadow="lg" maxW="220px">
          <Image src="/placeholder.svg?key=c592s" alt="Credit Score Screen" w="100%" />
          <Text textAlign="center" mt={2} fontWeight="medium">
            Credit Score
          </Text>
        </Box>

        <Box borderWidth="8px" borderColor="black" borderRadius="24px" overflow="hidden" boxShadow="lg" maxW="220px">
          <Image src="/mobile-app-support-goals.png" alt="Support Goals Screen" w="100%" />
          <Text textAlign="center" mt={2} fontWeight="medium">
            Support Goals
          </Text>
        </Box>

        <Box borderWidth="8px" borderColor="black" borderRadius="24px" overflow="hidden" boxShadow="lg" maxW="220px">
          <Image src="/placeholder.svg?key=0clz2" alt="Patents Screen" w="100%" />
          <Text textAlign="center" mt={2} fontWeight="medium">
            Patents & NFF
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  )

  const renderDownloadTab = () => {
    const boxBg = useColorModeValue("gray.50", "gray.700")

    return (
      <Box>
        <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-around" mb={10}>
          <VStack spacing={6} maxW="400px" mb={{ base: 10, md: 0 }}>
            <Icon as={FaApple} boxSize={16} />
            <Heading size="lg">iOS App</Heading>
            <Text textAlign="center">Download the SnappAiFi app for iPhone and iPad. Requires iOS 14.0 or later.</Text>
            <Button colorScheme="blackAlpha" size="lg" width="200px">
              Download for iOS
            </Button>
            <Box borderWidth="1px" borderColor={borderColor} borderRadius="md" p={4} bg={boxBg}>
              <Icon as={FaQrCode} boxSize={32} />
            </Box>
          </VStack>

          <VStack spacing={6} maxW="400px">
            <Icon as={FaAndroid} boxSize={16} color="green.500" />
            <Heading size="lg">Android App</Heading>
            <Text textAlign="center">
              Download the SnappAiFi app for Android devices. Requires Android 8.0 or later.
            </Text>
            <Button colorScheme="green" size="lg" width="200px">
              Download for Android
            </Button>
            <Box borderWidth="1px" borderColor={borderColor} borderRadius="md" p={4} bg={boxBg}>
              <Icon as={FaQrCode} boxSize={32} />
            </Box>
          </VStack>
        </Flex>

        <Card bg={cardBg} mt={10}>
          <CardBody>
            <VStack spacing={4} align="start">
              <Heading size="md">System Requirements</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
                <Box>
                  <Heading size="sm" mb={2}>
                    iOS
                  </Heading>
                  <Text>• iOS 14.0 or later</Text>
                  <Text>• iPhone 8 or newer</Text>
                  <Text>• iPad (6th generation) or newer</Text>
                  <Text>• 100MB free space</Text>
                </Box>
                <Box>
                  <Heading size="sm" mb={2}>
                    Android
                  </Heading>
                  <Text>• Android 8.0 or later</Text>
                  <Text>• 2GB RAM or more</Text>
                  <Text>• 120MB free space</Text>
                  <Text>• Google Play Services</Text>
                </Box>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    )
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Mobile App</Heading>
        <Button leftIcon={<FaMobile />} colorScheme="blue">
          Download Now
        </Button>
      </Flex>

      <Tabs variant="soft-rounded" colorScheme="blue" onChange={(index) => setActiveTab(index)} mb={6}>
        <TabList mb={5}>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            Overview
          </Tab>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            Screenshots
          </Tab>
          <Tab _selected={{ bg: electricBlue, color: "white" }}>Download</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>{renderOverviewTab()}</TabPanel>
          <TabPanel px={0}>{renderScreenshotsTab()}</TabPanel>
          <TabPanel px={0}>{renderDownloadTab()}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default MobileAppPreview
