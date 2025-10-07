import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Shield, Leaf, Users, ChevronRight, Quote, Star, Award, TrendingUp } from "lucide-react";
import ContextAwareNavigation from "@/components/ContextAwareNavigation";
import Footer from "@/components/Footer";
import EditableText from "@/components/EditableText";
import DraggableSection from "@/components/DraggableSection";
import useScrollAnimation from "@/hooks/use-scroll-animation";
import { useTranslation } from "@/hooks/useTranslation";
const heroBg = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const miningEquipment = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const safetyImage = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const environmentalImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const innovationImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const ctaBackground = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

const Home = () => {
  const servicesRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const { t } = useTranslation();

  // Set mining context when this page loads
  useEffect(() => {
    sessionStorage.setItem('miningContext', 'simple');
    // Ensure theme is set to simple for mining
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

  const testimonials = [
    {
      quote: t('templates.home.testimonials.testimonial1.quote'),
      author: "Jennifer Mitchell",
      role: t('templates.home.testimonials.testimonial1.role'),
      rating: 5,
    },
    {
      quote: t('templates.home.testimonials.testimonial2.quote'),
      author: "David Chen",
      role: t('templates.home.testimonials.testimonial2.role'),
      rating: 5,
    },
    {
      quote: t('templates.home.testimonials.testimonial3.quote'),
      author: "Sarah Thompson",
      role: t('templates.home.testimonials.testimonial3.role'),
      rating: 5,
    },
  ];

  const stats = [
    { number: "50+", label: t('templates.home.stats.yearsExperience'), icon: Award },
    { number: "1,200+", label: t('templates.home.stats.projectsCompleted'), icon: TrendingUp },
    { number: "99.8%", label: t('templates.home.stats.safetyRecord'), icon: Shield },
    { number: "15", label: t('templates.home.stats.countriesServed'), icon: Mountain },
  ];

  const features = [
    {
      title: t('templates.home.features.advancedTechnology.title'),
      description: t('templates.home.features.advancedTechnology.description'),
      icon: TrendingUp,
    },
    {
      title: t('templates.home.features.environmentalStewardship.title'),
      description: t('templates.home.features.environmentalStewardship.description'),
      icon: Leaf,
    },
    {
      title: t('templates.home.features.communityPartnership.title'),
      description: t('templates.home.features.communityPartnership.description'),
      icon: Users,
    },
    {
      title: t('templates.home.features.safetyExcellence.title'),
      description: t('templates.home.features.safetyExcellence.description'),
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ContextAwareNavigation />
      
      {/* Hero Section */}
      <DraggableSection sectionId="hero" page="home">
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
            <EditableText 
              page="home" 
              sectionId="hero" 
              fieldId="title"
              className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in"git 
              as="h1"
            >
              {t('templates.home.hero.title')}
            </EditableText>
            
            <EditableText 
              page="home" 
              sectionId="hero" 
              fieldId="subtitle"
              className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up"
              as="p"
              multiline
            >
              {t('templates.home.hero.subtitle')}
            </EditableText>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/services">
                  <span className="inline-flex items-center gap-2">
                    <EditableText 
                      page="home" 
                      sectionId="hero" 
                      fieldId="cta1"
                      as="span"
                    >
                      {t('templates.home.hero.exploreServices')}
                    </EditableText>
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/about">
                  <EditableText 
                    page="home" 
                    sectionId="hero" 
                    fieldId="cta2"
                    as="span"
                  >
                    {t('templates.home.hero.learnMore')}
                  </EditableText>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </DraggableSection>

      {/* Services Section */}
      <DraggableSection sectionId="services" page="home">
        <section ref={servicesRef} className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <EditableText 
                page="home" 
                sectionId="services" 
                fieldId="title"
                className="text-4xl font-bold mb-4 text-primary"
                as="h2"
              >
                {t('templates.home.services.title')}
              </EditableText>
              <EditableText 
                page="home" 
                sectionId="services" 
                fieldId="subtitle"
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                as="p"
                multiline
              >
                {t('templates.home.services.subtitle')}
              </EditableText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={service.title} className="overflow-hidden hover-lift group">
                  <CardContent className="p-0">
                    <div className={`h-48 bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                      <service.icon className="w-16 h-16 text-white opacity-80" />
                    </div>
                    <div className="p-6">
                      <EditableText 
                        page="home" 
                        sectionId="services" 
                        fieldId={`service-${index}-title`}
                        className="text-xl font-semibold mb-3 text-primary group-hover:text-accent transition-colors"
                        as="h3"
                      >
                        {service.title}
                      </EditableText>
                      <EditableText 
                        page="home" 
                        sectionId="services" 
                        fieldId={`service-${index}-description`}
                        className="text-gray-600 leading-relaxed"
                        as="p"
                        multiline
                      >
                        {service.description}
                      </EditableText>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </DraggableSection>

      {/* Stats Section */}
      <DraggableSection sectionId="stats" page="home">
        <section ref={statsRef} className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <EditableText 
                page="home" 
                sectionId="stats" 
                fieldId="title"
                className="text-4xl font-bold mb-4"
                as="h2"
              >
                Our Track Record
              </EditableText>
              <EditableText 
                page="home" 
                sectionId="stats" 
                fieldId="subtitle"
                className="text-xl opacity-90"
                as="p"
              >
                Numbers that speak for our commitment to mining excellence
              </EditableText>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-accent opacity-80" />
                  <EditableText 
                    page="home" 
                    sectionId="stats" 
                    fieldId={`stat-${index}-number`}
                    className="text-3xl md:text-4xl font-bold mb-2 text-accent"
                    as="div"
                  >
                    {stat.number}
                  </EditableText>
                  <EditableText 
                    page="home" 
                    sectionId="stats" 
                    fieldId={`stat-${index}-label`}
                    className="text-sm opacity-90"
                    as="p"
                  >
                    {stat.label}
                  </EditableText>
                </div>
              ))}
            </div>
          </div>
        </section>
      </DraggableSection>

      {/* Features Section */}
      <DraggableSection sectionId="features" page="home">
        <section ref={featuresRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <EditableText 
                page="home" 
                sectionId="features" 
                fieldId="title"
                className="text-4xl font-bold mb-4 text-primary"
                as="h2"
              >
                Why Choose Sudbury Mining Corp.
              </EditableText>
              <EditableText 
                page="home" 
                sectionId="features" 
                fieldId="subtitle"
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                as="p"
                multiline
              >
                Our unique combination of expertise, technology, and values sets us apart 
                in the mining industry.
              </EditableText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={feature.title} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <EditableText 
                    page="home" 
                    sectionId="features" 
                    fieldId={`feature-${index}-title`}
                    className="text-xl font-semibold mb-3 text-primary"
                    as="h3"
                  >
                    {feature.title}
                  </EditableText>
                  <EditableText 
                    page="home" 
                    sectionId="features" 
                    fieldId={`feature-${index}-description`}
                    className="text-gray-600 leading-relaxed"
                    as="p"
                    multiline
                  >
                    {feature.description}
                  </EditableText>
                </div>
              ))}
            </div>
          </div>
        </section>
      </DraggableSection>

      {/* Testimonials Section */}
      <DraggableSection sectionId="testimonials" page="home">
        <section ref={testimonialsRef} className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <EditableText 
                page="home" 
                sectionId="testimonials" 
                fieldId="title"
                className="text-4xl font-bold mb-4 text-primary"
                as="h2"
              >
                What Our Partners Say
              </EditableText>
              <EditableText 
                page="home" 
                sectionId="testimonials" 
                fieldId="subtitle"
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                as="p"
              >
                Trusted by mining industry leaders worldwide
              </EditableText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={testimonial.author} className="p-6 hover-lift">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-accent mb-4 opacity-60" />
                  <EditableText 
                    page="home" 
                    sectionId="testimonials" 
                    fieldId={`testimonial-${index}-quote`}
                    className="text-gray-700 mb-6 italic leading-relaxed"
                    as="p"
                    multiline
                  >
                    {`"${testimonial.quote}"`}
                  </EditableText>
                  <div>
                    <EditableText 
                      page="home" 
                      sectionId="testimonials" 
                      fieldId={`testimonial-${index}-author`}
                      className="font-semibold text-primary"
                      as="div"
                    >
                      {testimonial.author}
                    </EditableText>
                    <EditableText 
                      page="home" 
                      sectionId="testimonials" 
                      fieldId={`testimonial-${index}-role`}
                      className="text-sm text-gray-600"
                      as="div"
                    >
                      {testimonial.role}
                    </EditableText>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </DraggableSection>

      {/* CTA Section */}
      <DraggableSection sectionId="cta" page="home">
        <section className="relative py-20 text-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={ctaBackground}
              alt="Mining operations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            <EditableText 
              page="home" 
              sectionId="cta" 
              fieldId="title"
              className="text-4xl md:text-5xl font-bold mb-6"
              as="h2"
            >
              Ready to Partner with Mining Leaders?
            </EditableText>
            <EditableText 
              page="home" 
              sectionId="cta" 
              fieldId="subtitle"
              className="text-xl mb-8 max-w-3xl mx-auto opacity-90"
              as="p"
              multiline
            >
              Join our portfolio of successful mining operations and discover how our expertise 
              can accelerate your mining project goals.
            </EditableText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-primary">
                <Link to="/contact">
                  <span className="inline-flex items-center gap-2">
                    <EditableText 
                      page="home" 
                      sectionId="cta" 
                      fieldId="cta-button"
                      as="span"
                    >
                      Get Started Today
                    </EditableText>
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/services">
                  <EditableText 
                    page="home" 
                    sectionId="cta" 
                    fieldId="cta-secondary"
                    as="span"
                  >
                    View Our Services
                  </EditableText>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </DraggableSection>

      <Footer />
    </div>
  );
};

export default Home;
