import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, MapPin, Shield, MessageCircle, Heart, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for individual bike
const bikeData = {
  1: {
    id: 1,
    name: "Trek Domane SL 7",
    price: 3499,
    originalPrice: 3799,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    seller: {
      name: "Pro Bike Shop",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      reviews: 124,
      location: "San Francisco, CA",
      memberSince: "2019",
      verified: true,
    },
    category: "Road",
    condition: "New",
    brand: "Trek",
    model: "Domane SL 7",
    year: 2024,
    size: "56cm",
    color: "Matte Black",
    description:
      "The Trek Domane SL 7 is the ultimate endurance road bike, featuring Trek's IsoSpeed technology for superior comfort on long rides. This bike combines lightweight carbon construction with innovative engineering to deliver exceptional performance on any terrain.",
    specifications: {
      Frame: "OCLV 500 Carbon",
      Fork: "Domane SL carbon fork",
      Drivetrain: "Shimano Ultegra Di2",
      Wheels: "Bontrager Aeolus Elite 35",
      Tires: "Bontrager R2 Hard-Case Lite, 700x28c",
      Weight: "8.2 kg (18.1 lbs)",
    },
    features: [
      "IsoSpeed decoupler for comfort",
      "Electronic shifting",
      "Carbon fiber construction",
      "Endurance geometry",
      "Tubeless ready wheels",
    ],
  },
}

export default function BikePage({ params }: { params: { id: string } }) {
  const bike = bikeData[Number.parseInt(params.id) as keyof typeof bikeData]

  if (!bike) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              BikeMarket
            </Link>
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg overflow-hidden mb-6">
              <div className="aspect-[4/3] relative">
                <Image src={bike.images[0] || "/placeholder.svg"} alt={bike.name} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge variant={bike.condition === "New" ? "default" : "secondary"}>{bike.condition}</Badge>
                </div>
                {bike.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive">Sale</Badge>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {bike.images.map((image, index) => (
                    <div key={index} className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${bike.name} view ${index + 1}`}
                        fill
                        className="object-cover hover:opacity-75 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bike Details */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{bike.category}</Badge>
                  <Badge variant="outline">{bike.brand}</Badge>
                </div>
                <CardTitle className="text-2xl">{bike.name}</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">${bike.price.toLocaleString()}</span>
                    {bike.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${bike.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 mb-6">{bike.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-semibold">{bike.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-semibold">{bike.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-semibold">{bike.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-semibold">{bike.condition}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {bike.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(bike.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={bike.seller.avatar || "/placeholder.svg"} alt={bike.seller.name} />
                    <AvatarFallback>{bike.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{bike.seller.name}</h3>
                      {bike.seller.verified && <Shield className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{bike.seller.rating}</span>
                      <span>({bike.seller.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{bike.seller.location}</span>
                  </div>
                  <p className="text-sm text-gray-600">Member since {bike.seller.memberSince}</p>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    Contact Seller
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Safety Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Meet in a public place</li>
                  <li>• Inspect the bike thoroughly</li>
                  <li>• Verify seller identity</li>
                  <li>• Use secure payment methods</li>
                  <li>• Trust your instincts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
