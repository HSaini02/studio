
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] items-center justify-center p-4">
      {/* Adjust min-h if header/footer height changes. 16 (h-16) is typically 4rem. So 8rem total. */}
      {children}
    </div>
  );
}
