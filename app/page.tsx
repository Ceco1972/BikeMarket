import { Search, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for bicycles
const featuredBikes = [
  {
    id: 1,
    name: "Trek Domane SL 7",
    price: 3499,
    originalPrice: 3799,
    image: "/placeholder.svg?height=300&width=400",
    seller: "Pro Bike Shop",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 124,
    category: "Road",
    condition: "New",
  },
  {
    id: 2,
    name: "Specialized Stumpjumper",
    price: 2899,
    image: "/placeholder.svg?height=300&width=400",
    seller: "Mountain Gear Co",
    location: "Denver, CO",
    rating: 4.9,
    reviews: 89,
    category: "Mountain",
    condition: "New",
  },
  {
    id: 3,
    name: "Cannondale Quick CX 3",
    price: 899,
    image: "/placeholder.svg?height=300&width=400",
    seller: "City Cycles",
    location: "Portland, OR",
    rating: 4.7,
    reviews: 156,
    category: "Hybrid",
    condition: "Used - Excellent",
  },
  {
    id: 4,
    name: "Giant TCR Advanced Pro",
    price: 4299,
    image: "/placeholder.svg?height=300&width=400",
    seller: "Elite Cycling",
    location: "Austin, TX",
    rating: 4.9,
    reviews: 67,
    category: "Road",
    condition: "New",
  },
]

const categories = [
  { name: "Road", count: 1247, image: "/placeholder.svg?height=200&width=300" },
  { name: "Mountain", count: 892, image: "/placeholder.svg?height=200&width=300" },
  { name: "Hybrid", count: 634, image: "/placeholder.svg?height=200&width=300" },
  { name: "Electric", count: 456, image: "/placeholder.svg?height=200&width=300" },
  { name: "BMX", count: 234, image: "/placeholder.svg?height=200&width=300" },
  { name: "Cruiser", count: 189, image: "/placeholder.svg?height=200&width=300" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                BikeMarket
              </Link>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for bikes, brands, or sellers..."
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </div>

            <nav className="flex items-center space-x-4">
              <Link href="/sell" className="text-gray-700 hover:text-gray-900">
                Sell
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-gray-900">
                Sign In
              </Link>
              <Button>Post Listing</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Bike</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with trusted sellers and discover amazing deals on quality bicycles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="What bike are you looking for?"
                  className="pl-10 pr-4 h-12 text-gray-900"
                />
              </div>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8">
                Search Bikes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`} className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} bikes</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bikes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Bikes</h2>
            <Link href="/bikes" className="text-blue-600 hover:text-blue-700 font-medium">
              View all bikes →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBikes.map((bike) => (
              <Card key={bike.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image src={bike.image || "/placeholder.svg"} alt={bike.name} fill className="object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge variant={bike.condition === "New" ? "default" : "secondary"}>{bike.condition}</Badge>
                  </div>
                  {bike.originalPrice && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="destructive">Sale</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {bike.category}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{bike.name}</h3>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{bike.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({bike.reviews})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{bike.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">${bike.price.toLocaleString()}</span>
                        {bike.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${bike.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">by {bike.seller}</p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" asChild>
                    <Link href={`/bike/${bike.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Bike?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of sellers and reach bike enthusiasts nationwide</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Selling
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-gray-900 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">BikeMarket</h3>
              <p className="text-gray-600">The trusted marketplace for buying and selling quality bicycles.</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">For Buyers</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/search" className="hover:text-gray-900">
                    Search Bikes
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-gray-900">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/buying-guide" className="hover:text-gray-900">
                    Buying Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">For Sellers</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/sell" className="hover:text-gray-900">
                    Sell Your Bike
                  </Link>
                </li>
                <li>
                  <Link href="/seller-guide" className="hover:text-gray-900">
                    Seller Guide
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-gray-900">
                    Pricing Tips
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/help" className="hover:text-gray-900">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-gray-900">
                    Safety Tips
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 BikeMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
