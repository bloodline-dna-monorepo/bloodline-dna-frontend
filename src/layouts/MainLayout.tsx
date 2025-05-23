import type { ReactNode } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer/Footer"
import ScrollToTop from "../components/ScrollToTop"
import HelpButton from "../components/HelpButton"

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollToTop />
      <HelpButton />
    </div>
  )
}

export default MainLayout
