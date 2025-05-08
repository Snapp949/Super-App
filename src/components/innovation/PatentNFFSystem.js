"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  Input,
  Select,
  SimpleGrid,
  Progress,
  Badge,
  Icon,
  Divider,
  HStack,
  VStack,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  useColorModeValue,
  useToast,
  Switch,
} from "@chakra-ui/react"
import {
  FaRegLightbulb,
  FaSearch,
  FaCheckCircle,
  FaFileAlt,
  FaRocket,
  FaMoneyBillWave,
  FaCubes,
  FaChartLine,
  FaCloudUploadAlt,
  FaExclamationTriangle,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa"

// Mock data for patents
const mockPatents = [
  {
    id: 1,
    title: "Adaptive Financial Risk Assessment System",
    status: "pending",
    submissionDate: "2023-03-15",
    description:
      "A system that uses alternative data sources to assess financial risk and creditworthiness more inclusively.",
    progress: 70,
    stage: "Legal Review",
    estimatedApproval: "2023-09-10",
    tokenized: false,
    patentOffice: "USPTO",
    applicationNumber: "US2023/012345",
    inventors: ["John Smith", "Maria Rodriguez"],
    valuationEstimate: "$1.2M",
  },
  {
    id: 2,
    title: "Peer Support Network for Financial Resilience",
    status: "draft",
    submissionDate: null,
    description:
      "A decentralized system enabling community support for financial emergencies with transparent tracking and repayment.",
    progress: 30,
    stage: "Technical Documentation",
    estimatedApproval: null,
    tokenized: false,
    patentOffice: null,
    applicationNumber: null,
    inventors: ["John Smith"],
    valuationEstimate: "$850K",
  },
  {
    id: 3,
    title: "Non-Fungible Fund Asset Management Protocol",
    status: "approved",
    submissionDate: "2022-11-20",
    description:
      "A blockchain protocol that enables the creation and management of asset-backed tokens with continuous expansion capabilities.",
    progress: 100,
    stage: "Tokenization",
    estimatedApproval: "2023-04-30",
    approvalDate: "2023-04-28",
    tokenized: true,
    patentOffice: "USPTO",
    applicationNumber: "US2022/098765",
    inventors: ["John Smith", "Wei Chen", "Sophia Patel"],
    valuationEstimate: "$3.2M",
    nffDetails: {
      totalTokens: 3200,
      currentPrice: "$1,025",
      peakPrice: "$1,120",
      investors: 28,
    },
  },
]

// Steps for new patent submission
const steps = [
  { title: "Idea Description", description: "Describe your innovative concept" },
  { title: "Market Analysis", description: "Identify market potential" },
  { title: "Prior Art Search", description: "Check for existing patents" },
  { title: "Technical Documentation", description: "Document technical details" },
  { title: "Legal Review", description: "Professional patent review" },
  { title: "Submission", description: "Submit to patent office" },
  { title: "Tokenization", description: "Create NFF structure" },
]

const PatentNFFSystem = () => {
  const [patents, setPatents] = useState(mockPatents)
  const [selectedPatent, setSelectedPatent] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [filterStatus, setFilterStatus] = useState("all")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isNewPatentOpen, onOpen: onNewPatentOpen, onClose: onNewPatentClose } = useDisclosure()
  const toast = useToast()

  // New patent submission stepper
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  // Colors
  const cardBg = useColorModeValue("white", "navy.700")
  const textColor = useColorModeValue("gray.700", "white")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100")
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400")
  const electricBlue = "#007bff"
  const gold = "#FFD700"
  const formCardBg = useColorModeValue("blue.50", "whiteAlpha.100")
  const formGreenBg = useColorModeValue("green.50", "whiteAlpha.100")
  const formYellowBg = useColorModeValue("yellow.50", "whiteAlpha.100")
  const formRedBg = useColorModeValue("red.50", "whiteAlpha.100")

  // Filter patents based on status
  const filteredPatents = filterStatus === "all" ? patents : patents.filter((patent) => patent.status === filterStatus)

  const handlePatentSelect = (patent) => {
    setSelectedPatent(patent)
    onOpen()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "green"
      case "pending":
        return "orange"
      case "draft":
        return "blue"
      case "rejected":
        return "red"
      default:
        return "gray"
    }
  }

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      handleNewPatentSubmit()
    }
  }

  const handlePrevStep = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNewPatentSubmit = () => {
    toast({
      title: "Patent Submitted",
      description: "Your innovative concept has been submitted for evaluation and patent preparation.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    onNewPatentClose()
    setActiveStep(0)
  }

  const handleCreateNFF = () => {
    toast({
      title: "NFF Creation Initiated",
      description: "Non-Fungible Fund creation process has started for your patent.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    onClose()
  }

  const renderPatentCard = (patent) => {
    return (
      <Card key={patent.id} bg={cardBg} boxShadow="md" cursor="pointer" onClick={() => handlePatentSelect(patent)}>
        <CardHeader pb={2}>
          <Flex justify="space-between" align="center">
            <Heading size="md" color={textColor}>
              {patent.title}
            </Heading>
            <Badge colorScheme={getStatusColor(patent.status)}>
              {patent.status.charAt(0).toUpperCase() + patent.status.slice(1)}
            </Badge>
          </Flex>
        </CardHeader>

        <CardBody pt={2}>
          <Text noOfLines={2} color={secondaryTextColor} fontSize="sm" mb={3}>
            {patent.description}
          </Text>

          <Box mb={3}>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="sm" fontWeight="medium">
                Progress
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {patent.progress}%
              </Text>
            </Flex>
            <Progress
              value={patent.progress}
              size="sm"
              colorScheme={patent.progress === 100 ? "green" : "blue"}
              borderRadius="full"
              hasStripe={patent.progress < 100}
            />
            <Text fontSize="xs" color={secondaryTextColor} mt={1}>
              Current Stage: {patent.stage}
            </Text>
          </Box>

          {patent.tokenized && (
            <HStack mt={3}>
              <Icon as={FaCubes} color={gold} />
              <Text fontSize="sm" fontWeight="bold" color={gold}>
                NFF Active
              </Text>
            </HStack>
          )}

          {patent.estimatedApproval && !patent.approvalDate && (
            <HStack mt={3} spacing={1}>
              <Icon as={FaClock} color={secondaryTextColor} />
              <Text fontSize="sm" color={secondaryTextColor}>
                Est. Approval: {new Date(patent.estimatedApproval).toLocaleDateString()}
              </Text>
            </HStack>
          )}

          {patent.approvalDate && (
            <HStack mt={3} spacing={1}>
              <Icon as={FaCheckCircle} color="green.500" />
              <Text fontSize="sm" color="green.500">
                Approved: {new Date(patent.approvalDate).toLocaleDateString()}
              </Text>
            </HStack>
          )}
        </CardBody>
      </Card>
    )
  }

  const renderPatentDetails = () => {
    if (!selectedPatent) return null

    return (
      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg" color={textColor}>
            {selectedPatent.title}
          </Heading>
          <Badge colorScheme={getStatusColor(selectedPatent.status)} fontSize="md" px={3} py={1}>
            {selectedPatent.status.charAt(0).toUpperCase() + selectedPatent.status.slice(1)}
          </Badge>
        </Flex>

        <Text mb={5}>{selectedPatent.description}</Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={5}>
          <Card bg={cardBg} variant="outline">
            <CardHeader pb={2}>
              <Heading size="sm" color={textColor}>
                Patent Details
              </Heading>
            </CardHeader>
            <CardBody pt={2}>
              <VStack align="stretch" spacing={2}>
                <Flex justify="space-between">
                  <Text fontWeight="medium">Inventors:</Text>
                  <Text>{selectedPatent.inventors.join(", ")}</Text>
                </Flex>

                {selectedPatent.patentOffice && (
                  <Flex justify="space-between">
                    <Text fontWeight="medium">Patent Office:</Text>
                    <Text>{selectedPatent.patentOffice}</Text>
                  </Flex>
                )}

                {selectedPatent.applicationNumber && (
                  <Flex justify="space-between">
                    <Text fontWeight="medium">Application #:</Text>
                    <Text>{selectedPatent.applicationNumber}</Text>
                  </Flex>
                )}

                {selectedPatent.submissionDate && (
                  <Flex justify="space-between">
                    <Text fontWeight="medium">Submission Date:</Text>
                    <Text>{new Date(selectedPatent.submissionDate).toLocaleDateString()}</Text>
                  </Flex>
                )}

                {selectedPatent.approvalDate && (
                  <Flex justify="space-between">
                    <Text fontWeight="medium">Approval Date:</Text>
                    <Text>{new Date(selectedPatent.approvalDate).toLocaleDateString()}</Text>
                  </Flex>
                )}
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg} variant="outline">
            <CardHeader pb={2}>
              <Heading size="sm" color={textColor}>
                Valuation & Progress
              </Heading>
            </CardHeader>
            <CardBody pt={2}>
              <VStack align="stretch" spacing={2}>
                <Flex justify="space-between">
                  <Text fontWeight="medium">Estimated Value:</Text>
                  <Text>{selectedPatent.valuationEstimate}</Text>
                </Flex>

                <Flex justify="space-between">
                  <Text fontWeight="medium">Current Stage:</Text>
                  <Text>{selectedPatent.stage}</Text>
                </Flex>

                <Box>
                  <Flex justify="space-between" mb={1}>
                    <Text fontWeight="medium">Progress:</Text>
                    <Text>{selectedPatent.progress}%</Text>
                  </Flex>
                  <Progress
                    value={selectedPatent.progress}
                    size="sm"
                    colorScheme={selectedPatent.progress === 100 ? "green" : "blue"}
                  />
                </Box>

                {selectedPatent.estimatedApproval && !selectedPatent.approvalDate && (
                  <Flex justify="space-between">
                    <Text fontWeight="medium">Est. Approval:</Text>
                    <Text>{new Date(selectedPatent.estimatedApproval).toLocaleDateString()}</Text>
                  </Flex>
                )}
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {selectedPatent.tokenized ? (
          <Card bg={cardBg} borderWidth="1px" borderColor={gold} boxShadow="md" mb={5}>
            <CardHeader pb={2} bg={useColorModeValue("yellow.50", "whiteAlpha.100")}>
              <Flex align="center">
                <Icon as={FaCubes} color={gold} mr={2} />
                <Heading size="md" color={textColor}>
                  Non-Fungible Fund (NFF) Details
                </Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box>
                  <VStack align="stretch" spacing={3}>
                    <Flex justify="space-between">
                      <Text fontWeight="medium">Total Tokens:</Text>
                      <Text>{selectedPatent.nffDetails.totalTokens.toLocaleString()}</Text>
                    </Flex>

                    <Flex justify="space-between">
                      <Text fontWeight="medium">Current Price:</Text>
                      <Text>{selectedPatent.nffDetails.currentPrice}</Text>
                    </Flex>

                    <Flex justify="space-between">
                      <Text fontWeight="medium">Peak Price:</Text>
                      <Text>{selectedPatent.nffDetails.peakPrice}</Text>
                    </Flex>

                    <Flex justify="space-between">
                      <Text fontWeight="medium">Investors:</Text>
                      <Text>{selectedPatent.nffDetails.investors}</Text>
                    </Flex>
                  </VStack>
                </Box>

                <Box borderLeft={{ base: "none", md: "1px solid" }} borderColor={borderColor} pl={{ base: 0, md: 4 }}>
                  <Heading size="sm" mb={3}>
                    Token Performance
                  </Heading>
                  {/* Placeholder for chart */}
                  <Box h="120px" border="1px" borderColor={borderColor} borderRadius="md" mb={3} p={2}>
                    <Text textAlign="center" color={secondaryTextColor}>
                      Performance chart would appear here
                    </Text>
                  </Box>

                  <HStack spacing={4} justify="center">
                    <Button colorScheme="blue" size="sm">
                      Buy Tokens
                    </Button>
                    <Button variant="outline" colorScheme="blue" size="sm">
                      View Marketplace
                    </Button>
                  </HStack>
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>
        ) : selectedPatent.status === "approved" ? (
          <Card bg={cardBg} mb={5}>
            <CardBody>
              <Flex direction="column" align="center" textAlign="center">
                <Icon as={FaCubes} color={electricBlue} boxSize={10} mb={3} />
                <Heading size="md" mb={2}>
                  Ready for Tokenization
                </Heading>
                <Text color={secondaryTextColor} mb={4}>
                  This patent has been approved and is eligible for NFF (Non-Fungible Fund) creation.
                </Text>
                <Button colorScheme="blue" leftIcon={<FaMoneyBillWave />} onClick={handleCreateNFF}>
                  Create Non-Fungible Fund
                </Button>
              </Flex>
            </CardBody>
          </Card>
        ) : (
          <Card bg={cardBg} mb={5}>
            <CardBody>
              <Flex direction="column" align="center" textAlign="center">
                <Icon as={FaClock} color={secondaryTextColor} boxSize={10} mb={3} />
                <Heading size="md" mb={2}>
                  Pending Patent Approval
                </Heading>
                <Text color={secondaryTextColor} mb={4}>
                  Tokenization will be available once the patent is approved.
                </Text>
                <Button disabled variant="outline">
                  Awaiting Approval
                </Button>
              </Flex>
            </CardBody>
          </Card>
        )}

        <Divider mb={5} />

        <Accordion allowToggle>
          <AccordionItem border="none">
            <h2>
              <AccordionButton px={0}>
                <Box flex="1" textAlign="left">
                  <Heading size="md">Patent Journey Timeline</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="stretch" spacing={3}>
                <HStack>
                  <Icon as={FaRegLightbulb} color="green.500" />
                  <Text fontWeight="medium">Idea Submission</Text>
                  <Spacer />
                  <Text>Feb 10, 2023</Text>
                </HStack>

                <HStack>
                  <Icon as={FaSearch} color="green.500" />
                  <Text fontWeight="medium">Prior Art Search Completed</Text>
                  <Spacer />
                  <Text>Feb 20, 2023</Text>
                </HStack>

                <HStack>
                  <Icon as={FaFileAlt} color="green.500" />
                  <Text fontWeight="medium">Technical Documentation</Text>
                  <Spacer />
                  <Text>Mar 5, 2023</Text>
                </HStack>

                <HStack>
                  <Icon
                    as={selectedPatent.status === "pending" ? FaClock : FaCheckCircle}
                    color={selectedPatent.status === "pending" ? "orange.500" : "green.500"}
                  />
                  <Text fontWeight="medium">Legal Review</Text>
                  <Spacer />
                  <Text>{selectedPatent.status === "pending" ? "In Progress" : "Mar 15, 2023"}</Text>
                </HStack>

                {selectedPatent.status !== "draft" && selectedPatent.status !== "pending" && (
                  <>
                    <HStack>
                      <Icon as={FaRocket} color="green.500" />
                      <Text fontWeight="medium">Patent Submission</Text>
                      <Spacer />
                      <Text>
                        {selectedPatent.submissionDate
                          ? new Date(selectedPatent.submissionDate).toLocaleDateString()
                          : "Pending"}
                      </Text>
                    </HStack>

                    <HStack>
                      <Icon
                        as={selectedPatent.status === "approved" ? FaCheckCircle : FaClock}
                        color={selectedPatent.status === "approved" ? "green.500" : "orange.500"}
                      />
                      <Text fontWeight="medium">Patent Approval</Text>
                      <Spacer />
                      <Text>
                        {selectedPatent.approvalDate
                          ? new Date(selectedPatent.approvalDate).toLocaleDateString()
                          : "Est. " +
                            (selectedPatent.estimatedApproval
                              ? new Date(selectedPatent.estimatedApproval).toLocaleDateString()
                              : "TBD")}
                      </Text>
                    </HStack>

                    {selectedPatent.tokenized && (
                      <HStack>
                        <Icon as={FaCubes} color="green.500" />
                        <Text fontWeight="medium">NFF Creation</Text>
                        <Spacer />
                        <Text>May 5, 2023</Text>
                      </HStack>
                    )}
                  </>
                )}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    )
  }

  const renderNewPatentForm = () => {
    return (
      <Box>
        <Stepper index={activeStep} mb={6} size="sm" colorScheme="blue">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Innovation Title</FormLabel>
              <Input placeholder="Provide a clear, descriptive title for your innovation" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Describe your innovation in detail. What problem does it solve? How does it work?"
                rows={6}
              />
              <FormHelperText>
                Be specific and thorough. The system will analyze your description to identify patentable elements.
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select the most relevant category">
                <option value="fintech">Financial Technology</option>
                <option value="blockchain">Blockchain/Cryptocurrency</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="data">Data Science/Analytics</option>
                <option value="security">Security/Privacy</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
          </VStack>
        )}

        {activeStep === 1 && (
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Target Market</FormLabel>
              <Select placeholder="Select primary market">
                <option value="consumer">Consumer</option>
                <option value="business">Business</option>
                <option value="enterprise">Enterprise</option>
                <option value="government">Government</option>
                <option value="mixed">Multiple Markets</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Market Size & Opportunity</FormLabel>
              <Textarea placeholder="Describe the market size and opportunity for your innovation" rows={4} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Competitive Landscape</FormLabel>
              <Textarea
                placeholder="Identify existing solutions and explain how your innovation is different or better"
                rows={4}
              />
            </FormControl>
          </VStack>
        )}

        {activeStep === 2 && (
          <VStack spacing={4} align="stretch">
            <Text>
              Our AI-powered system will conduct a comprehensive prior art search to identify any existing patents that
              might be similar to your innovation.
            </Text>

            <Card bg={formCardBg} variant="outline" mb={4}>
              <CardBody>
                <HStack spacing={3} align="flex-start">
                  <Icon as={FaInfoCircle} color={electricBlue} mt={1} />
                  <Text fontSize="sm">
                    The prior art search helps determine if your innovation is novel and non-obvious—two key
                    requirements for patentability. Our system has a 98% accuracy rate in identifying relevant existing
                    patents.
                  </Text>
                </HStack>
              </CardBody>
            </Card>

            <FormControl>
              <FormLabel>Known Similar Patents or Products</FormLabel>
              <Textarea
                placeholder="List any patents, products, or publications you're aware of that might be similar to your innovation"
                rows={4}
              />
              <FormHelperText>
                This helps our system narrow down the search and identify potential conflicts.
              </FormHelperText>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">I authorize the system to conduct a prior art search</FormLabel>
              <Switch colorScheme="blue" defaultChecked />
            </FormControl>
          </VStack>
        )}

        {activeStep === 3 && (
          <VStack spacing={4} align="stretch">
            <Text mb={2}>
              Provide technical details about your innovation. This information will be used to draft the patent claims
              and specifications.
            </Text>

            <FormControl isRequired>
              <FormLabel>Key Components</FormLabel>
              <Textarea placeholder="List and describe the key components or elements of your innovation" rows={4} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Functional Process</FormLabel>
              <Textarea
                placeholder="Describe how your innovation works. What steps or processes are involved?"
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Upload Diagrams or Illustrations (Optional)</FormLabel>
              <Button leftIcon={<FaCloudUploadAlt />} variant="outline" width="full">
                Upload Files
              </Button>
              <FormHelperText>
                Visual representations can strengthen your patent application. Accepted formats: PNG, JPG, PDF.
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Potential Applications</FormLabel>
              <Textarea placeholder="Describe potential applications or use cases for your innovation" rows={3} />
            </FormControl>
          </VStack>
        )}

        {activeStep === 4 && (
          <VStack spacing={4} align="stretch">
            <Text mb={2}>
              Our legal experts will review your innovation to ensure it meets patentability requirements and optimize
              the claims for maximum protection.
            </Text>

            <Card bg={formGreenBg} variant="outline" mb={4}>
              <CardBody>
                <HStack spacing={3} align="flex-start">
                  <Icon as={FaCheckCircle} color="green.500" mt={1} />
                  <Text fontSize="sm">
                    Our AI-assisted legal review process has achieved a 98% first-time approval rate with patent offices
                    worldwide.
                  </Text>
                </HStack>
              </CardBody>
            </Card>

            <FormControl>
              <FormLabel>Preferred Patent Attorney (Optional)</FormLabel>
              <Input placeholder="Enter name if you have a preferred patent attorney" />
              <FormHelperText>
                If left blank, our system will assign an expert in your innovation's field.
              </FormHelperText>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">I request expedited legal review (additional fees apply)</FormLabel>
              <Switch colorScheme="blue" />
            </FormControl>
          </VStack>
        )}

        {activeStep === 5 && (
          <VStack spacing={4} align="stretch">
            <Text mb={2}>
              Once your patent application is prepared, it will be submitted to the appropriate patent office.
            </Text>

            <FormControl isRequired>
              <FormLabel>Target Patent Offices</FormLabel>
              <Select placeholder="Select primary patent office">
                <option value="uspto">US Patent and Trademark Office (USPTO)</option>
                <option value="epo">European Patent Office (EPO)</option>
                <option value="china">China National Intellectual Property Administration (CNIPA)</option>
                <option value="japan">Japan Patent Office (JPO)</option>
                <option value="korea">Korean Intellectual Property Office (KIPO)</option>
                <option value="global">PCT (Global Protection)</option>
              </Select>
              <FormHelperText>You can add additional jurisdictions later in the process.</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Submission Timeline</FormLabel>
              <Select defaultValue="standard">
                <option value="standard">Standard Processing (2-3 weeks)</option>
                <option value="expedited">Expedited Processing (5-7 days, additional fees)</option>
                <option value="urgent">Urgent Processing (24-48 hours, premium fees)</option>
              </Select>
            </FormControl>

            <Card borderWidth="1px" borderColor="red.200" bg={formRedBg} mb={4}>
              <CardBody>
                <HStack spacing={3} align="flex-start">
                  <Icon as={FaExclamationTriangle} color="red.500" mt={1} />
                  <Text fontSize="sm">
                    Once submitted, your innovation will be protected under provisional patent rights, but public
                    disclosure should still be avoided until full approval.
                  </Text>
                </HStack>
              </CardBody>
            </Card>
          </VStack>
        )}

        {activeStep === 6 && (
          <VStack spacing={4} align="stretch">
            <Text mb={2}>Plan the tokenization of your innovation through our Non-Fungible Fund (NFF) system.</Text>

            <Card bg={formYellowBg} borderWidth="1px" borderColor={gold} mb={4}>
              <CardBody>
                <HStack spacing={3} align="flex-start">
                  <Icon as={FaCubes} color={gold} mt={1} />
                  <VStack align="stretch" spacing={1}>
                    <Text fontWeight="medium">What is a Non-Fungible Fund (NFF)?</Text>
                    <Text fontSize="sm">
                      An NFF is an asset-backed token fund that represents ownership in your patented innovation. Unlike
                      traditional NFTs, an NFF can continuously expand as the value of the underlying asset grows.
                    </Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>

            <FormControl isRequired>
              <FormLabel>Initial Token Supply</FormLabel>
              <Select defaultValue="auto">
                <option value="auto">Automatic (Based on Valuation)</option>
                <option value="1000">1,000 Tokens</option>
                <option value="5000">5,000 Tokens</option>
                <option value="10000">10,000 Tokens</option>
                <option value="custom">Custom Amount</option>
              </Select>
              <FormHelperText>
                The system will automatically calculate the optimal token supply based on the estimated valuation of
                your patent.
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Token Price Model</FormLabel>
              <Select defaultValue="gold">
                <option value="gold">Gold Standard (Recommended)</option>
                <option value="market">Market Determined</option>
                <option value="fixed">Fixed Value</option>
              </Select>
              <FormHelperText>
                The Gold Standard model pegs the initial token value to a fraction of the gold price, providing
                stability while allowing for market growth.
              </FormHelperText>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Enable automatic token expansion based on valuation growth</FormLabel>
              <Switch colorScheme="blue" defaultChecked />
            </FormControl>
          </VStack>
        )}
      </Box>
    )
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={5}>
        <Heading size="lg" color={textColor}>
          Innovation Patent & NFF System
        </Heading>
        <Button leftIcon={<FaRegLightbulb />} colorScheme="blue" onClick={onNewPatentOpen}>
          Submit New Innovation
        </Button>
      </Flex>

      <Tabs variant="enclosed" onChange={setActiveTab} colorScheme="blue" mb={5}>
        <TabList>
          <Tab _selected={{ color: electricBlue, borderColor: electricBlue, borderBottomColor: "transparent" }}>
            My Innovations
          </Tab>
          <Tab _selected={{ color: electricBlue, borderColor: electricBlue, borderBottomColor: "transparent" }}>
            NFF Portfolio
          </Tab>
          <Tab _selected={{ color: electricBlue, borderColor: electricBlue, borderBottomColor: "transparent" }}>
            Market
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <Flex mb={4} align="center" justify="space-between">
              <Text fontWeight="medium">Filter by status:</Text>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                width="200px"
                size="sm"
                borderColor={borderColor}
              >
                <option value="all">All Innovations</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Select>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
              {filteredPatents.map(renderPatentCard)}
            </SimpleGrid>
          </TabPanel>

          <TabPanel px={0}>
            {patents.some((p) => p.tokenized) ? (
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                <Card bg={cardBg}>
                  <CardHeader>
                    <Heading size="md">My NFF Holdings</Heading>
                  </CardHeader>
                  <CardBody>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Innovation</Th>
                          <Th isNumeric>Tokens</Th>
                          <Th isNumeric>Value</Th>
                          <Th isNumeric>Change</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Non-Fungible Fund Protocol</Td>
                          <Td isNumeric>2,400</Td>
                          <Td isNumeric>$2,460,000</Td>
                          <Td isNumeric color="green.500">
                            +5.2%
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Total</Td>
                          <Td isNumeric>2,400</Td>
                          <Td isNumeric>$2,460,000</Td>
                          <Td isNumeric color="green.500">
                            +5.2%
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </CardBody>
                </Card>

                <Card bg={cardBg}>
                  <CardHeader>
                    <Heading size="md">Performance History</Heading>
                  </CardHeader>
                  <CardBody>
                    {/* Placeholder for chart */}
                    <Box h="200px" border="1px" borderColor={borderColor} borderRadius="md" p={4}>
                      <Text textAlign="center" color={secondaryTextColor}>
                        Performance chart would appear here
                      </Text>
                    </Box>
                  </CardBody>
                </Card>
              </SimpleGrid>
            ) : (
              <Card bg={cardBg}>
                <CardBody textAlign="center" py={10}>
                  <Icon as={FaCubes} boxSize={10} color={secondaryTextColor} mb={3} />
                  <Heading size="md" mb={2}>
                    No NFF Holdings Yet
                  </Heading>
                  <Text color={secondaryTextColor} maxW="500px" mx="auto">
                    Once your patents are approved, you can create Non-Fungible Funds to tokenize and monetize your
                    innovations.
                  </Text>
                  <Button mt={5} colorScheme="blue" onClick={onNewPatentOpen}>
                    Submit an Innovation
                  </Button>
                </CardBody>
              </Card>
            )}
          </TabPanel>

          <TabPanel px={0}>
            <Card bg={cardBg}>
              <CardBody textAlign="center" py={10}>
                <Icon as={FaChartLine} boxSize={10} color={secondaryTextColor} mb={3} />
                <Heading size="md" mb={2}>
                  NFF Marketplace Coming Soon
                </Heading>
                <Text color={secondaryTextColor} maxW="500px" mx="auto">
                  Our marketplace for trading Non-Fungible Fund tokens is under development. Soon you'll be able to buy
                  and sell innovation tokens here.
                </Text>
                <Button mt={5} colorScheme="blue" isDisabled>
                  Join Waitlist
                </Button>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Patent Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Innovation Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderPatentDetails()}</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* New Patent Modal */}
      <Modal isOpen={isNewPatentOpen} onClose={onNewPatentClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit New Innovation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderNewPatentForm()}</ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} isDisabled={activeStep === 0} onClick={handlePrevStep}>
              Previous
            </Button>
            <Button colorScheme="blue" onClick={handleNextStep}>
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

const Spacer = () => <Box flex="1" />

export default PatentNFFSystem
