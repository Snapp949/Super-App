"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Icon,
  VStack,
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { FaUserCog, FaBell, FaLock, FaExchangeAlt, FaUserShield, FaGlobe, FaSave, FaUndo } from "react-icons/fa"

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  // Colors
  const cardBg = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "white")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const electricBlue = "#007bff"

  // Mock user settings data
  const [settings, setSettings] = useState({
    profile: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      language: "en",
      timezone: "America/New_York",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      creditScoreUpdates: true,
      supportCollectiveAlerts: true,
      patentStatusChanges: true,
      marketUpdates: false,
      weeklyDigest: true,
    },
    privacy: {
      showProfileToPublic: false,
      showSupportGoals: true,
      showPatents: true,
      allowDataAnalysis: true,
      allowThirdPartySharing: false,
    },
    security: {
      twoFactorAuth: true,
      loginNotifications: true,
      sessionTimeout: "30",
      deviceHistory: true,
    },
    integrations: {
      bankAccounts: true,
      investmentAccounts: true,
      socialMedia: false,
      googleDrive: true,
    },
  })

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }, 1000)
  }

  const handleToggleSetting = (category, setting) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: !settings[category][setting],
      },
    })
  }

  const handleInputChange = (category, setting, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value,
      },
    })
  }

  const renderProfileSettings = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <Heading size="md">Profile Information</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              value={settings.profile.firstName}
              onChange={(e) => handleInputChange("profile", "firstName", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={settings.profile.lastName}
              onChange={(e) => handleInputChange("profile", "lastName", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              value={settings.profile.email}
              onChange={(e) => handleInputChange("profile", "email", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              value={settings.profile.phone}
              onChange={(e) => handleInputChange("profile", "phone", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Language</FormLabel>
            <Select
              value={settings.profile.language}
              onChange={(e) => handleInputChange("profile", "language", e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Timezone</FormLabel>
            <Select
              value={settings.profile.timezone}
              onChange={(e) => handleInputChange("profile", "timezone", e.target.value)}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">Greenwich Mean Time (GMT)</option>
              <option value="Europe/Paris">Central European Time (CET)</option>
              <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
            </Select>
          </FormControl>
        </SimpleGrid>
      </CardBody>
    </Card>
  )

  const renderNotificationSettings = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <Heading size="md">Notification Preferences</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Heading size="sm" mb={2}>
            Notification Channels
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl display="flex" alignItems="center">
              <Switch
                id="email-notifications"
                isChecked={settings.notifications.emailNotifications}
                onChange={() => handleToggleSetting("notifications", "emailNotifications")}
                colorScheme="blue"
                mr={3}
              />
              <FormLabel htmlFor="email-notifications" mb="0">
                Email Notifications
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="push-notifications"
                isChecked={settings.notifications.pushNotifications}
                onChange={() => handleToggleSetting("notifications", "pushNotifications")}
                colorScheme="blue"
                mr={3}
              />
              <FormLabel htmlFor="push-notifications" mb="0">
                Push Notifications
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="sms-notifications"
                isChecked={settings.notifications.smsNotifications}
                onChange={() => handleToggleSetting("notifications", "smsNotifications")}
                colorScheme="blue"
                mr={3}
              />
              <FormLabel htmlFor="sms-notifications" mb="0">
                SMS Notifications
              </FormLabel>
            </FormControl>
          </SimpleGrid>

          <Divider my={4} />

          <Heading size="sm" mb={2}>
            Notification Types
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl display="flex" alignItems="center">
              <Switch
                id="credit-score-updates"
                isChecked={settings.notifications.creditScoreUpdates}
                onChange={() => handleToggleSetting("notifications", "creditScoreUpdates")}
                colorScheme="blue"
                mr={3}
              />
              <FormLabel htmlFor="credit-score-updates" mb="0">
                Credit Score Updates
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="support-collective-alerts"
                isChecked={settings.notifications.supportCollectiveAlerts}
                onChange={() => handleToggleSetting("notifications", "supportCollectiveAlerts")}
                colorScheme="blue"
                mr={3}
              />
              <FormLabel htmlFor="support-collective-alerts" mb="0">
                Support Collective Alerts
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="patent-status-changes"
                isChecked={settings.notifications.patentStatusChanges}
                onChange={() => handleToggleSetting("notifications", "patentStatusChanges")}
                colorScheme="blue"
                mr={3}
              />
              <FormLabel htmlFor="patent-status-changes" mb="0">
                Patent Status Changes
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="market-updates"
                isChecked={settings.notifications.marketUpdates}
                onChange={() => handleToggleSetting("notifications", "marketUpdates")}
                colorScheme="blue"
                mr={3}
              />
              <FormLabel htmlFor="market-updates" mb="0">
                Market Updates
              </FormLabel>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Switch
                id="weekly-digest"
                isChecked={settings.notifications.weeklyDigest}
                onChange={() => handleToggleSetting("notifications", "weeklyDigest")}
                colorScheme="blue"
                mr={3}
              />
              <FormLabel htmlFor="weekly-digest" mb="0">
                Weekly Digest
              </FormLabel>
            </FormControl>
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  )

  const renderPrivacySettings = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <Heading size="md">Privacy Settings</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <FormControl display="flex" alignItems="center">
            <Switch
              id="show-profile-public"
              isChecked={settings.privacy.showProfileToPublic}
              onChange={() => handleToggleSetting("privacy", "showProfileToPublic")}
              colorScheme="blue"
              mr={3}
            />
            <FormLabel htmlFor="show-profile-public" mb="0">
              Show my profile to the public
            </FormLabel>
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <Switch
              id="show-support-goals"
              isChecked={settings.privacy.showSupportGoals}
              onChange={() => handleToggleSetting("privacy", "showSupportGoals")}
              colorScheme="blue"
              mr={3}
            />
            <FormLabel htmlFor="show-support-goals" mb="0">
              Make my support goals visible to others
            </FormLabel>
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <Switch
              id="show-patents"
              isChecked={settings.privacy.showPatents}
              onChange={() => handleToggleSetting("privacy", "showPatents")}
              colorScheme="blue"
              mr={3}
            />
            <FormLabel htmlFor="show-patents" mb="0">
              Display my patents and innovations publicly
            </FormLabel>
          </FormControl>

          <Divider my={2} />

          <FormControl display="flex" alignItems="center">
            <Switch
              id="allow-data-analysis"
              isChecked={settings.privacy.allowDataAnalysis}
              onChange={() => handleToggleSetting("privacy", "allowDataAnalysis")}
              colorScheme="blue"
              mr={3}
            />
            <FormLabel htmlFor="allow-data-analysis" mb="0">
              Allow data analysis to improve my experience
            </FormLabel>
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <Switch
              id="allow-third-party"
              isChecked={settings.privacy.allowThirdPartySharing}
              onChange={() => handleToggleSetting("privacy", "allowThirdPartySharing")}
              colorScheme="blue"
              mr={3}
            />
            <FormLabel htmlFor="allow-third-party" mb="0">
              Allow sharing with trusted third parties
            </FormLabel>
          </FormControl>
        </VStack>
      </CardBody>
    </Card>
  )

  const renderSecuritySettings = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <Heading size="md">Security Settings</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <FormControl display="flex" alignItems="center">
            <Switch
              id="two-factor-auth"
              isChecked={settings.security.twoFactorAuth}
              onChange={() => handleToggleSetting("security", "twoFactorAuth")}
              colorScheme="blue"
              mr={3}
            />
            <FormLabel htmlFor="two-factor-auth" mb="0">
              Enable Two-Factor Authentication
            </FormLabel>
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <Switch
              id="login-notifications"
              isChecked={settings.security.loginNotifications}
              onChange={() => handleToggleSetting("security", "loginNotifications")}
              colorScheme="blue"
              mr={3}
            />
            <FormLabel htmlFor="login-notifications" mb="0">
              Notify me of new login attempts
            </FormLabel>
          </FormControl>

          <FormControl>
            <FormLabel>Session Timeout (minutes)</FormLabel>
            <Select
              value={settings.security.sessionTimeout}
              onChange={(e) => handleInputChange("security", "sessionTimeout", e.target.value)}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="240">4 hours</option>
            </Select>
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <Switch
              id="device-history"
              isChecked={settings.security.deviceHistory}
              onChange={() => handleToggleSetting("security", "deviceHistory")}
              colorScheme="blue"
              mr={3}
            />
            <FormLabel htmlFor="device-history" mb="0">
              Keep device login history
            </FormLabel>
          </FormControl>

          <Box mt={4}>
            <Button colorScheme="red" variant="outline">
              Reset Password
            </Button>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )

  const renderIntegrationSettings = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <Heading size="md">Connected Accounts & Integrations</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <HStack>
              <Icon as={FaExchangeAlt} color="blue.500" />
              <FormLabel htmlFor="bank-accounts" mb="0">
                Bank Accounts
              </FormLabel>
            </HStack>
            <HStack>
              <Text fontSize="sm" color={settings.integrations.bankAccounts ? "green.500" : "gray.500"} mr={2}>
                {settings.integrations.bankAccounts ? "Connected" : "Not Connected"}
              </Text>
              <Switch
                id="bank-accounts"
                isChecked={settings.integrations.bankAccounts}
                onChange={() => handleToggleSetting("integrations", "bankAccounts")}
                colorScheme="blue"
              />
            </HStack>
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <HStack>
              <Icon as={FaExchangeAlt} color="purple.500" />
              <FormLabel htmlFor="investment-accounts" mb="0">
                Investment Accounts
              </FormLabel>
            </HStack>
            <HStack>
              <Text fontSize="sm" color={settings.integrations.investmentAccounts ? "green.500" : "gray.500"} mr={2}>
                {settings.integrations.investmentAccounts ? "Connected" : "Not Connected"}
              </Text>
              <Switch
                id="investment-accounts"
                isChecked={settings.integrations.investmentAccounts}
                onChange={() => handleToggleSetting("integrations", "investmentAccounts")}
                colorScheme="blue"
              />
            </HStack>
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <HStack>
              <Icon as={FaExchangeAlt} color="red.500" />
              <FormLabel htmlFor="social-media" mb="0">
                Social Media
              </FormLabel>
            </HStack>
            <HStack>
              <Text fontSize="sm" color={settings.integrations.socialMedia ? "green.500" : "gray.500"} mr={2}>
                {settings.integrations.socialMedia ? "Connected" : "Not Connected"}
              </Text>
              <Switch
                id="social-media"
                isChecked={settings.integrations.socialMedia}
                onChange={() => handleToggleSetting("integrations", "socialMedia")}
                colorScheme="blue"
              />
            </HStack>
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <HStack>
              <Icon as={FaExchangeAlt} color="green.500" />
              <FormLabel htmlFor="google-drive" mb="0">
                Google Drive
              </FormLabel>
            </HStack>
            <HStack>
              <Text fontSize="sm" color={settings.integrations.googleDrive ? "green.500" : "gray.500"} mr={2}>
                {settings.integrations.googleDrive ? "Connected" : "Not Connected"}
              </Text>
              <Switch
                id="google-drive"
                isChecked={settings.integrations.googleDrive}
                onChange={() => handleToggleSetting("integrations", "googleDrive")}
                colorScheme="blue"
              />
            </HStack>
          </FormControl>

          <Box mt={4}>
            <Button colorScheme="blue" variant="outline">
              Connect New Service
            </Button>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">User Settings</Heading>
        <HStack>
          <Button leftIcon={<FaUndo />} variant="outline" mr={2}>
            Reset
          </Button>
          <Button
            leftIcon={<FaSave />}
            colorScheme="blue"
            onClick={handleSaveSettings}
            isLoading={isLoading}
            loadingText="Saving..."
          >
            Save Changes
          </Button>
        </HStack>
      </Flex>

      <Tabs variant="soft-rounded" colorScheme="blue" onChange={(index) => setActiveTab(index)} mb={6}>
        <TabList mb={5}>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaUserCog} mr={2} />
            Profile
          </Tab>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaBell} mr={2} />
            Notifications
          </Tab>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaUserShield} mr={2} />
            Privacy
          </Tab>
          <Tab mr={2} _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaLock} mr={2} />
            Security
          </Tab>
          <Tab _selected={{ bg: electricBlue, color: "white" }}>
            <Icon as={FaGlobe} mr={2} />
            Integrations
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>{renderProfileSettings()}</TabPanel>
          <TabPanel px={0}>{renderNotificationSettings()}</TabPanel>
          <TabPanel px={0}>{renderPrivacySettings()}</TabPanel>
          <TabPanel px={0}>{renderSecuritySettings()}</TabPanel>
          <TabPanel px={0}>{renderIntegrationSettings()}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default UserSettings
