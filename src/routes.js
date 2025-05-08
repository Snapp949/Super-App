import { Icon } from "@chakra-ui/react"
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdLightbulb,
  MdSettings,
  MdHelpOutline,
  MdPhoneIphone,
} from "react-icons/md"
import { FaUsers, FaChartLine } from "react-icons/fa"
import NFTMarketplace from "src/views/admin/marketplace"
import Profile from "src/views/admin/profile"
import WealthDashboard from "src/views/admin/wealthDashboard"
import InnovationDashboard from "src/views/admin/innovationDashboard"

// Component Imports
import HolisticCreditScoring from "src/components/credit/HolisticCreditScoring"
import SupportCollective from "src/components/support/SupportCollective"
import PatentNFFSystem from "src/components/innovation/PatentNFFSystem"
import AnalyticsDashboard from "src/components/analytics/AnalyticsDashboard"
import UserSettings from "src/components/settings/UserSettings"
import HelpCenter from "src/components/help/HelpCenter"
import MobileAppPreview from "src/components/mobile/MobileAppPreview"

// Auth Imports
import SignInCentered from "src/views/auth/signIn"
import SignUpCentered from "src/views/auth/signUp"

const routes = [
  {
    name: "Innovation Hub",
    layout: "/admin",
    path: "/innovation",
    icon: <Icon as={MdLightbulb} width="20px" height="20px" color="inherit" />,
    component: InnovationDashboard,
  },
  {
    name: "Wealth Overview",
    layout: "/admin",
    path: "/wealth-dashboard",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: WealthDashboard,
  },
  {
    name: "Credit Assessment",
    layout: "/admin",
    path: "/credit",
    icon: <Icon as={FaChartLine} width="20px" height="20px" color="inherit" />,
    component: HolisticCreditScoring,
  },
  {
    name: "Support Collective",
    layout: "/admin",
    path: "/support",
    icon: <Icon as={FaUsers} width="20px" height="20px" color="inherit" />,
    component: SupportCollective,
  },
  {
    name: "Patents & NFF",
    layout: "/admin",
    path: "/patents",
    icon: <Icon as={MdLightbulb} width="20px" height="20px" color="inherit" />,
    component: PatentNFFSystem,
  },
  {
    name: "Analytics",
    layout: "/admin",
    path: "/analytics",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: AnalyticsDashboard,
  },
  {
    name: "Asset Marketplace",
    layout: "/admin",
    path: "/marketplace",
    icon: <Icon as={MdOutlineShoppingCart} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "/settings",
    icon: <Icon as={MdSettings} width="20px" height="20px" color="inherit" />,
    component: UserSettings,
  },
  {
    name: "Help Center",
    layout: "/admin",
    path: "/help",
    icon: <Icon as={MdHelpOutline} width="20px" height="20px" color="inherit" />,
    component: HelpCenter,
  },
  {
    name: "Mobile App",
    layout: "/admin",
    path: "/mobile",
    icon: <Icon as={MdPhoneIphone} width="20px" height="20px" color="inherit" />,
    component: MobileAppPreview,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignUpCentered,
  },
]

export default routes
