
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "President & Founder",
      bio: "Film studies graduate with a passion for international cinema and documentary filmmaking.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "Marcus Rodriguez",
      role: "Vice President",
      bio: "Cinephile specializing in film noir and classic Hollywood productions.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "Elena Petrov",
      role: "Events Coordinator",
      bio: "Expert in event planning with a love for independent and arthouse cinema.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "David Park",
      role: "Technical Director",
      bio: "Film technology enthusiast responsible for our screening equipment and digital projects.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=300&h=300&q=80"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shimmer">About FTCA Hammemlif</h1>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <div className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Discover our story, mission, and the passionate individuals who make our cinema club a vibrant community
          </div>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  FTCA Hammemlif was founded with a simple yet powerful vision: to create a space where 
                  cinema enthusiasts can gather, share their passion, and explore the rich tapestry of 
                  world cinema together.
                </p>
                <p>
                  We believe that film is more than entertainment—it's a powerful medium for storytelling, 
                  cultural exchange, and artistic expression. Through our screenings, discussions, and 
                  events, we aim to deepen appreciation for the cinematic arts.
                </p>
                <p>
                  Our club serves as a bridge between different film cultures, generations of movie lovers, 
                  and diverse perspectives on what makes cinema truly great.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
                alt="Cinema screening"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="mb-16 bg-muted/50 rounded-lg p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
            <p>
              Founded in 2019 by a group of film students and cinema enthusiasts, FTCA Hammemlif 
              began as a small gathering in a local community center. What started as informal 
              movie nights quickly grew into a structured organization dedicated to film appreciation.
            </p>
            <p>
              Over the years, we've screened hundreds of films, hosted renowned directors and critics, 
              and built a community of over 200 active members. Our events range from classic film 
              retrospectives to cutting-edge independent cinema showcases.
            </p>
            <p>
              Today, we're proud to be recognized as one of the premier cinema clubs in the region, 
              known for our diverse programming, engaging discussions, and commitment to fostering 
              a love of film in all its forms.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Inclusivity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We welcome film lovers of all backgrounds, experiences, and perspectives. 
                  Our community thrives on diversity and mutual respect.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We're committed to learning and sharing knowledge about cinema, 
                  from technical aspects to cultural context and artistic interpretation.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We encourage exploration of new genres, directors, and film movements, 
                  helping members expand their cinematic horizons.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-amber-600 dark:text-amber-400 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {member.bio}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
