"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Select,
  Card,
  CardHeader,
  CardBody,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react"
import { FaChartLine, FaChartBar, FaUsers, FaLightbulb } from "react-icons/fa"

// Mock data for analytics
const mockAnalyticsData = {
  creditScore: {
    current: 780,
    previous: 765,
    change: 15,
    history: [720, 735, 742, 750, 765, 780],
    factors: [
      { name: "Education", score: 85, change: 5 },
      { name: "Support Network", score: 90, change: 10 },
      { name: "Location Stability", score: 75, change: 0 },
      { name: "Career Trajectory", score: 88, change: 3 },
      { name: "Financial Hardship Context", score: 70, change: -2 },
    ],
  },
  supportCollective: {
    totalRaised: 27700,
    previousRaised: 25000,
    change: 2700,
    activeGoals: 3,
    supporters: 12,
    contributions: [
      { date: "2023-05-15", amount: 250, goal: "College Tuition Fund", contributor: "Michael S." },
      { date: "2023-05-10", amount: 500, goal: "College Tuition Fund", contributor: "Sarah L." },
      { date: "2023-05-05", amount: 1000, goal: "Reliable Transportation", contributor: "James W." },
      { date: "2023-04-28", amount: 300, goal: "Coding Bootcamp", contributor: "Tina K." },
      { date: "2023-04-20", amount: 650, goal: "Reliable Transportation", contributor: "Robert P." },
    ],
  },
  patents: {
    totalValue: 2460000,
    previousValue: 2340000,
    change: 120000,
    patentCount: 3,
    tokenizedCount: 1,
    transactions: [
      { date: "2023-05-14", type: "Purchase", tokens: 50, value: 51250, patent: "Non-Fungible Fund Protocol" },
      { date: "2023-05-10", type: "Sale", tokens: 25, value: 25500, patent: "Non-Fungible Fund Protocol" },
      { date: "2023-05-05", type: "Purchase", tokens: 100, value: 102000, patent: "Non-Fungible Fund Protocol" },
      { date: "2023-04-28", type: "Initial", tokens: 2275, value: 2275000, patent: "Non-Fungible Fund Protocol" },
    ],
  },
}

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("30d")
  const [activeTab, setActiveTab] = useState(0)

  // Colors
  const cardBg = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "white")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const electricBlue = "#007bff"
  const blue50 = useColorModeValue("blue.50", "blue.900")
  const green50 = useColorModeValue("green.50", "green.900")
  const purple50 = useColorModeValue("purple.50", "purple.900")

  const renderOverviewPanel = () => (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Performance Overview</Heading>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          width="150px"
          size="sm"
          borderColor={borderColor}
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
          <option value="all">All time</option>
        </Select>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={6}>
        <Card bg={cardBg}>
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel fontSize="sm" color="gray.500" fontWeight="bold" pb=".1rem">
                  Holistic Credit Score
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    {mockAnalyticsData.creditScore.current}
                  </StatNumber>
                  <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    ps="3px"
                    color="green.400"
                    fontWeight="bold"
                    fontSize="md"
                  >
                    <StatArrow type="increase" />
                    {((mockAnalyticsData.creditScore.change / mockAnalyticsData.creditScore.previous) * 100).toFixed(1)}
                    %
                  </StatHelpText>
                </Flex>
              </Stat>
              <Box alignContent="center" justifyContent="center" borderRadius="50%" bg={blue50} h={"45px"} w={"45px"}>
                <Icon as={FaChartLine} color="blue.500" h={"24px"} w={"24px"} mt={"10px"} />
              </Box>
            </Flex>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel fontSize="sm" color="gray.500" fontWeight="bold" pb=".1rem">
                  Support Collective
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    ${mockAnalyticsData.supportCollective.totalRaised.toLocaleString()}
                  </StatNumber>
                  <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    ps="3px"
                    color="green.400"
                    fontWeight="bold"
                    fontSize="md"
                  >
                    <StatArrow type="increase" />
                    {(
                      (mockAnalyticsData.supportCollective.change /
                        mockAnalyticsData.supportCollective.previousRaised) *
                      100
                    ).toFixed(1)}
                    %
                  </StatHelpText>
                </Flex>
              </Stat>
              <Box alignContent="center" justifyContent="center" borderRadius="50%" bg={green50} h={"45px"} w={"45px"}>
                <Icon as={FaUsers} color="green.500" h={"24px"} w={"24px"} mt={"10px"} />
              </Box>
            </Flex>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel fontSize="sm" color="gray.500" fontWeight="bold" pb=".1rem">
                  Patent Portfolio
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    ${(mockAnalyticsData.patents.totalValue / 1000000).toFixed(2)}M
                  </StatNumber>
                  <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    ps="3px"
                    color="green.400"
                    fontWeight="bold"
                    fontSize="md"
                  >
                    <StatArrow type="increase" />
                    {((mockAnalyticsData.patents.change / mockAnalyticsData.patents.previousValue) * 100).toFixed(1)}%
                  </StatHelpText>
                </Flex>
              </Stat>
              <Box alignContent="center" justifyContent="center" borderRadius="50%" bg={purple50} h={"45px"} w={"45px"}>
                <Icon as={FaLightbulb} color="purple.500" h={"24px"} w={"24px"} mt={"10px"} />
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
        <Card bg={cardBg}>
          <CardHeader>
            <Heading size="md">Credit Score Factors</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Factor</Th>
                  <Th isNumeric>Score</Th>
                  <Th isNumeric>Change</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockAnalyticsData.creditScore.factors.map((factor) => (
                  <Tr key={factor.name}>
                    <Td>{factor.name}</Td>
                    <Td isNumeric>{factor.score}</Td>
                    <Td isNumeric>
                      <Text color={factor.change > 0 ? "green.500" : factor.change < 0 ? "red.500" : "gray.500"}>
                        {factor.change > 0 ? "+" : ""}
                        {factor.change}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardHeader>
            <Heading size="md">Recent Support Contributions</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Contributor</Th>
                  <Th>Goal</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockAnalyticsData.supportCollective.contributions.map((contribution, index) => (
                  <Tr key={index}>
                    <Td>{new Date(contribution.date).toLocaleDateString()}</Td>
                    <Td>{contribution.contributor}</Td>
                    <Td>{contribution.goal}</Td>
                    <Td isNumeric>${contribution.amount}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  )

  const renderCreditAnalyticsPanel = () => (
    <Box>
      <Heading size="md" mb={4}>
        Credit Score Analytics
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={6}>
        <Card bg={cardBg}>
          <CardHeader>
            <Heading size="sm">Score History</Heading>
          </CardHeader>
          <CardBody>
            {/* Placeholder for chart */}
            <Box h="200px" border="1px" borderColor={borderColor} borderRadius="md" p={4}>
              <Text textAlign="center" color="gray.500">
                Credit score history chart would appear here
              </Text>
            </Box>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardHeader>
            <Heading size="sm">Factor Breakdown</Heading>
          </CardHeader>
          <CardBody>
            {/* Placeholder for chart */}
            <Box h="200px" border="1px" borderColor={borderColor} borderRadius="md" p={4}>
              <Text textAlign="center" color="gray.500">
                Factor breakdown chart would appear here
              </Text>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card bg={cardBg}>
        <CardHeader>
          <Heading size="sm">Improvement Opportunities</Heading>
        </CardHeader>
        <CardBody>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Factor</Th>
                <Th>Current Score</Th>
                <Th>Potential Improvement</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Location Stability</Td>
                <Td>75</Td>
                <Td>+10</Td>
                <Td>
                  <Button size="xs" colorScheme="blue">
                    View Plan
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Financial Hardship Context</Td>
                <Td>70</Td>
                <Td>+15</Td>
                <Td>
                  <Button size="xs" colorScheme="blue">
                    View Plan
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Career Trajectory</Td>
                <Td>88</Td>
                <Td>+5</Td>
                <Td>
                  <Button size="xs" colorScheme="blue">
                    View Plan
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  )

  const renderSupportAnalyticsPanel = () => (
    <Box>
      <Heading size="md" mb={4}>
        Support Collective Analytics
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={6}>
        <Card bg={cardBg}>
          <CardBody>
            <Stat>
              <StatLabel>Total Raised</StatLabel>
              <StatNumber>${mockAnalyticsData.supportCollective.totalRaised.toLocaleString()}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {(
                  (mockAnalyticsData.supportCollective.change / mockAnalyticsData.supportCollective.previousRaised) *
                  100
                ).toFixed(1)}
                % since last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardBody>
            <Stat>
              <StatLabel>Active Goals</StatLabel>
              <StatNumber>{mockAnalyticsData.supportCollective.activeGoals}</StatNumber>
              <StatHelpText>2 goals near completion</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardBody>
            <Stat>
              <StatLabel>Support Network</StatLabel>
              <StatNumber>{mockAnalyticsData.supportCollective.supporters}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />3 new supporters this month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <Card bg={cardBg}>
          <CardHeader>
            <Heading size="sm">Funding Progress by Goal</Heading>
          </CardHeader>
          <CardBody>
            {/* Placeholder for chart */}
            <Box h="200px" border="1px" borderColor={borderColor} borderRadius="md" p={4}>
              <Text textAlign="center" color="gray.500">
                Funding progress chart would appear here
              </Text>
            </Box>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardHeader>
            <Heading size="sm">Contribution Timeline</Heading>
          </CardHeader>
          <CardBody>
            {/* Placeholder for chart */}
            <Box h="200px" border="1px" borderColor={borderColor} borderRadius="md" p={4}>
              <Text textAlign="center" color="gray.500">
                Contribution timeline chart would appear here
              </Text>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  )

  const renderPatentAnalyticsPanel = () => (
    <Box>
      <Heading size="md" mb={4}>
        Patent & NFF Analytics
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={6}>
        <Card bg={cardBg}>
          <CardBody>
            <Stat>
              <StatLabel>Portfolio Value</StatLabel>
              <StatNumber>${(mockAnalyticsData.patents.totalValue / 1000000).toFixed(2)}M</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {((mockAnalyticsData.patents.change / mockAnalyticsData.patents.previousValue) * 100).toFixed(1)}% since
                last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardBody>
            <Stat>
              <StatLabel>Patents</StatLabel>
              <StatNumber>{mockAnalyticsData.patents.patentCount}</StatNumber>
              <StatHelpText>{mockAnalyticsData.patents.tokenizedCount} tokenized as NFF</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardBody>
            <Stat>
              <StatLabel>Token Transactions</StatLabel>
              <StatNumber>{mockAnalyticsData.patents.transactions.length}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />2 new transactions this month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <Card bg={cardBg}>
          <CardHeader>
            <Heading size="sm">NFF Token Value History</Heading>
          </CardHeader>
          <CardBody>
            {/* Placeholder for chart */}
            <Box h="200px" border="1px" borderColor={borderColor} borderRadius="md" p={4}>
              <Text textAlign="center" color="gray.500">
                Token value history chart would appear here
              </Text>
            </Box>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardHeader>
            <Heading size="sm">Recent Token Transactions</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Type</Th>
                  <Th>Patent</Th>
                  <Th isNumeric>Tokens</Th>
                  <Th isNumeric>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockAnalyticsData.patents.transactions.map((transaction, index) => (
                  <Tr key={index}>
                    <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          transaction.type === "Purchase" ? "green" : transaction.type === "Sale" ? "red" : "purple"
                        }
                      >
                        {transaction.type}
                      </Badge>
                    </Td>
                    <Td>{transaction.patent}</Td>
                    <Td isNumeric>{transaction.tokens}</Td>
                    <Td isNumeric>${transaction.value.toLocaleString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  )

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Analytics Dashboard</Heading>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          width="150px"
          size="sm"
          borderColor={borderColor}
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
          <option value="all">All time</option>
        </Select>
      </Flex>

      <Tabs variant="soft-rounded" colorScheme="blue" onChange={(index) => setActiveTab(index)} mb={6}>
        <TabList mb={5}>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaChartBar} mr={2} />
            Overview
          </Tab>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaChartLine} mr={2} />
            Credit Score
          </Tab>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaUsers} mr={2} />
            Support Collective
          </Tab>
          <Tab _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaLightbulb} mr={2} />
            Patents & NFF
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>{renderOverviewPanel()}</TabPanel>
          <TabPanel px={0}>{renderCreditAnalyticsPanel()}</TabPanel>
          <TabPanel px={0}>{renderSupportAnalyticsPanel()}</TabPanel>
          <TabPanel px={0}>{renderPatentAnalyticsPanel()}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default AnalyticsDashboard
