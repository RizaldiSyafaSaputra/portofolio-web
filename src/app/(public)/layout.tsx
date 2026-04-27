import { AmbientBackground } from "@/components/ui/AmbientBackground";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBackground />
      {children}
    </>
  );
}
