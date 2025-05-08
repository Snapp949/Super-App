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
  Stack,
  SimpleGrid,
  Progress,
  Badge,
  Avatar,
  AvatarGroup,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
  Divider,
  HStack,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Switch,
  useDisclosure,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import {
  FaRegLightbulb,
  FaGraduationCap,
  FaCar,
  FaHome,
  FaLaptop,
  FaBriefcase,
  FaUsers,
  FaHeart,
  FaHandHoldingUsd,
  FaShareAlt,
} from "react-icons/fa"

// Mock data for goals
const mockGoals = [
  {
    id: 1,
    title: "Computer Science Degree",
    category: "education",
    amount: 30000,
    raised: 21500,
    description:
      "Funding needed to complete my Bachelor's degree in Computer Science with a focus on AI and machine learning.",
    timeline: "2 years",
    supporters: [
      { id: 1, name: "Michael S.", avatar: "https://i.pravatar.cc/150?img=11" },
      { id: 2, name: "Sarah L.", avatar: "https://i.pravatar.cc/150?img=5" },
      { id: 3, name: "James W.", avatar: "https://i.pravatar.cc/150?img=12" },
      { id: 4, name: "Tina K.", avatar: "https://i.pravatar.cc/150?img=9" },
      { id: 5, name: "Robert P.", avatar: "https://i.pravatar.cc/150?img=3" },
    ],
    updates: [
      { date: "2023-03-15", message: "Completed my first semester with a 3.8 GPA!" },
      { date: "2023-01-10", message: "Enrolled in Spring 2023 classes. Thank you all for your support!" },
    ],
  },
  {
    id: 2,
    title: "Reliable Transportation",
    category: "transportation",
    amount: 8000,
    raised: 6200,
    description:
      "Need assistance purchasing a reliable used car to commute to work and school, replacing my 20-year-old vehicle.",
    timeline: "3 months",
    supporters: [
      { id: 1, name: "Michael S.", avatar: "https://i.pravatar.cc/150?img=11" },
      { id: 2, name: "Sarah L.", avatar: "https://i.pravatar.cc/150?img=5" },
      { id: 3, name: "James W.", avatar: "https://i.pravatar.cc/150?img=12" },
    ],
    updates: [
      { date: "2023-04-02", message: "Test drove several vehicles this weekend, getting closer to a decision!" },
    ],
  },
  {
    id: 3,
    title: "Coding Bootcamp",
    category: "education",
    amount: 12000,
    raised: 3000,
    description: "Intensive 12-week coding bootcamp to transition into a career in web development.",
    timeline: "4 months",
    supporters: [
      { id: 4, name: "Tina K.", avatar: "https://i.pravatar.cc/150?img=9" },
      { id: 5, name: "Robert P.", avatar: "https://i.pravatar.cc/150?img=3" },
    ],
    updates: [{ date: "2023-05-10", message: "Accepted into the program! Starting in June." }],
  },
]

// Sample invitations
const mockInvitations = [
  { id: 1, from: "Lisa Chen", goal: "MBA Program", amount: 35000, raised: 12000, relationship: "Cousin" },
  {
    id: 2,
    from: "Marcus Johnson",
    goal: "First Home Down Payment",
    amount: 50000,
    raised: 28000,
    relationship: "Friend",
  },
]

const categoryIcons = {
  education: FaGraduationCap,
  transportation: FaCar,
  housing: FaHome,
  technology: FaLaptop,
  career: FaBriefcase,
  other: FaRegLightbulb,
}

const SupportCollective = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedGoal, setSelectedGoal] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isNewGoalOpen, onOpen: onNewGoalOpen, onClose: onNewGoalClose } = useDisclosure()
  const toast = useToast()

  // Colors
  const cardBg = useColorModeValue("white", "navy.700")
  const textColor = useColorModeValue("gray.700", "white")
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const electricBlue = "#007bff"
  const gold = "#FFD700"

  const handleSupport = () => {
    toast({
      title: "Support Confirmed",
      description: `You've successfully supported ${selectedGoal.title}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    onClose()
  }

  const handleCreateGoal = () => {
    toast({
      title: "Goal Created",
      description: "Your new goal has been created and shared with your support network.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    onNewGoalClose()
  }

  const filteredGoals =
    filterCategory === "all" ? mockGoals : mockGoals.filter((goal) => goal.category === filterCategory)

  const getCategoryIcon = (category) => {
    return categoryIcons[category] || FaRegLightbulb
  }

  const openSupportModal = (goal) => {
    setSelectedGoal(goal)
    onOpen()
  }

  const renderGoalCard = (goal) => {
    const progress = (goal.raised / goal.amount) * 100
    const IconComponent = getCategoryIcon(goal.category)

    return (
      <Card key={goal.id} bg={cardBg} boxShadow="md" overflow="hidden">
        <CardHeader pb={2}>
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <Icon as={IconComponent} boxSize={5} color={electricBlue} mr={2} />
              <Heading size="md" color={textColor}>
                {goal.title}
              </Heading>
            </Flex>
            <Badge
              colorScheme={
                goal.category === "education" ? "blue" : goal.category === "transportation" ? "green" : "purple"
              }
              textTransform="capitalize"
            >
              {goal.category}
            </Badge>
          </Flex>
        </CardHeader>

        <CardBody pt={2}>
          <Text color={secondaryTextColor} fontSize="sm" mb={3}>
            {goal.description}
          </Text>

          <Box mb={4}>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="sm" fontWeight="medium">
                ${goal.raised.toLocaleString()} raised
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                ${goal.amount.toLocaleString()} goal
              </Text>
            </Flex>
            <Progress
              value={progress}
              size="sm"
              colorScheme="blue"
              borderRadius="full"
              hasStripe={progress < 100}
              isAnimated={progress < 100}
            />
            <Text fontSize="xs" color={secondaryTextColor} mt={1}>
              Timeline: {goal.timeline}
            </Text>
          </Box>

          <Flex justify="space-between" align="center">
            <AvatarGroup size="sm" max={3}>
              {goal.supporters.map((supporter) => (
                <Avatar key={supporter.id} name={supporter.name} src={supporter.avatar} borderColor={cardBg} />
              ))}
            </AvatarGroup>
            <Text fontSize="sm" color={secondaryTextColor}>
              {goal.supporters.length} supporter{goal.supporters.length !== 1 ? "s" : ""}
            </Text>
          </Flex>

          <Divider my={3} />

          <Flex justify="space-between">
            <Button leftIcon={<FaHandHoldingUsd />} colorScheme="blue" size="sm" onClick={() => openSupportModal(goal)}>
              Support
            </Button>
            <Button leftIcon={<FaShareAlt />} variant="outline" colorScheme="blue" size="sm">
              Share
            </Button>
          </Flex>
        </CardBody>
      </Card>
    )
  }

  const renderInvitationCard = (invitation) => {
    const progress = (invitation.raised / invitation.amount) * 100

    return (
      <Card key={invitation.id} bg={cardBg} boxShadow="md" borderLeft="4px" borderLeftColor={electricBlue}>
        <CardBody>
          <Flex direction="column">
            <Flex justify="space-between" align="center" mb={2}>
              <Heading size="sm" color={textColor}>
                From: {invitation.from}
              </Heading>
              <Badge colorScheme="purple">{invitation.relationship}</Badge>
            </Flex>

            <Text fontWeight="medium" mb={2}>
              "{invitation.goal}"
            </Text>

            <Box mb={3}>
              <Flex justify="space-between" mb={1}>
                <Text fontSize="sm">${invitation.raised.toLocaleString()} raised</Text>
                <Text fontSize="sm">${invitation.amount.toLocaleString()} goal</Text>
              </Flex>
              <Progress value={progress} size="sm" colorScheme="blue" />
            </Box>

            <Flex justify="space-between">
              <Button colorScheme="blue" size="sm">
                View Details
              </Button>
              <HStack>
                <Button variant="outline" colorScheme="green" size="sm">
                  Accept
                </Button>
                <Button variant="outline" colorScheme="red" size="sm">
                  Decline
                </Button>
              </HStack>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    )
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={5}>
        <Heading size="lg" color={textColor}>
          Support Collective
        </Heading>
        <Button leftIcon={<FaRegLightbulb />} colorScheme="blue" onClick={onNewGoalOpen}>
          Create New Goal
        </Button>
      </Flex>

      <Tabs variant="enclosed" onChange={setActiveTab} colorScheme="blue" mb={5}>
        <TabList>
          <Tab _selected={{ color: electricBlue, borderColor: electricBlue, borderBottomColor: "transparent" }}>
            My Goals
          </Tab>
          <Tab _selected={{ color: electricBlue, borderColor: electricBlue, borderBottomColor: "transparent" }}>
            Invitations
            {mockInvitations.length > 0 && (
              <Badge ml={2} colorScheme="red" borderRadius="full">
                {mockInvitations.length}
              </Badge>
            )}
          </Tab>
          <Tab _selected={{ color: electricBlue, borderColor: electricBlue, borderBottomColor: "transparent" }}>
            Supporting
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <Flex mb={4} align="center" justify="space-between">
              <Text fontWeight="medium">Filter by category:</Text>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                width="200px"
                size="sm"
                borderColor={borderColor}
              >
                <option value="all">All Categories</option>
                <option value="education">Education</option>
                <option value="transportation">Transportation</option>
                <option value="housing">Housing</option>
                <option value="technology">Technology</option>
                <option value="career">Career</option>
                <option value="other">Other</option>
              </Select>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
              {filteredGoals.map(renderGoalCard)}
            </SimpleGrid>
          </TabPanel>

          <TabPanel px={0}>
            {mockInvitations.length > 0 ? (
              <Stack spacing={4}>{mockInvitations.map(renderInvitationCard)}</Stack>
            ) : (
              <Card bg={cardBg}>
                <CardBody textAlign="center" py={10}>
                  <Icon as={FaUsers} boxSize={10} color={secondaryTextColor} mb={3} />
                  <Heading size="md" mb={2}>
                    No Pending Invitations
                  </Heading>
                  <Text color={secondaryTextColor}>
                    When someone invites you to support their goal, you'll see it here.
                  </Text>
                </CardBody>
              </Card>
            )}
          </TabPanel>

          <TabPanel px={0}>
            <Card bg={cardBg}>
              <CardBody textAlign="center" py={10}>
                <Icon as={FaHeart} boxSize={10} color={secondaryTextColor} mb={3} />
                <Heading size="md" mb={2}>
                  Start Supporting Others
                </Heading>
                <Text color={secondaryTextColor} maxW="500px" mx="auto">
                  You're not supporting any goals yet. Invite friends to join the platform or discover goals to support.
                </Text>
                <Button mt={5} colorScheme="blue">
                  Discover Goals
                </Button>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Support Modal */}
      {selectedGoal && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Support {selectedGoal.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={4}>{selectedGoal.description}</Text>

              <Progress value={(selectedGoal.raised / selectedGoal.amount) * 100} size="sm" colorScheme="blue" mb={4} />

              <Text mb={4}>
                ${selectedGoal.raised.toLocaleString()} raised of ${selectedGoal.amount.toLocaleString()} goal
              </Text>

              <FormControl mb={4}>
                <FormLabel>Contribution Amount</FormLabel>
                <NumberInput defaultValue={100} min={10} max={10000}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl display="flex" alignItems="center" mb={4}>
                <FormLabel mb="0">Make this contribution anonymously</FormLabel>
                <Switch colorScheme="blue" />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Send encouragement message</FormLabel>
                <Switch colorScheme="blue" defaultChecked />
              </FormControl>

              <Input placeholder="Write a message of encouragement..." mt={2} mb={4} />
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleSupport}>
                Confirm Support
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Create New Goal Modal */}
      <Modal isOpen={isNewGoalOpen} onClose={onNewGoalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Goal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Goal Title</FormLabel>
                <Input placeholder="e.g., Master's Degree, New Car, etc." />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select placeholder="Select category">
                  <option value="education">Education</option>
                  <option value="transportation">Transportation</option>
                  <option value="housing">Housing</option>
                  <option value="technology">Technology</option>
                  <option value="career">Career</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Goal Amount</FormLabel>
                <NumberInput min={100}>
                  <NumberInputField placeholder="Amount needed to achieve your goal" />
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input placeholder="Describe why this goal is important to you" size="lg" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Timeline</FormLabel>
                <Select placeholder="Select timeline">
                  <option value="1month">1 month</option>
                  <option value="3months">3 months</option>
                  <option value="6months">6 months</option>
                  <option value="1year">1 year</option>
                  <option value="2years">2 years</option>
                  <option value="custom">Custom</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Invite Supporters</FormLabel>
                <Input placeholder="Enter email addresses, separated by commas" />
                <Text fontSize="sm" color={secondaryTextColor} mt={1}>
                  Your supporters will receive an email invitation to contribute to your goal.
                </Text>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Make this goal public</FormLabel>
                <Switch colorScheme="blue" defaultChecked />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onNewGoalClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCreateGoal}>
              Create Goal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default SupportCollective
