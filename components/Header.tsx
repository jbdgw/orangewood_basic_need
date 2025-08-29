import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="https://orangewoodfoundation.org/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/orangewood-logo.webp"
                alt="Orangewood Foundation"
                width={280}
                height={56}
                className="h-14 w-auto hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          {/* Contact Button */}
          <a href="/contact">
            <Button variant="default" size="default">
              Contact
            </Button>
          </a>
        </div>
      </div>
    </header>
  )
}