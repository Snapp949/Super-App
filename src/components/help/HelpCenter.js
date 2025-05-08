"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from "@chakra-ui/react"
import {
  FaSearch,
  FaChartLine,
  FaUsers,
  FaLightbulb,
  FaQuestionCircle,
  FaBook,
  FaVideo,
  FaHeadset,
  FaInfoCircle,
  FaLock,
} from "react-icons/fa"

// Mock help center data
const helpCenterData = {
  faq: [
    {
      category: "Credit Scoring",
      questions: [
        {
          question: "How is my holistic credit score calculated?",
          answer:
            "Your holistic credit score is calculated using a combination of traditional credit factors and alternative data sources including your support network, education, location stability, career trajectory, and financial hardship context. Each factor is weighted based on its predictive value for financial responsibility.",
        },
        {
          question: "How often is my credit score updated?",
          answer:
            "Your holistic credit score is updated in real-time as new information becomes available. Major updates typically occur monthly, but significant changes to your profile can trigger immediate recalculations.",
        },
        {
          question: "How can I improve my holistic credit score?",
          answer:
            "You can improve your score by expanding your support network, pursuing education opportunities, maintaining stable housing, advancing your career, and documenting any financial hardships that may be affecting your traditional credit score.",
        },
      ],
    },
    {
      category: "Support Collective",
      questions: [
        {
          question: "How do I create a support goal?",
          answer:
            "To create a support goal, navigate to the Support Collective section, click 'Create New Goal', and follow the guided process to set up your funding target, timeline, and description. You can then invite supporters or make your goal public.",
        },
        {
          question: "Who can see my support goals?",
          answer:
            "By default, your support goals are visible to your invited supporters. You can choose to make them public, which allows anyone to view and contribute to them, or keep them private for invited supporters only.",
        },
        {
          question: "How does the Support Collective affect my credit score?",
          answer:
            "Having an active support network demonstrates financial stability and resilience, which positively impacts your holistic credit score. Successful funding of your goals and regular contributions from supporters can significantly improve your score.",
        },
      ],
    },
    {
      category: "Patents & NFF",
      questions: [
        {
          question: "What is a Non-Fungible Fund (NFF)?",
          answer:
            "A Non-Fungible Fund (NFF) is a tokenized representation of a patented innovation that allows for fractional ownership and investment. Unlike traditional NFTs, NFFs can continuously expand as the value of the underlying asset grows, providing ongoing investment opportunities.",
        },
        {
          question: "How do I submit an innovation for patenting?",
          answer:
            "Navigate to the Innovation & Patents section, click 'Submit New Innovation', and follow the guided process to describe your innovation, conduct a prior art search, provide technical documentation, and prepare for legal review and submission.",
        },
        {
          question: "What happens after my patent is approved?",
          answer:
            "Once your patent is approved, you can create an NFF to tokenize your innovation. This allows you to monetize your intellectual property by selling tokens to investors while maintaining ownership of the underlying asset.",
        },
      ],
    },
  ],
  guides: [
    {
      title: "Getting Started with Holistic Credit",
      description: "Learn how to understand and improve your holistic credit score.",
      icon: FaChartLine,
      color: "blue.500",
    },
    {
      title: "Building Your Support Network",
      description: "A comprehensive guide to creating and managing support goals.",
      icon: FaUsers,
      color: "green.500",
    },
    {
      title: "Patenting Your Innovations",
      description: "Step-by-step process for submitting and tokenizing your ideas.",
      icon: FaLightbulb,
      color: "purple.500",
    },
    {
      title: "Understanding Non-Fungible Funds",
      description: "Everything you need to know about NFFs and tokenization.",
      icon: FaLightbulb,
      color: "yellow.500",
    },
    {
      title: "Maximizing Your Financial Potential",
      description: "Advanced strategies for using all platform features together.",
      icon: FaChartLine,
      color: "red.500",
    },
    {
      title: "Security Best Practices",
      description: "Keeping your account and assets secure on the platform.",
      icon: FaLock,
      color: "gray.500",
    },
  ],
  videos: [
    {
      title: "Holistic Credit Score Explained",
      duration: "5:32",
      thumbnail: "/video-thumbnail.png",
    },
    {
      title: "Creating Your First Support Goal",
      duration: "8:15",
      thumbnail: "/video-thumbnail.png",
    },
    {
      title: "From Idea to Patent: Complete Walkthrough",
      duration: "12:47",
      thumbnail: "/video-thumbnail.png",
    },
    {
      title: "NFF Tokenization Process",
      duration: "10:23",
      thumbnail: "/video-thumbnail.png",
    },
  ],
}

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState(0)

  // Colors
  const cardBg = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "white")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const electricBlue = "#007bff"

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const renderFAQSection = () => {
    const accordionBg = useColorModeValue("gray.100", "gray.700")
    const accordionHoverBg = useColorModeValue("gray.200", "gray.600")
    const accordionItemHoverBg = useColorModeValue("gray.50", "gray.700")

    return (
      <Box>
        <Heading size="md" mb={4}>
          Frequently Asked Questions
        </Heading>

        <Accordion allowMultiple>
          {helpCenterData.faq.map((category, categoryIndex) => (
            <AccordionItem key={categoryIndex} border="none" mb={4}>
              <h2>
                <AccordionButton bg={accordionBg} borderRadius="md" _hover={{ bg: accordionHoverBg }}>
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    {category.category}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} pt={2}>
                <Accordion allowMultiple>
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} border="none" mb={2}>
                      <h3>
                        <AccordionButton _hover={{ bg: accordionItemHoverBg }} borderRadius="md" pl={2}>
                          <Icon as={FaQuestionCircle} color={electricBlue} mr={2} />
                          <Box flex="1" textAlign="left">
                            {faq.question}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h3>
                      <AccordionPanel pb={4} pl={8}>
                        <Text>{faq.answer}</Text>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    )
  }

  const renderGuidesSection = () => (
    <Box>
      <Heading size="md" mb={4}>
        Guides & Tutorials
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {helpCenterData.guides.map((guide, index) => (
          <Card key={index} bg={cardBg} _hover={{ shadow: "md" }} cursor="pointer">
            <CardBody>
              <VStack align="start" spacing={3}>
                <Icon as={guide.icon} boxSize={8} color={guide.color} />
                <Heading size="sm">{guide.title}</Heading>
                <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
                  {guide.description}
                </Text>
                <Button size="sm" colorScheme="blue" variant="link" rightIcon={<Icon as={FaBook} />}>
                  Read Guide
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )

  const renderVideosSection = () => (
    <Box>
      <Heading size="md" mb={4}>
        Video Tutorials
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {helpCenterData.videos.map((video, index) => (
          <Card key={index} bg={cardBg} direction="row" overflow="hidden" _hover={{ shadow: "md" }} cursor="pointer">
            <Box minW="200px" h="120px" position="relative">
              <Box
                as="img"
                src={video.thumbnail}
                alt={video.title}
                objectFit="cover"
                w="100%"
                h="100%"
                borderLeftRadius="md"
              />
              <Box
                position="absolute"
                bottom="5px"
                right="5px"
                bg="rgba(0,0,0,0.7)"
                color="white"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="xs"
              >
                {video.duration}
              </Box>
            </Box>
            <CardBody>
              <VStack align="start" spacing={2}>
                <Heading size="sm">{video.title}</Heading>
                <Button size="sm" colorScheme="red" variant="link" rightIcon={<Icon as={FaVideo} />}>
                  Watch Video
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )

  const renderContactSection = () => (
    <Box>
      <Heading size="md" mb={4}>
        Contact Support
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={6}>
        <Card bg={cardBg}>
          <CardBody>
            <VStack spacing={4} align="start">
              <Icon as={FaHeadset} boxSize={10} color={electricBlue} />
              <Heading size="md">Live Chat Support</Heading>
              <Text>Chat with our support team in real-time for immediate assistance.</Text>
              <Button colorScheme="blue" leftIcon={<Icon as={FaHeadset} />}>
                Start Chat
              </Button>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardBody>
            <VStack spacing={4} align="start">
              <Icon as={FaBook} boxSize={10} color={electricBlue} />
              <Heading size="md">Submit a Ticket</Heading>
              <Text>Create a support ticket for complex issues requiring detailed investigation.</Text>
              <Button colorScheme="blue" leftIcon={<Icon as={FaBook} />}>
                Create Ticket
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card bg={cardBg}>
        <CardBody>
          <Heading size="sm" mb={4}>
            Common Support Topics
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                Account Access Issues
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                Payment Problems
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                Credit Score Disputes
              </ListItem>
            </List>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                Support Goal Management
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                Patent Submission Help
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                NFF Token Issues
              </ListItem>
            </List>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  )

  return (
    <Box>
      <Flex direction="column" align="center" mb={8}>
        <Heading size="lg" mb={4}>
          Help Center
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={6} maxW="700px">
          Find answers to your questions about holistic credit scoring, support collectives, and patent tokenization.
        </Text>
        <InputGroup maxW="600px" size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search for help articles, guides, and videos..."
            value={searchQuery}
            onChange={handleSearch}
            borderRadius="full"
            bg={cardBg}
          />
        </InputGroup>
      </Flex>

      <Tabs variant="soft-rounded" colorScheme="blue" onChange={(index) => setActiveTab(index)} mb={6}>
        <TabList mb={5}>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaQuestionCircle} mr={2} />
            FAQ
          </Tab>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaBook} mr={2} />
            Guides
          </Tab>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaVideo} mr={2} />
            Videos
          </Tab>
          <Tab _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaHeadset} mr={2} />
            Contact
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>{renderFAQSection()}</TabPanel>
          <TabPanel px={0}>{renderGuidesSection()}</TabPanel>
          <TabPanel px={0}>{renderVideosSection()}</TabPanel>
          <TabPanel px={0}>{renderContactSection()}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default HelpCenter
