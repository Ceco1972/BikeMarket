"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Star, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for all bikes
const allBikes = [
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
    brand: "Trek",
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
    brand: "Specialized",
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
    brand: "Cannondale",
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
    brand: "Giant",
  },
  {
    id: 5,
    name: "Santa Cruz Hightower",
    price: 3899,
    image: "/placeholder.svg?height=300&width=400",
    seller: "Trail Riders",
    location: "Boulder, CO",
    rating: 4.8,
    reviews: 92,
    category: "Mountain",
    condition: "Used - Good",
    brand: "Santa Cruz",
  },
  {
    id: 6,
    name: "Rad Power RadCity 5",
    price: 1699,
    image: "/placeholder.svg?height=300&width=400",
    seller: "E-Bike Central",
    location: "Seattle, WA",
    rating: 4.6,
    reviews: 203,
    category: "Electric",
    condition: "New",
    brand: "Rad Power",
  },
]

export default function BikesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000])

  const categories = ["Road", "Mountain", "Hybrid", "Electric", "BMX", "Cruiser"]
  const brands = ["Trek", "Specialized", "Giant", "Cannondale", "Santa Cruz", "Rad Power"]
  const conditions = ["New", "Used - Excellent", "Used - Good", "Used - Fair"]

  const filteredBikes = allBikes.filter((bike) => {
    const matchesSearch =
      bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bike.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(bike.category)
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(bike.brand)
    const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(bike.condition)
    const matchesPrice = bike.price >= priceRange[0] && bike.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesBrand && matchesCondition && matchesPrice
  })

  const sortedBikes = [...filteredBikes].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={100} className="mb-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category])
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== category))
                  }
                }}
              />
              <Label htmlFor={`category-${category}`} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand])
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                  }
                }}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Condition</h3>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={`condition-${condition}`}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedConditions([...selectedConditions, condition])
                  } else {
                    setSelectedConditions(selectedConditions.filter((c) => c !== condition))
                  }
                }}
              />
              <Label htmlFor={`condition-${condition}`} className="text-sm">
                {condition}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              BikeMarket
            </Link>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search bikes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </div>

            <nav className="flex items-center space-x-4">
              <Link href="/sell" className="text-gray-700 hover:text-gray-900">
                Sell
              </Link>
              <Button>Post Listing</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Bikes</h1>
            <p className="text-gray-600">{sortedBikes.length} bikes found</p>
          </div>

          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden bg-transparent">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your search results</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <Card className="p-6">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>
              <FilterContent />
            </Card>
          </div>

          {/* Bike Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedBikes.map((bike) => (
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

            {sortedBikes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No bikes found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
