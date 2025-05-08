"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  Badge,
  Icon,
  VStack,
  useColorModeValue,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"
import {
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaUsers,
  FaLightbulb,
  FaChartLine,
  FaUserShield,
} from "react-icons/fa"

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: "credit",
    title: "Credit Score Update",
    message: "Your holistic credit score has increased by 15 points due to improved support network.",
    timestamp: "2023-05-15T10:30:00",
    read: false,
    priority: "medium",
  },
  {
    id: 2,
    type: "support",
    title: "New Support Contribution",
    message: "Sarah Johnson contributed $250 to your Education Fund.",
    timestamp: "2023-05-14T15:45:00",
    read: false,
    priority: "high",
  },
  {
    id: 3,
    type: "patent",
    title: "Patent Status Change",
    message: "Your 'Adaptive Financial Risk Assessment System' patent has moved to Legal Review stage.",
    timestamp: "2023-05-13T09:15:00",
    read: true,
    priority: "high",
  },
  {
    id: 4,
    type: "system",
    title: "Security Alert",
    message: "New device logged into your account. Please verify this was you.",
    timestamp: "2023-05-12T22:10:00",
    read: false,
    priority: "critical",
  },
  {
    id: 5,
    type: "credit",
    title: "Credit Factor Improvement",
    message: "Your education factor has improved due to recent course completion.",
    timestamp: "2023-05-10T14:30:00",
    read: true,
    priority: "medium",
  },
  {
    id: 6,
    type: "support",
    title: "Support Goal Milestone",
    message: "Your 'Reliable Transportation' fund is now 75% funded!",
    timestamp: "2023-05-09T11:20:00",
    read: true,
    priority: "medium",
  },
  {
    id: 7,
    type: "patent",
    title: "NFF Token Activity",
    message: "Your NFF tokens have increased in value by 3.2% in the last 24 hours.",
    timestamp: "2023-05-08T16:45:00",
    read: true,
    priority: "low",
  },
]

const NotificationCenter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  // Colors
  const bgColor = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "white")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const unreadBgColor = useColorModeValue("blue.50", "gray.700")
  const hoverBgColor = useColorModeValue("gray.50", "gray.700")

  useEffect(() => {
    // In a real app, this would fetch notifications from an API
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((notif) => !notif.read).length)
  }, [])

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      read: true,
    }))
    setNotifications(updatedNotifications)
    setUnreadCount(0)
  }

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    setNotifications(updatedNotifications)
    setUnreadCount(updatedNotifications.filter((notif) => !notif.read).length)
  }

  const getNotificationIcon = (type, priority) => {
    switch (type) {
      case "credit":
        return <Icon as={FaChartLine} color="blue.500" boxSize={5} />
      case "support":
        return <Icon as={FaUsers} color="green.500" boxSize={5} />
      case "patent":
        return <Icon as={FaLightbulb} color="purple.500" boxSize={5} />
      case "system":
        return priority === "critical" ? (
          <Icon as={FaExclamationCircle} color="red.500" boxSize={5} />
        ) : (
          <Icon as={FaUserShield} color="orange.500" boxSize={5} />
        )
      default:
        return <Icon as={FaInfoCircle} color="gray.500" boxSize={5} />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "red"
      case "high":
        return "orange"
      case "medium":
        return "blue"
      case "low":
        return "green"
      default:
        return "gray"
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`
    } else {
      return "Just now"
    }
  }

  const filterNotificationsByTab = (notifications) => {
    if (activeTab === 0) return notifications // All notifications
    if (activeTab === 1) return notifications.filter((notif) => !notif.read) // Unread
    if (activeTab === 2) return notifications.filter((notif) => notif.type === "credit") // Credit
    if (activeTab === 3) return notifications.filter((notif) => notif.type === "support") // Support
    if (activeTab === 4) return notifications.filter((notif) => notif.type === "patent") // Patent
    return notifications
  }

  const renderNotificationItem = (notification) => (
    <Box
      key={notification.id}
      p={3}
      borderRadius="md"
      bg={notification.read ? "transparent" : unreadBgColor}
      borderWidth="1px"
      borderColor={borderColor}
      mb={3}
      cursor="pointer"
      _hover={{ bg: hoverBgColor }}
      onClick={() => markAsRead(notification.id)}
    >
      <Flex>
        <Box mr={3}>{getNotificationIcon(notification.type, notification.priority)}</Box>
        <Box flex="1">
          <Flex justify="space-between" align="center" mb={1}>
            <Text fontWeight="bold" fontSize="sm">
              {notification.title}
            </Text>
            <Badge colorScheme={getPriorityColor(notification.priority)} fontSize="xs">
              {notification.priority}
            </Badge>
          </Flex>
          <Text fontSize="sm" mb={2}>
            {notification.message}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {formatTimestamp(notification.timestamp)}
          </Text>
        </Box>
      </Flex>
    </Box>
  )

  return (
    <>
      <Button
        aria-label="Notifications"
        variant="ghost"
        position="relative"
        onClick={onOpen}
        _hover={{ bg: "transparent" }}
      >
        <Icon as={FaBell} boxSize={5} />
        {unreadCount > 0 && (
          <Badge
            position="absolute"
            top="-5px"
            right="-5px"
            colorScheme="red"
            borderRadius="full"
            fontSize="xs"
            minW="18px"
            h="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center" justify="space-between">
              <Text>Notifications</Text>
              {unreadCount > 0 && (
                <Button size="sm" variant="outline" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </Flex>
          </DrawerHeader>

          <DrawerBody p={4}>
            <Tabs variant="soft-rounded" colorScheme="blue" size="sm" onChange={(index) => setActiveTab(index)} mb={4}>
              <TabList>
                <Tab mr={2}>All</Tab>
                <Tab mr={2}>Unread {unreadCount > 0 && <Badge ml={1}>{unreadCount}</Badge>}</Tab>
                <Tab mr={2}>Credit</Tab>
                <Tab mr={2}>Support</Tab>
                <Tab>Patent</Tab>
              </TabList>
            </Tabs>

            <TabPanels>
              <TabPanel p={0}>
                <VStack spacing={0} align="stretch">
                  {filterNotificationsByTab(notifications).length > 0 ? (
                    filterNotificationsByTab(notifications).map(renderNotificationItem)
                  ) : (
                    <Box textAlign="center" py={10}>
                      <Icon as={FaCheckCircle} boxSize={10} color="gray.400" mb={3} />
                      <Text>No notifications to display</Text>
                    </Box>
                  )}
                </VStack>
              </TabPanel>
              <TabPanel p={0}>
                <VStack spacing={0} align="stretch">
                  {filterNotificationsByTab(notifications).length > 0 ? (
                    filterNotificationsByTab(notifications).map(renderNotificationItem)
                  ) : (
                    <Box textAlign="center" py={10}>
                      <Icon as={FaCheckCircle} boxSize={10} color="gray.400" mb={3} />
                      <Text>No unread notifications</Text>
                    </Box>
                  )}
                </VStack>
              </TabPanel>
              <TabPanel p={0}>
                <VStack spacing={0} align="stretch">
                  {filterNotificationsByTab(notifications).length > 0 ? (
                    filterNotificationsByTab(notifications).map(renderNotificationItem)
                  ) : (
                    <Box textAlign="center" py={10}>
                      <Icon as={FaCheckCircle} boxSize={10} color="gray.400" mb={3} />
                      <Text>No credit notifications</Text>
                    </Box>
                  )}
                </VStack>
              </TabPanel>
              <TabPanel p={0}>
                <VStack spacing={0} align="stretch">
                  {filterNotificationsByTab(notifications).length > 0 ? (
                    filterNotificationsByTab(notifications).map(renderNotificationItem)
                  ) : (
                    <Box textAlign="center" py={10}>
                      <Icon as={FaCheckCircle} boxSize={10} color="gray.400" mb={3} />
                      <Text>No support notifications</Text>
                    </Box>
                  )}
                </VStack>
              </TabPanel>
              <TabPanel p={0}>
                <VStack spacing={0} align="stretch">
                  {filterNotificationsByTab(notifications).length > 0 ? (
                    filterNotificationsByTab(notifications).map(renderNotificationItem)
                  ) : (
                    <Box textAlign="center" py={10}>
                      <Icon as={FaCheckCircle} boxSize={10} color="gray.400" mb={3} />
                      <Text>No patent notifications</Text>
                    </Box>
                  )}
                </VStack>
              </TabPanel>
            </TabPanels>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">Settings</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default NotificationCenter
