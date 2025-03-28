import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="space-y-6 px-6 py-10 max-w-3xl mx-auto min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
