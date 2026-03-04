import { Navbar } from "../components/Navbar";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="pt-[62px] border-x border-x-border border-dashed w-full 3xl:max-w-[1550px] 3xl:mx-auto min-h-screen">
        {children}
      </div>
    </>
  );
}
