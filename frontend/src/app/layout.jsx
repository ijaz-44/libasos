import { Federo, Urbanist, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import AiAssistantBox from "@/components/ai/AiAssistantBox";
import SearchModal from "@/components/modals/SearchModal";
import QueryProvider from "@/lib/queryClient";

const fontHeader = Federo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-header",
  display: "swap",
});

const fontUi = Urbanist({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const fontContent = Manrope({
  subsets: ["latin"],
  variable: "--font-content",
  display: "swap",
});

export const metadata = {
  title: "ZAYRA — Multi-Brand Fashion & Editorial Storefront",
  description: "Curated multi-brand fashion storefront powered by AI styling & seamless discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fontHeader.variable} ${fontUi.variable} ${fontContent.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-primary-soft)] selection:text-[var(--color-primary-hover)]">
        <QueryProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <CartDrawer />
          <AiAssistantBox />
          <SearchModal />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}