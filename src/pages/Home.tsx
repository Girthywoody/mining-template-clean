import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Shield, Leaf, Users, ChevronRight, Quote, Star, Award, TrendingUp } from "lucide-react";
import MiningNavigation from "@/components/MiningNavigation";
import Footer from "@/components/Footer";
import useScrollAnimation from "@/hooks/use-scroll-animation";
import { useTranslation } from "@/hooks/useTranslation";

const heroBg = "/Mining-hp.jpg";
const miningEquipment = "/construction-equipment.jpg";
const safetyImage = "/innovation-unique.jpg";
const environmentalImage = "/community-unique.jpg";
const innovationImage = "/innovation-unique.jpg";
const ctaBackground = "/construction-hero.jpg";

const Home = () => {
  const servicesRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const { t } = useTranslation();

  // Set theme for mining template
  useEffect(() => {
    localStorage.setItem('website-theme', 'simple');
  }, []);

  const services = [
    {
      icon: Mountain,
      title: t('templates.home.services.mineExploration.title'),
      description: t('templates.home.services.mineExploration.description'),
      image: miningEquipment,
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Shield,
      title: t('templates.home.services.safetyFirst.title'),
      description: t('templates.home.services.safetyFirst.description'),
      image: safetyImage,
      color: "from-green-500 to-green-700",
    },
    {
      icon: Leaf,
      title: t('templates.home.services.sustainableOperations.title'),
      description: t('templates.home.services.sustainableOperations.description'),
      image: environmentalImage,
      color: "from-emerald-500 to-emerald-700",
    },
  ];

  const stats = [
    { number: "25+", label: "Years Experience" },
    { number: "150+", label: "Projects Completed" },
    { number: "98%", label: "Safety Record" },
    { number: "24/7", label: "Support" },
  ];

  const testimonials = [
    {
      quote: "Sudbury Mining Corp. has been our trusted partner for over a decade. Their commitment to safety and environmental responsibility is unmatched.",
      author: "Sarah Johnson",
      position: "Project Manager, Global Resources",
      rating: 5,
    },
    {
      quote: "The innovative technology and sustainable practices implemented by Sudbury Mining Corp. have revolutionized our operations.",
      author: "Michael Chen",
      position: "Operations Director, EcoMine Ltd.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MiningNavigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Mining operations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Leading the Future of Mining
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90 text-white">
            Discover how Sudbury Mining Corp. is revolutionizing the industry with innovative technology, sustainable practices, and unwavering commitment to safety.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/services">
                <span className="inline-flex items-center gap-2">
                  Explore Our Services
                  <ChevronRight className="w-5 h-5" />
                </span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive mining solutions from exploration to rehabilitation, delivered with the highest standards of safety and environmental responsibility.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by industry leaders worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-gray-400 mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600">{testimonial.position}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Mining Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to discuss how we can help you achieve your mining goals with our proven expertise and innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">
                Get Started Today
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/services">
                View Our Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;