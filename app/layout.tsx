import type { Metadata } from 'next'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Permacite — Your sources, permanent forever.',
  description: 'Archive your research sources the moment you cite them. Never lose a broken link again.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="m-0 antialiased">
        {children}
      </body>
    </html>
  )
}
