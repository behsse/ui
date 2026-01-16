import {Footer} from "./components/Footer";
import { CodePreview } from "./components/homepage/CodePreview";
import { CTASection } from "./components/homepage/CTASection";
import { Feature } from "./components/homepage/Feature";
import Header from "./components/homepage/Header";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Feature />
      <CodePreview />
      <CTASection />
      <Footer />
    </main>
  );
}
