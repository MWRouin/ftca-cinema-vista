
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {

  const BASE = import.meta.env.BASE_URL || "/";

  const teamMembers = [
    {
      name: "Khalil Said",
      role: "President",
      bio: "Mechanical engineer with a passion for filmmaking. Passionate about photography and directing.",
      image: `${BASE}public/Members/khalil.jpg`
    },
    {
      name: "Safe Khiari",
      role: "General Secretary",
      bio: "French Teacher and film enthusiast, loves exploring cinema from different cultures.",
      image: `${BASE}public/Members/safe.jpg`
    },
    {
      name: "Seif Eddine El Arbi ",
      role: "Treasurer",
      bio: "Passionate about writing which leads to a deeper understanding of film narratives.",
      image: `${BASE}public/Members/seif.jpg`
    },
    {
      name: "Wadii Klaii",
      role: "Member",
      bio: "Multi-disciplinary artist with a passion for cinema. Started as a editor and now exploring directing.",
      image: `${BASE}public/Members/wadii.jpg`
    },
    {
      name: "Wissem Rouine",
      role: "Member",
      bio: "Web Developer and cinema enthusiast. The creator of this website.",
      image: `${BASE}public/Members/wissem.jpg`
    },
    {
      name: "Nour Ben Chiekh",
      role: "Member",
      bio: "Journalist and film lover. Enjoys analyzing films from a socio-political perspective.",
      image: `${BASE}public/Members/nour.jpg`
    },
    {
      name: "Aziz Baraketi",
      role: "Member",
      bio: "Film Buff and studied cinema. Started as a photographer and now he became a camera operator.",
      image: `${BASE}public/Members/aziz.jpg`
    },
    {
      name: "Hichem Gtari",
      role: "Member",
      bio: "Mechanical Engineer with a passion for filmmaking. Enjoys exploring the technical aspects of film production.",
      image: `${BASE}public/Members/hichem.jpg`
    },
    {
      name: "Itaf Daghsen",
      role: "Member",
      bio: "Actress and film enthusiast. Passionate about storytelling through performance.",
      image: `${BASE}public/Members/itaf.jpg`
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shimmer">Our Story</h1>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          {/* <div className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Discover our story, mission, and the passionate individuals who make our cinema club a vibrant community
          </div> */}
        </div>

        {/* History Section */}
        <section className="mb-16">
          {/* <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2> */}
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
            <p>
              Between sea and mountains, Hammam Lif was once a cultural destination.
            </p>

            <p>
              In 1964, our cinema club was born. We emerged during the golden era of Tunisia's ciné-club movement,
              aiming to promote cinematographic culture in Tunisia.
              However, things began to slowly fade: cinemas closed one by one, and film posters started to yellow.
            </p>

            <p>
              Taking place in the heart of Hammam Lif, our space brought together high school students and university scholars.
              Cinema enthusiasts came from different ages and with different backgrounds and political views,
              all united by their passion.
            </p>

            <p>
              From one generation to another, our club has created remarkable and impactful works:<br />
              short films, documentaries, photographs, and screenplays that have won prizes and
              sparked social, cultural, and political change.
            </p>

            <p>
              Today, those who remember look back with pride, as we continue forward with one driving motive:
              to be a voice for those who have none.
            </p>

          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16 bg-muted/50 rounded-lg p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We produce to reflect social, cultural, and political realities. Our mission is to deliver people's concerns, shed light on difficult truths, and question what needs to be questioned.
                </p>
                <div className="mt-6 mb-2 text-foreground font-medium">We do this through:</div>
                <ul className="list-disc pl-6 marker:text-primary/70 space-y-1">
                  <li>Screenings</li>
                  <li>Debates</li>
                  <li>Workshops</li>
                </ul>
                <p>
                  We attract and nurture new talents and promote Tunisian amateur cinema. As proud members of the FTCA, we organize cultural events, support human rights causes, defend free expression, and pass our filmmaking passion to the next generation.
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={`${BASE}About/ydour.jpg`}
                  alt="Ydour event – cinema screening"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-muted-foreground mt-2 text-center">
                Captured during the “Ydour” event.
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Unity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We believe in the power of coming together sharing ideas, efforts, and values as one.
                  Unity is the flame of our community, it drives collaboration, fairness, and most importantly, a sense of belonging within us.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Amateurism</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We embrace amateurism as our form of freedom.
                  Our films are born from purpose and conviction, not political or commercial interests.<br />
                  Cinema is our tool of expression.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Social Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Art and action go hand in hand.
                  Our films go beyond entertainment and aesthetics, they exist to question, to reflect, and to move.
                  We use cinema as a mean to address social issues, raise awareness, and give voice to what often goes unheard.
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
