"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
  HStack,
  VStack,
  Icon,
  Collapse,
  Progress,
  useDisclosure,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { FaCheck, FaEdit, FaMagic } from "react-icons/fa"

// This component demonstrates the smart data collection that only asks questions once
// and auto-populates fields based on previously collected information

const SmartDataCollection = ({ formType = "financial", userId = "user123", onSubmit }) => {
  const [formState, setFormState] = useState({
    isLoading: true,
    autoPopulated: {},
    manualFields: {},
    confirmedFields: {},
    currentStep: 0,
    totalSteps: 0,
  })

  const { isOpen: isEditMode, onToggle: toggleEditMode } = useDisclosure()
  const toast = useToast()

  // Colors
  const cardBg = useColorModeValue("white", "navy.700")
  const textColor = useColorModeValue("gray.700", "white")
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100")
  const highlightBg = useColorModeValue("blue.50", "whiteAlpha.100")
  const electricBlue = "#007bff"
  const gold = "#FFD700"

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API call to get user's previously entered data
    setTimeout(() => {
      const mockPreviousData = {
        // Personal information
        firstName: "John",
        lastName: "Smith",
        dob: "1985-06-15",
        address: "123 Main St, Anytown, CA 94321",
        phone: "(555) 123-4567",
        email: "john.smith@example.com",

        // Employment information
        employer: "Tech Innovations Inc.",
        jobTitle: "Senior Developer",
        employmentLength: "4 years",
        annualIncome: 120000,

        // Financial information
        bankName: "First National Bank",
        accountType: "Checking",
        monthlyExpenses: 3500,

        // Investment preferences
        riskTolerance: "moderate",
        investmentGoals: ["retirement", "growth"],
        preferredSectors: ["technology", "healthcare"],
      }

      const formSteps = getFormSteps(formType)

      setFormState({
        ...formState,
        isLoading: false,
        autoPopulated: mockPreviousData,
        totalSteps: formSteps.length,
        currentStep: 0,
      })
    }, 1000)
  }, [formType, userId])

  // Define form steps based on form type
  const getFormSteps = (type) => {
    switch (type) {
      case "financial":
        return [
          { id: "personalInfo", title: "Personal Information" },
          { id: "employmentInfo", title: "Employment Details" },
          { id: "financialOverview", title: "Financial Overview" },
          { id: "investmentPreferences", title: "Investment Preferences" },
        ]
      case "credit":
        return [
          { id: "personalInfo", title: "Personal Information" },
          { id: "creditHistory", title: "Credit History" },
          { id: "supportNetwork", title: "Support Network" },
          { id: "educationCareer", title: "Education & Career" },
        ]
      case "tokenization":
        return [
          { id: "assetInfo", title: "Asset Information" },
          { id: "ownershipProof", title: "Ownership Documentation" },
          { id: "valuation", title: "Valuation Details" },
          { id: "tokenizationPreferences", title: "Tokenization Preferences" },
        ]
      default:
        return [
          { id: "personalInfo", title: "Personal Information" },
          { id: "additionalInfo", title: "Additional Information" },
        ]
    }
  }

  const renderCurrentStep = () => {
    if (formState.isLoading) {
      return (
        <Box p={5} textAlign="center">
          <Text mb={3}>Loading your information...</Text>
          <Progress size="xs" isIndeterminate colorScheme="blue" />
        </Box>
      )
    }

    const steps = getFormSteps(formType)
    const currentStep = steps[formState.currentStep]

    switch (currentStep.id) {
      case "personalInfo":
        return renderPersonalInfoStep()
      case "employmentInfo":
        return renderEmploymentInfoStep()
      case "financialOverview":
        return renderFinancialOverviewStep()
      case "investmentPreferences":
        return renderInvestmentPreferencesStep()
      case "creditHistory":
        return renderCreditHistoryStep()
      case "supportNetwork":
        return renderSupportNetworkStep()
      case "educationCareer":
        return renderEducationCareerStep()
      case "assetInfo":
        return renderAssetInfoStep()
      case "ownershipProof":
        return renderOwnershipProofStep()
      case "valuation":
        return renderValuationStep()
      case "tokenizationPreferences":
        return renderTokenizationPreferencesStep()
      default:
        return <Text>Unknown step</Text>
    }
  }

  const renderPersonalInfoStep = () => {
    const { firstName, lastName, dob, address, phone, email } = formState.autoPopulated

    return (
      <Box>
        <Card bg={highlightBg} mb={5} variant="outline">
          <CardBody>
            <HStack spacing={3} align="flex-start">
              <Icon as={FaMagic} color={electricBlue} mt={1} boxSize={5} />
              <Box>
                <Text fontWeight="medium">We've found your information</Text>
                <Text fontSize="sm">
                  We've automatically retrieved your personal information from your profile. Please confirm it's correct
                  or make changes if needed.
                </Text>
              </Box>
            </HStack>
          </CardBody>
        </Card>

        <VStack spacing={4} align="stretch" mb={4}>
          <Flex justify="space-between" align="center">
            <Heading size="md">Personal Information</Heading>
            <Button
              leftIcon={isEditMode ? <FaCheck /> : <FaEdit />}
              size="sm"
              variant={isEditMode ? "solid" : "outline"}
              colorScheme="blue"
              onClick={toggleEditMode}
            >
              {isEditMode ? "Confirm" : "Edit"}
            </Button>
          </Flex>

          <Collapse in={!isEditMode} animateOpacity>
            <Card bg={cardBg} variant="outline">
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Name
                    </Text>
                    <Text>
                      {firstName} {lastName}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Date of Birth
                    </Text>
                    <Text>{dob}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Address
                    </Text>
                    <Text>{address}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Phone
                    </Text>
                    <Text>{phone}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Email
                    </Text>
                    <Text>{email}</Text>
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>
          </Collapse>

          <Collapse in={isEditMode} animateOpacity>
            <Card bg={cardBg} variant="outline">
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input defaultValue={firstName} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input defaultValue={lastName} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input type="date" defaultValue={dob} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input defaultValue={address} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input defaultValue={phone} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" defaultValue={email} />
                  </FormControl>
                </SimpleGrid>
              </CardBody>
            </Card>
          </Collapse>
        </VStack>
      </Box>
    )
  }

  const renderEmploymentInfoStep = () => {
    const { employer, jobTitle, employmentLength, annualIncome } = formState.autoPopulated

    return (
      <Box>
        <Card bg={highlightBg} mb={5} variant="outline">
          <CardBody>
            <HStack spacing={3} align="flex-start">
              <Icon as={FaMagic} color={electricBlue} mt={1} boxSize={5} />
              <Box>
                <Text fontWeight="medium">Employment Information Found</Text>
                <Text fontSize="sm">
                  We've retrieved your employment information from your previous applications. Please confirm it's up to
                  date.
                </Text>
              </Box>
            </HStack>
          </CardBody>
        </Card>

        <VStack spacing={4} align="stretch" mb={4}>
          <Flex justify="space-between" align="center">
            <Heading size="md">Employment Details</Heading>
            <Button
              leftIcon={isEditMode ? <FaCheck /> : <FaEdit />}
              size="sm"
              variant={isEditMode ? "solid" : "outline"}
              colorScheme="blue"
              onClick={toggleEditMode}
            >
              {isEditMode ? "Confirm" : "Edit"}
            </Button>
          </Flex>

          <Collapse in={!isEditMode} animateOpacity>
            <Card bg={cardBg} variant="outline">
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Employer
                    </Text>
                    <Text>{employer}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Job Title
                    </Text>
                    <Text>{jobTitle}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Length of Employment
                    </Text>
                    <Text>{employmentLength}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Annual Income
                    </Text>
                    <Text>${annualIncome.toLocaleString()}</Text>
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>
          </Collapse>

          <Collapse in={isEditMode} animateOpacity>
            <Card bg={cardBg} variant="outline">
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel>Employer</FormLabel>
                    <Input defaultValue={employer} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Job Title</FormLabel>
                    <Input defaultValue={jobTitle} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Length of Employment</FormLabel>
                    <Input defaultValue={employmentLength} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Annual Income</FormLabel>
                    <Input type="number" defaultValue={annualIncome} />
                  </FormControl>
                </SimpleGrid>
              </CardBody>
            </Card>
          </Collapse>
        </VStack>
      </Box>
    )
  }

  const renderFinancialOverviewStep = () => {
    const { bankName, accountType, monthlyExpenses } = formState.autoPopulated

    return (
      <Box>
        <Card bg={highlightBg} mb={5} variant="outline">
          <CardBody>
            <HStack spacing={3} align="flex-start">
              <Icon as={FaMagic} color={electricBlue} mt={1} boxSize={5} />
              <Box>
                <Text fontWeight="medium">Financial Information Retrieved</Text>
                <Text fontSize="sm">
                  We've found your financial information from your account. Please confirm the details below.
                </Text>
              </Box>
            </HStack>
          </CardBody>
        </Card>

        <VStack spacing={4} align="stretch" mb={4}>
          <Flex justify="space-between" align="center">
            <Heading size="md">Financial Overview</Heading>
            <Button
              leftIcon={isEditMode ? <FaCheck /> : <FaEdit />}
              size="sm"
              variant={isEditMode ? "solid" : "outline"}
              colorScheme="blue"
              onClick={toggleEditMode}
            >
              {isEditMode ? "Confirm" : "Edit"}
            </Button>
          </Flex>

          <Collapse in={!isEditMode} animateOpacity>
            <Card bg={cardBg} variant="outline">
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Primary Bank
                    </Text>
                    <Text>{bankName}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Account Type
                    </Text>
                    <Text>{accountType}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Monthly Expenses
                    </Text>
                    <Text>${monthlyExpenses.toLocaleString()}</Text>
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>
          </Collapse>

          <Collapse in={isEditMode} animateOpacity>
            <Card bg={cardBg} variant="outline">
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel>Primary Bank</FormLabel>
                    <Input defaultValue={bankName} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Account Type</FormLabel>
                    <Select defaultValue={accountType}>
                      <option value="Checking">Checking</option>
                      <option value="Savings">Savings</option>
                      <option value="Investment">Investment</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Monthly Expenses</FormLabel>
                    <Input type="number" defaultValue={monthlyExpenses} />
                  </FormControl>
                </SimpleGrid>
              </CardBody>
            </Card>
          </Collapse>
        </VStack>
      </Box>
    )
  }

  const renderInvestmentPreferencesStep = () => {
    const { riskTolerance, investmentGoals, preferredSectors } = formState.autoPopulated

    return (
      <Box>
        <Card bg={highlightBg} mb={5} variant="outline">
          <CardBody>
            <HStack spacing={3} align="flex-start">
              <Icon as={FaMagic} color={electricBlue} mt={1} boxSize={5} />
              <Box>
                <Text fontWeight="medium">Investment Preferences Detected</Text>
                <Text fontSize="sm">
                  Based on your profile and past interactions, we've identified your investment preferences. Please
                  confirm or update them.
                </Text>
              </Box>
            </HStack>
          </CardBody>
        </Card>

        <VStack spacing={4} align="stretch" mb={4}>
          <Flex justify="space-between" align="center">
            <Heading size="md">Investment Preferences</Heading>
            <Button
              leftIcon={isEditMode ? <FaCheck /> : <FaEdit />}
              size="sm"
              variant={isEditMode ? "solid" : "outline"}
              colorScheme="blue"
              onClick={toggleEditMode}
            >
              {isEditMode ? "Confirm" : "Edit"}
            </Button>
          </Flex>

          <Collapse in={!isEditMode} animateOpacity>
            <Card bg={cardBg} variant="outline">
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Risk Tolerance
                    </Text>
                    <Text textTransform="capitalize">{riskTolerance}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Investment Goals
                    </Text>
                    <Text>
                      {investmentGoals.map((goal) => goal.charAt(0).toUpperCase() + goal.slice(1)).join(", ")}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color={secondaryTextColor}>
                      Preferred Sectors
                    </Text>
                    <Text>
                      {preferredSectors.map((sector) => sector.charAt(0).toUpperCase() + sector.slice(1)).join(", ")}
                    </Text>
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>
          </Collapse>

          <Collapse in={isEditMode} animateOpacity>
            <Card bg={cardBg} variant="outline">
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Risk Tolerance</FormLabel>
                    <RadioGroup defaultValue={riskTolerance}>
                      <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                        <Radio value="conservative">Conservative</Radio>
                        <Radio value="moderate">Moderate</Radio>
                        <Radio value="aggressive">Aggressive</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Investment Goals</FormLabel>
                    <Stack spacing={2}>
                      <Checkbox defaultChecked={investmentGoals.includes("retirement")}>Retirement</Checkbox>
                      <Checkbox defaultChecked={investmentGoals.includes("growth")}>Long-term Growth</Checkbox>
                      <Checkbox defaultChecked={investmentGoals.includes("income")}>Income Generation</Checkbox>
                      <Checkbox defaultChecked={investmentGoals.includes("shortTerm")}>Short-term Gains</Checkbox>
                    </Stack>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Preferred Sectors</FormLabel>
                    <Stack spacing={2}>
                      <Checkbox defaultChecked={preferredSectors.includes("technology")}>Technology</Checkbox>
                      <Checkbox defaultChecked={preferredSectors.includes("healthcare")}>Healthcare</Checkbox>
                      <Checkbox defaultChecked={preferredSectors.includes("finance")}>Finance</Checkbox>
                      <Checkbox defaultChecked={preferredSectors.includes("energy")}>Energy</Checkbox>
                      <Checkbox defaultChecked={preferredSectors.includes("realEstate")}>Real Estate</Checkbox>
                    </Stack>
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
          </Collapse>
        </VStack>
      </Box>
    )
  }

  // Placeholder functions for additional form steps
  const renderCreditHistoryStep = () => (
    <Box>
      <Text>Credit History step content would go here</Text>
    </Box>
  )

  const renderSupportNetworkStep = () => (
    <Box>
      <Text>Support Network step content would go here</Text>
    </Box>
  )

  const renderEducationCareerStep = () => (
    <Box>
      <Text>Education & Career step content would go here</Text>
    </Box>
  )

  const renderAssetInfoStep = () => (
    <Box>
      <Text>Asset Information step content would go here</Text>
    </Box>
  )

  const renderOwnershipProofStep = () => (
    <Box>
      <Text>Ownership Documentation step content would go here</Text>
    </Box>
  )

  const renderValuationStep = () => (
    <Box>
      <Text>Valuation Details step content would go here</Text>
    </Box>
  )

  const renderTokenizationPreferencesStep = () => (
    <Box>
      <Text>Tokenization Preferences step content would go here</Text>
    </Box>
  )

  const handleNext = () => {
    if (formState.currentStep < formState.totalSteps - 1) {
      setFormState({
        ...formState,
        currentStep: formState.currentStep + 1,
      })
    } else {
      // Form submission
      toast({
        title: "Information Confirmed",
        description: "Your information has been successfully processed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      if (onSubmit) {
        onSubmit({
          ...formState.autoPopulated,
          ...formState.confirmedFields,
        })
      }
    }
  }

  const handleBack = () => {
    if (formState.currentStep > 0) {
      setFormState({
        ...formState,
        currentStep: formState.currentStep - 1,
      })
    }
  }

  const renderProgressSteps = () => {
    const steps = getFormSteps(formType)
    const progress = ((formState.currentStep + 1) / formState.totalSteps) * 100

    return (
      <Box mb={6}>
        <Flex justify="space-between" mb={2}>
          <Text fontWeight="medium">Progress</Text>
          <Text>
            {formState.currentStep + 1} of {formState.totalSteps}
          </Text>
        </Flex>
        <Progress value={progress} size="sm" colorScheme="blue" mb={3} />
        <HStack spacing={4}>
          {steps.map((step, index) => (
            <Box
              key={step.id}
              opacity={formState.currentStep === index ? 1 : 0.5}
              fontWeight={formState.currentStep === index ? "bold" : "normal"}
            >
              {step.title}
            </Box>
          ))}
        </HStack>
      </Box>
    )
  }

  return (
    <Box>
      <Heading size="lg" mb={6}>
        Smart Data Collection
      </Heading>

      {renderProgressSteps()}

      {renderCurrentStep()}

      <Flex justify="space-between" mt={6}>
        <Button onClick={handleBack} isDisabled={formState.currentStep === 0} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext} colorScheme="blue">
          {formState.currentStep === formState.totalSteps - 1 ? "Submit" : "Next"}
        </Button>
      </Flex>
    </Box>
  )
}

const SimpleGrid = ({ columns, spacing, children, ...rest }) => {
  return (
    <Flex flexWrap="wrap" mx={-spacing / 2} {...rest}>
      {React.Children.map(children, (child) => (
        <Box flexBasis={`calc(${100 / Object.values(columns)[0]}% - ${spacing}px)`} mx={spacing / 2} mb={spacing}>
          {child}
        </Box>
      ))}
    </Flex>
  )
}

export default SmartDataCollection
