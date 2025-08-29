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
                width={200}
                height={40}
                className="h-10 w-auto hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          {/* Contact Button */}
          <Button variant="default" size="sm">
            Contact
          </Button>
        </div>
      </div>
    </header>
  )
}