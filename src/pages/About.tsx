import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Shield, Leaf, Users, Award, Target, Globe, Heart } from "lucide-react";
import ContextAwareNavigation from "@/components/ContextAwareNavigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import useScrollAnimation from "@/hooks/use-scroll-animation";
import { useTranslation } from "@/hooks/useTranslation";
const aboutHero = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const leadershipImage = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const innovationImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const sustainabilityImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const safetyImage = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const michaelThompsonPortrait = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
const sarahChenPortrait = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
const davidRodriguezPortrait = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
const emilyJohnsonPortrait = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

const About = () => {
  const missionRef = useScrollAnimation();
  const valuesRef = useScrollAnimation();
  const leadershipRef = useScrollAnimation();
  const historyRef = useScrollAnimation();
  const { t } = useTranslation();

  const values = [
    {
      icon: Shield,
      title: t('templates.about.values.safetyFirst.title'),
      description: t('templates.about.values.safetyFirst.description'),
      color: "from-red-500 to-red-700",
    },
    {
      icon: Leaf,
      title: t('templates.about.values.environmentalStewardship.title'),
      description: t('templates.about.values.environmentalStewardship.description'),
      color: "from-green-500 to-green-700",
    },  
    {
      icon: Users,
      title: t('templates.about.values.communityPartnership.title'),
      description: t('templates.about.values.communityPartnership.description'),
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Award,
      title: t('templates.about.values.excellence.title'),
      description: t('templates.about.values.excellence.description'),
      color: "from-purple-500 to-purple-700",
    },
  ];

  const leadership = [
    {
      name: "Michael Thompson",
      role: "Chief Executive Officer",
      experience: "25+ years in mining operations and strategic leadership",
      image: michaelThompsonPortrait,
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      experience: "20+ years in mining technology and innovation",
      image: sarahChenPortrait,
    },
    {
      name: "David Rodriguez",
      role: "Chief Safety Officer",
      experience: "30+ years in safety management and risk assessment",
      image: davidRodriguezPortrait,
    },
    {
      name: "Emily Johnson",
      role: "Chief Sustainability Officer",
      experience: "15+ years in environmental management and sustainability",
      image: emilyJohnsonPortrait,
    },
  ];

  const milestones = [
    {
      year: "1974",
      title: "Company Founded",
      description: "Sudbury Mining Corp. was established with a vision to revolutionize mining practices.",
    },
    {
      year: "1985",
      title: "First Major Discovery",
      description: "Discovered significant nickel deposits using innovative exploration techniques.",
    },
    {
      year: "1995",
      title: "Safety Excellence Award",
      description: "Received industry recognition for outstanding safety performance and protocols.",
    },
    {
      year: "2005",
      title: "Environmental Certification",
      description: "Achieved ISO 14001 certification for environmental management systems.",
    },
    {
      year: "2015",
      title: "Technology Innovation",
      description: "Launched advanced digital mining systems and automation technologies.",
    },
    {
      year: "2024",
      title: "50th Anniversary",
      description: "Celebrating five decades of excellence, innovation, and community partnership.",
    },
  ];

  return (
    <div className="min-h-screen bg-background snap-container">
      <ScrollProgress />
      <ContextAwareNavigation />
      
      {/* Hero Section */}
      <section id="hero" className="snap-section relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={aboutHero}
            alt="About Sudbury Mining Corp."
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            About Sudbury Mining Corp.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            For over five decades, we've been at the forefront of mining innovation, 
            combining cutting-edge technology with unwavering commitment to safety and sustainability.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" ref={missionRef} className="snap-section py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To lead the mining industry through innovative technology, sustainable practices, 
                and unwavering commitment to safety while creating lasting value for our stakeholders 
                and the communities we serve.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We believe that responsible mining can coexist with environmental protection and 
                community development, and we're committed to proving this through our actions every day.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Learn About Our Values
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={leadershipImage}
                  alt="Our mission in action"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" ref={valuesRef} className="snap-section py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These fundamental principles guide every decision we make and every action we take.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 overflow-hidden">
                <div className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className={`p-4 bg-gradient-to-br ${value.color} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" ref={leadershipRef} className="snap-section py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our experienced leadership team brings decades of industry expertise and a shared vision for the future of mining.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{leader.name}</h3>
                  <p className="text-primary font-medium mb-2">{leader.role}</p>
                  <p className="text-sm text-muted-foreground">{leader.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" ref={historyRef} className="snap-section py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Five decades of innovation, growth, and commitment to excellence in the mining industry.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20"></div>
            <div className="space-u-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="p-6 hover:shadow-xl transition-all duration-500 hover:scale-105">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="snap-section py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Journey
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of a company that's shaping the future of responsible mining.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              View Career Opportunities
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
