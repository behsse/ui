import {Footer} from "../components/Footer";
import { CodePreview } from "../components/homepage/CodePreview";
import { CTASection } from "../components/homepage/CTASection";
import { Feature } from "../components/homepage/Feature";
import Header from "../components/homepage/Header";
import pkg from "../../../../package.json";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header version={pkg.version} />
      <Feature />
      <CodePreview />
      <CTASection />
      <Footer />
    </main>
  );
}
