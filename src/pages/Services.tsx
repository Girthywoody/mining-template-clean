import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Shield, Leaf, Users, Wrench, Truck, BarChart3, Globe, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import useScrollAnimation from "@/hooks/use-scroll-animation";
const servicesHero = "/services-hero-mining.jpg";
const operationsImage = "/operations-unique.jpg";
const technologyImage = "/technology-unique.jpg";
const communityImage = "/community-unique.jpg";

const Services = () => {
  const processRef = useScrollAnimation();
  const benefitsRef = useScrollAnimation();

  const services = [
    {
      icon: Mountain,
      title: "Mine Exploration & Development",
      description: "Comprehensive geological surveys, resource assessment, and mine planning using advanced technology and expert analysis.",
      features: [
        "Geological mapping and surveying",
        "Resource estimation and modeling",
        "Mine design and planning",
        "Environmental impact assessment",
        "Permitting and regulatory compliance"
      ],
      image: operationsImage,
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Wrench,
      title: "Mining Operations",
      description: "Full-scale mining operations with state-of-the-art equipment, optimized processes, and continuous monitoring.",
      features: [
        "Open-pit and underground mining",
        "Equipment operation and maintenance",
        "Production optimization",
        "Quality control and assurance",
        "Real-time monitoring systems"
      ],
      image: technologyImage,
      color: "from-green-500 to-green-700",
    },
    {
      icon: Truck,
      title: "Mineral Processing",
      description: "Advanced processing facilities that extract maximum value from ore while maintaining environmental standards.",
      features: [
        "Crushing and grinding operations",
        "Separation and concentration",
        "Smelting and refining",
        "Waste management and recycling",
        "Product quality control"
      ],
      image: communityImage,
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: Shield,
      title: "Safety & Risk Management",
      description: "Comprehensive safety programs, risk assessment, and emergency response systems to protect our workforce.",
      features: [
        "Safety training and certification",
        "Risk assessment and mitigation",
        "Emergency response planning",
        "Incident investigation and analysis",
        "Continuous safety improvement"
      ],
      image: operationsImage,
      color: "from-red-500 to-red-700",
    },
    {
      icon: Leaf,
      title: "Environmental Services",
      description: "Sustainable mining practices, environmental monitoring, and rehabilitation services for responsible operations.",
      features: [
        "Environmental monitoring and reporting",
        "Water management and treatment",
        "Air quality control",
        "Land rehabilitation and restoration",
        "Biodiversity conservation"
      ],
      image: technologyImage,
      color: "from-emerald-500 to-emerald-700",
    },
    {
      icon: Users,
      title: "Community Relations",
      description: "Building strong partnerships with local communities through engagement, education, and economic development.",
      features: [
        "Community consultation and engagement",
        "Local employment and training",
        "Economic development programs",
        "Education and awareness initiatives",
        "Cultural heritage protection"
      ],
      image: communityImage,
      color: "from-orange-500 to-orange-700",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Consultation",
      description: "We begin with a comprehensive consultation to understand your needs, goals, and requirements.",
      icon: Users,
    },
    {
      step: "02",
      title: "Planning",
      description: "Our experts develop a detailed plan tailored to your specific project and objectives.",
      icon: BarChart3,
    },
    {
      step: "03",
      title: "Implementation",
      description: "We execute the plan with precision, using advanced technology and proven methodologies.",
      icon: Wrench,
    },
    {
      step: "04",
      title: "Monitoring",
      description: "Continuous monitoring and optimization ensure the best possible outcomes for your project.",
      icon: Globe,
    },
  ];

  const benefits = [
    {
      title: "Proven Expertise",
      description: "Over 50 years of experience in the mining industry with a track record of successful projects.",
      icon: CheckCircle,
    },
    {
      title: "Advanced Technology",
      description: "State-of-the-art equipment and cutting-edge technology for maximum efficiency and safety.",
      icon: CheckCircle,
    },
    {
      title: "Environmental Responsibility",
      description: "Committed to sustainable practices that protect the environment and benefit communities.",
      icon: CheckCircle,
    },
    {
      title: "Safety Excellence",
      description: "Industry-leading safety protocols and a 99.8% safety record across all operations.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={servicesHero}
            alt="Our Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            Comprehensive mining solutions that combine cutting-edge technology, 
            sustainable practices, and unwavering commitment to safety and excellence.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From exploration to rehabilitation, we provide end-to-end mining services 
              that meet the highest standards of quality, safety, and environmental responsibility.
            </p>
          </div>
          
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className={`p-3 bg-gradient-to-br ${service.color} rounded-full mr-4`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Learn More
                  </Button>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative">
                    <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 rounded-lg`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A systematic approach that ensures successful project delivery from start to finish.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <step.icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We deliver exceptional value through our expertise, technology, and commitment to excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to discuss your mining needs and discover how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/contact">Request a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
