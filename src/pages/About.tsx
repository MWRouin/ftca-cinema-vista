
import { PageTitle } from '@/components/customUi/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

function TeamSection({ teamMembers }) {
  const [showAll, setShowAll] = useState(false);

  // Decide which members to show based on showAll state
  const membersToShow = showAll ? teamMembers : teamMembers.slice(0, 12);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {membersToShow.map((member, index) => (
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
              <CardDescription className="text-sm">{member.bio}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show button only if more than 12 members */}
      {teamMembers.length > 12 && (
        <div className="mt-8 text-center">
          <Button
            onClick={() => setShowAll(!showAll)}
            className="min-w-[120px]"
          >
            {showAll ? "Show Less" : "Show All"}
          </Button>
        </div>
      )}
    </section>
  );
}

export default function About() {

  const BASE = import.meta.env.BASE_URL || "/";

  const teamMembers = [
    {
      name: "Khalil Said",
      role: "President",
      bio: "Mechanical engineer with a passion for filmmaking. Passionate about photography and directing.",
      image: `${BASE}Members/khalil.jpg`
    },
    {
      name: "Safa Khiari",
      role: "General Secretary",
      bio: "French Teacher and film enthusiast, loves exploring cinema from different cultures.",
      image: `${BASE}Members/safe.jpg`
    },
    {
      name: "Seif Eddine El Arbi ",
      role: "Treasurer",
      bio: "Passionate about writing which leads to a deeper understanding of film narratives.",
      image: `${BASE}Members/seif.jpg`
    },
    {
      name: "Wadii Klaii",
      role: "Member",
      bio: "Multi-disciplinary artist with a passion for cinema. Started as a editor and now exploring directing.",
      image: `${BASE}Members/wadii.jpg`
    },
    {
      name: "Wissem Rouin",
      role: "Member",
      bio: "Web Developer and cinema enthusiast. The creator of this website.",
      image: `${BASE}Members/wissem.jpg`
    },
    {
      name: "Nour Ben Chiekh",
      role: "Member",
      bio: "Journalist and film lover. Enjoys analyzing films from a socio-political perspective.",
      image: `${BASE}Members/nour.jpg`
    },
    {
      name: "Aziz Baraketi",
      role: "Member",
      bio: "Film Buff and studied cinema. Started as a photographer and now he became a camera operator.",
      image: `${BASE}Members/aziz.jpg`
    },
    {
      name: "Hichem Gtari",
      role: "Member",
      bio: "Mechanical Engineer with a passion for filmmaking. Enjoys exploring the technical aspects of film production.",
      image: `${BASE}Members/hichem.jpg`
    },
    {
      name: "Itaf Daghsen",
      role: "Member",
      bio: "Actress and film enthusiast. Passionate about storytelling through performance.",
      image: `${BASE}Members/itaf.jpg`
    },
    {
      name: "Hihem Toumi",
      role: "Member",
      bio: "",
      image: `${BASE}Members/hichemToumi.jpg`
    },
    {
      name: "Ghassen Jemaia",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Tayeb ben ameur",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Fares Ben Khelifa",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Ghassen Ben Slema",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Halim Jerbi",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Ines Ben Halima",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Ines Siala",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Maha Ezzine",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Maher Ben Khelifa",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Mayssa Ezzine",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Mehdi Ben Farhat",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Youssef El Behi",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Zeyneb Ben Ghachem",
      role: "Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Kamel Staali",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Abdelkader Chikhawi",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Amor Sbika",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Ridha Ben Hlima",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Mourad Mahjbi",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Imen Nafti",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Rachiq Meddeb",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Mohamed Ali Bahroun",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Khaled Tounsi",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Walid Chebbi",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Yassine Bhar",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Mehdi Mokrani",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Slim Fassatoui",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Walid Mattar",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Yahya Gabous",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Mohamed Khiri",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Ridha Achour",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Chaffai Zaafouri",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Ahmed Ben Amor",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Jalel Ben Dana",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Lotfi Moudoud",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Lotfi Trabelsi",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Moncef Ben Mrad",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Said Ben Sedrine",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Ridha Baccar",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Salma Baccar",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Najet Mabouj",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Raouf Ben Mosly",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Hamadi Ghelella",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Rafik Staali",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Meher Harrazi",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Yosra Nefti",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Akrem Tliba",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Fethi Ben Slema",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    },
    {
      name: "Manel Karkour",
      role: "Honorary Member",
      bio: "",
      image: `${BASE}Members/user.png`
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <PageTitle title='Our Story' />
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
                  src={`${BASE}About/ydour_web_optimized.jpg`}
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
        <TeamSection teamMembers={teamMembers} />
      </div>
    </div>
  );
}
