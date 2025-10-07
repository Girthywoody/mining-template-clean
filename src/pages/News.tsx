import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowRight, Tag, Clock, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import useScrollAnimation from "@/hooks/use-scroll-animation";
const newsHero = "/news-hero-mining.jpg";
const newsDiscovery = "/news-discovery.jpg";
const newsSafety = "/news-safety.jpg";
const newsEnvironment = "/news-environment.jpg";
const newsCommunity = "/news-community.jpg";
const newsAutomation = "/news-automation.jpg";
const newsWater = "/news-water.jpg";
const newsIndigenous = "/news-indigenous.jpg";
const newsTraining = "/news-training.jpg";
const newsRenewable = "/news-renewable.jpg";

const News = () => {
  const newsRef = useScrollAnimation();
  const featuredRef = useScrollAnimation();

  const featuredNews = [
    {
      id: 1,
      title: "Sudbury Mining Co. Announces Major Nickel Discovery in Northern Ontario",
      excerpt: "A significant new nickel deposit has been discovered using advanced exploration techniques, potentially adding 20 years to our mining operations.",
      content: "Sudbury Mining Co. is pleased to announce the discovery of a major nickel deposit in Northern Ontario. The discovery, made using cutting-edge geological survey technology, represents one of the most significant finds in the region in over a decade. The deposit is estimated to contain over 2 million tonnes of nickel ore, with additional copper and platinum group metals. This discovery extends our mining operations by an estimated 20 years and will create over 500 new jobs in the region. Our team of geologists and engineers worked for over two years to identify and confirm this deposit, using advanced 3D modeling and remote sensing technology. The discovery aligns with our commitment to sustainable mining practices and will be developed using our latest environmental protection measures.",
      author: "Sarah Chen",
      date: "2024-01-15",
      category: "Discovery",
      readTime: "5 min read",
      image: newsDiscovery,
      tags: ["Nickel", "Discovery", "Northern Ontario", "Innovation"],
    },
    {
      id: 2,
      title: "New Safety Technology Reduces Workplace Incidents by 40%",
      excerpt: "Implementation of advanced safety monitoring systems has resulted in a significant reduction in workplace incidents across all operations.",
      content: "Sudbury Mining Co. has successfully implemented a new comprehensive safety technology system that has reduced workplace incidents by 40% across all operations. The system, which includes real-time monitoring, predictive analytics, and automated safety protocols, represents a $50 million investment in worker safety. The technology uses sensors, cameras, and advanced analysis to identify potential hazards before they become incidents. Workers are equipped with smart safety devices that monitor their vital signs and environmental conditions. The system has been particularly effective in underground operations, where visibility and communication can be challenging. This achievement reinforces our position as an industry leader in safety innovation and our commitment to zero-harm operations.",
      author: "David Rodriguez",
      date: "2024-01-10",
      category: "Safety",
      readTime: "4 min read",
      image: newsSafety,
      tags: ["Safety", "Technology", "Innovation", "Workplace"],
    },
    {
      id: 3,
      title: "Environmental Rehabilitation Program Receives International Recognition",
      excerpt: "Our comprehensive land rehabilitation efforts have been recognized by the International Mining Association for environmental excellence.",
      content: "Sudbury Mining Co.'s environmental rehabilitation program has received the prestigious International Mining Association Award for Environmental Excellence. The program, which has been running for over 15 years, has successfully rehabilitated over 1,000 hectares of land across our operations. The program includes soil restoration, native vegetation planting, water quality improvement, and wildlife habitat creation. Our team of environmental scientists and restoration specialists work closely with local communities and indigenous groups to ensure that rehabilitation efforts align with local ecosystems and cultural values. The program has resulted in the return of over 50 species of native plants and animals to previously mined areas. This recognition validates our commitment to environmental stewardship and sustainable mining practices.",
      author: "Emily Johnson",
      date: "2024-01-05",
      category: "Environment",
      readTime: "6 min read",
      image: newsEnvironment,
      tags: ["Environment", "Rehabilitation", "Award", "Sustainability"],
    },
  ];

  const recentNews = [
    {
      id: 4,
      title: "Community Partnership Program Launches in Sudbury",
      excerpt: "New initiative focuses on local education, training, and economic development opportunities.",
      author: "Michael Thompson",
      date: "2024-01-01",
      category: "Community",
      readTime: "3 min read",
      tags: ["Community", "Partnership", "Education", "Development"],
    },
    {
      id: 5,
      title: "Advanced Technology Systems Increase Production Efficiency",
      excerpt: "New smart systems have improved production efficiency by 25% while maintaining safety standards.",
      author: "Sarah Chen",
      date: "2023-12-28",
      category: "Technology",
      readTime: "4 min read",
      tags: ["Automation", "Efficiency", "Production", "Technology"],
    },
    {
      id: 6,
      title: "Water Treatment Facility Achieves Zero Discharge",
      excerpt: "State-of-the-art water treatment system ensures all water is recycled and reused in operations.",
      author: "Emily Johnson",
      date: "2023-12-25",
      category: "Environment",
      readTime: "3 min read",
      tags: ["Water", "Treatment", "Recycling", "Environment"],
    },
    {
      id: 7,
      title: "Indigenous Partnership Agreement Signed",
      excerpt: "New agreement strengthens relationships with local indigenous communities and ensures cultural respect.",
      author: "David Rodriguez",
      date: "2023-12-20",
      category: "Partnership",
      readTime: "4 min read",
      tags: ["Indigenous", "Partnership", "Community", "Culture"],
    },
    {
      id: 8,
      title: "Employee Training Program Recognized for Excellence",
      excerpt: "Comprehensive training program receives industry recognition for developing skilled mining professionals.",
      author: "Michael Thompson",
      date: "2023-12-15",
      category: "Training",
      readTime: "3 min read",
      tags: ["Training", "Employees", "Excellence", "Development"],
    },
    {
      id: 9,
      title: "Renewable Energy Integration Reduces Carbon Footprint",
      excerpt: "Solar and wind energy systems now provide 30% of our operational power needs.",
      author: "Sarah Chen",
      date: "2023-12-10",
      category: "Sustainability",
      readTime: "4 min read",
      tags: ["Renewable", "Energy", "Carbon", "Sustainability"],
    },
  ];

  const categories = ["All", "Discovery", "Safety", "Environment", "Technology", "Community", "Partnership", "Training", "Sustainability"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={newsHero}
            alt="News & Updates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            News & Updates
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            Stay informed about our latest developments, achievements, and industry insights.
          </p>
        </div>
      </section>

      {/* Featured News Section */}
      <section ref={featuredRef} className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In-depth coverage of our most significant developments and achievements.
            </p>
          </div>
          
          <div className="space-y-16">
            {featuredNews.map((article, index) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-full">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{article.title}</h3>
                    <p className="text-muted-foreground mb-6">{article.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>
                      <Button variant="ghost" className="text-primary hover:text-primary/80">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News Section */}
      <section ref={newsRef} className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Updates</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Latest news and updates from across our operations and industry developments.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentNews.map((article) => (
              <Card key={article.id} className="hover:shadow-xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {article.author}
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Load More News
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest news, updates, and industry insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-black"
            />
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
