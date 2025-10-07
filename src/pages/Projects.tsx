import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, MapPin, Calendar, Users, Award, TrendingUp, Globe, Shield } from "lucide-react";
import ContextAwareNavigation from "@/components/ContextAwareNavigation";
import Footer from "@/components/Footer";
import useScrollAnimation from "@/hooks/use-scroll-animation";
const projectsHero = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const project1Image = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const project2Image = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const project3Image = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const project4Image = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

const Projects = () => {
  const projectsRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const impactRef = useScrollAnimation();

  const projects = [
    {
      title: "Northern Nickel Expansion",
      location: "Sudbury, Ontario",
      year: "2023",
      status: "Completed",
      description: "A major expansion of our flagship nickel mining operation, increasing production capacity by 40% while maintaining our commitment to environmental sustainability.",
      image: project1Image,
      metrics: {
        investment: "$2.5B",
        jobs: "1,200+",
        production: "40% increase",
        safety: "Zero incidents"
      },
      features: [
        "Advanced automation systems",
        "Enhanced safety protocols",
        "Environmental monitoring",
        "Community development programs"
      ],
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Greenfield Copper Discovery",
      location: "Northern Manitoba",
      year: "2022",
      status: "In Development",
      description: "Discovery and development of a new copper deposit using innovative exploration techniques and sustainable mining practices.",
      image: project2Image,
      metrics: {
        investment: "$1.8B",
        jobs: "800+",
        production: "New operation",
        safety: "99.9% record"
      },
      features: [
        "Cutting-edge exploration technology",
        "Sustainable mining practices",
        "Local community partnerships",
        "Environmental rehabilitation plans"
      ],
      color: "from-green-500 to-green-700",
    },
    {
      title: "Underground Gold Mine",
      location: "Northern Quebec",
      year: "2021",
      status: "Operational",
      description: "Development of a state-of-the-art underground gold mining operation with advanced safety systems and environmental controls.",
      image: project3Image,
      metrics: {
        investment: "$3.2B",
        jobs: "1,500+",
        production: "500K oz/year",
        safety: "Zero incidents"
      },
      features: [
        "Advanced underground systems",
        "Real-time monitoring",
        "Smart safety systems",
        "Water treatment facilities"
      ],
      color: "from-yellow-500 to-yellow-700",
    },
    {
      title: "Platinum Group Metals",
      location: "Northern Ontario",
      year: "2024",
      status: "Planning",
      description: "Planning and development of a new platinum group metals operation with focus on innovation and environmental responsibility.",
      image: project4Image,
      metrics: {
        investment: "$4.1B",
        jobs: "2,000+",
        production: "New operation",
        safety: "Target: Zero incidents"
      },
      features: [
        "Innovative processing technology",
        "Carbon-neutral operations",
        "Indigenous partnerships",
        "Advanced safety systems"
      ],
      color: "from-purple-500 to-purple-700",
    },
  ];

  const stats = [
    {
      number: "50+",
      label: "Projects Completed",
      icon: Award,
      color: "from-blue-500 to-blue-700",
    },
    {
      number: "$15B+",
      label: "Total Investment",
      icon: TrendingUp,
      color: "from-green-500 to-green-700",
    },
    {
      number: "10,000+",
      label: "Jobs Created",
      icon: Users,
      color: "from-purple-500 to-purple-700",
    },
    {
      number: "99.8%",
      label: "Safety Record",
      icon: Shield,
      color: "from-red-500 to-red-700",
    },
  ];

  const impact = [
    {
      title: "Economic Impact",
      description: "Our projects generate significant economic benefits for local communities through direct employment, supplier contracts, and tax revenues.",
      icon: TrendingUp,
      metrics: ["$2.5B in local spending", "15,000+ indirect jobs", "40% local procurement"],
    },
    {
      title: "Environmental Stewardship",
      description: "We implement comprehensive environmental management systems and rehabilitation programs to minimize our ecological footprint.",
      icon: Globe,
      metrics: ["95% waste recycling", "Zero water discharge", "500+ hectares rehabilitated"],
    },
    {
      title: "Community Development",
      description: "We work closely with local communities to create lasting positive impact through education, training, and infrastructure development.",
      icon: Users,
      metrics: ["50+ community programs", "1,000+ training hours", "25+ local partnerships"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ContextAwareNavigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={projectsHero}
            alt="Our Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            Discover our portfolio of successful mining projects that demonstrate our commitment 
            to innovation, safety, and sustainable development.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From exploration to production, our projects showcase the full spectrum of mining excellence 
              and our commitment to responsible development.
            </p>
          </div>
          
          <div className="space-y-16">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20`} />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 bg-gradient-to-r ${project.color} text-white text-sm font-medium rounded-full`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{project.location}</span>
                      <Calendar className="h-5 w-5 text-muted-foreground ml-4" />
                      <span className="text-muted-foreground">{project.year}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-muted-foreground mb-6">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-lg font-bold text-primary">{value}</div>
                          <div className="text-sm text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <div className={`w-2 h-2 bg-gradient-to-r ${project.color} rounded-full mr-3`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                      View Project Details
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Impact</h2>
            <p className="text-xl text-muted-foreground">
              The numbers that demonstrate our commitment to excellence and positive impact.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="mb-4 flex justify-center">
                  <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section ref={impactRef} className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Beyond Mining</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our projects create lasting positive impact that extends far beyond the mine site, 
              benefiting communities, the environment, and future generations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {impact.map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-0">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <ul className="space-y-2">
                    {item.metrics.map((metric, metricIndex) => (
                      <li key={metricIndex} className="text-sm text-primary font-medium">
                        {metric}
                      </li>
                    ))}
                  </ul>
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
            Partner with Us
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join us in creating the next generation of responsible mining projects that benefit 
            communities and protect our environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Start a Project
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
