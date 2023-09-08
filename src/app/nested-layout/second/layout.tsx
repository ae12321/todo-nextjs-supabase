export default function SecondLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <p>layout 2</p>
      {children}
    </main>
  )
}
