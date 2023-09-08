export default function FirstLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="m-6 text-center">
      <p>layout 1</p>
      {children}
    </main>
  )
}
