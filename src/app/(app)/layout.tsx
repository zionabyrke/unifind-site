import { Navbar } from "@/components/layout/Navbar";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0">{children}</main>
      <MobileTabBar />
    </>
  );
}
