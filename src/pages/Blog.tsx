
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageTitle } from '@/components/customUi/page-title';
import { Inbox } from 'lucide-react';
import ArticleModal from '@/components/customUi/article-modal';
import { useSearchParams } from 'react-router-dom'

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<null | any>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const articles = [
    {
      id: 1,
      title: "Amateur Cinema is the only free cinema",
      excerpt: "When I first joined Hammam-lif’s club back in 2013, I fell in love with everything about it: the humanity of the members, the energy, the creative ideas moving faster than the speed of sound, the rusty old clubhouse. But a couple of things bothered me: the cigarette smog, and the stigma of being an \"amateur.\" The smog is irrelevant now, but being viewed as a lesser artist just because I wasn't producing \"professional\" art was a real pain point.",
      body: `When I first joined Hammam-lif’s club back in 2013, I fell in love with everything about it: the humanity of the members, the energy, the creative ideas moving faster than the speed of sound, the rusty old clubhouse. But a couple of things bothered me: the cigarette smog, and the stigma of being an "amateur." The smog is irrelevant now, but being viewed as a lesser artist just because I wasn't producing "professional" art was a real pain point.

    My hatred for the word bothered me for years, even after taking on responsibilities in the club and actively defending the philosophy of the Tunisian Federation of Amateur Filmmakers. During debates with club friends, I often suggested we call ourselves "independents" to escape the pejorative baggage. Nobody disagreed. Some even tried justifying the name with a soft origin story: "Actually, it comes from the Latin amator, meaning lover : from amour." A nice fact, but it missed the point.

    Now, with some distance and maturity, I realize how completely wrong I was. Being an amateur is the purest form of art. It is the only real way to achieve total artistic freedom, especially in cinema.

    When you stop looking at "amateur" through the lens of societal stigma and start seeing it simply as the opposite of "commercial," the term reveals its actual power. Amateurism doesn't mean you lack commitment. It doesn't mean you produce garbage and call it experimental art. Being an amateur simply means you are free. And cinema, as the most complex, dangerous and sophisticated of the arts, demands to be free.

    You owe nothing to anyone. You write what matters to you, convince your friends to join in, and make your movie. That’s it. You aren’t owned by a producer. You don’t care if the movie turns a profit. You don't force yourself to finish a compromised cut just to get paid. You make a movie because you fiercely believe in its message. You do it just to make art and to speak your own truth.

    With this comes a strange paradox: in its truest form, an amateur film cannot be bad. Why? Because an amateur will simply abandon the project if they aren't convinced by the result. You can pull the plug at any stage: writing, casting, shooting, editing, or even the morning of the projection. You can scrap your movie simply because it no longer resonates with you. You haven't sold your artistic soul. You are free.

    And let's be clear: in its purest form, being an amateur also means you do not give a single damn about festival prizes or prestige. It also means you don’t care if the FIFAK deadline is approaching. It means rejecting the pathetic mentality of, "It’s a bummer our club didn't prepare a movie this year, let's just shoot something so we don't show up empty-handed." That isn’t amateurism. That’s acting like a childish football club supporter. In fact, it’s worse than commercial cinema. You aren't just making a movie to please a jury; you’re making a bad movie because you aren’t actually ready for cinema yet. An amateur filmmaker wants festivals because they are platforms to show and debate ideas and art, not a podium of fame and recognition.

    A real amateur filmmaker doesn't sweat over finding ideas because there is zero deadline pressure. An engaged amateur will make a good, honest movie when they are completely ready. Because they actually have something to say.

    Achieving this absolute state of amateurism isn't obvious. But when it is achieved, it creates masterpieces, artistic manifestos, and monuments.

    And bear in mind: "independent" is not a synonym for "amateur." An independent filmmaker might be free from major studios, which gives them integrity, but they lack the Right to Abandon. An independent lives off their art. They owe themselves to the future revenue their movie has to generate, which brings inevitable concessions to appease the viewers.

    A true amateur doesn't care what the viewers think. A true amateur creates art in its purest form. And art in its purest form can only speak the truth.`,
      author: "Sarah Chen",
      date: "2026-02-21",
      category: "Blog",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 2,
      title: "Club Hammam-Lif: A History of Engagement",
      excerpt: `Sixteen kilometers south of Tunis, in the heart of a seaside town, a small garage holds something extraordinary.

This town has carried many names through the centuries: Naro, in Punic times, meaning "fire" for the hot springs at the foot of Djebel Boukornine. Aquae Persianae, or "the waters of Perseus," under Roman rule. Hammam al-Jazira, then Hammam Lif through the Islamic era. Always tied to water and warmth. Always a place of flow and transformation.

And in this place of ancient metamorphosis, a modern one continues.`,
      body: `
    Sixteen kilometers south of Tunis, in the heart of a seaside town, a small garage holds something extraordinary.

    This town has carried many names through the centuries: Naro, in Punic times, meaning "fire" for the hot springs at the foot of Djebel Boukornine. Aquae Persianae, or "the waters of Perseus," under Roman rule. Hammam al-Jazira, then Hammam Lif through the Islamic era. Always tied to water and warmth. Always a place of flow and transformation.

    And in this place of ancient metamorphosis, a modern one continues.
     
    

    
    ## The Garage

    This garage is unremarkable from the outside with no marquee nor grand entrance. It was offered by the Municipality of Hammam Lif (ken andkom date zidouh). Inside, film enthusiasts gather. Not in a fancy theater or a well-funded studio, but here, in this simple space where the concrete walls have absorbed decades of voices, dreams, ideas, and productions.

    This is the Hammam-Lif Amateur Filmmakers Club. (ki ktebtha hammam-lif club hasitou 3ibara night club idk)

    For generations, this humble garage has been a creative incubator. But to call it just that would barely scratch the surface.

    Everything you find in this place was an unconditional gift from people who felt that they truly belonged here. Cameras, tripods, lights, books, furniture.. Everyone brings something. Everyone leaves their mark. This has turned the club into a dialogue between generations.

    From 1965 to this present day, layers of memories from different eras keep building up over time.

    Take a tour and you'll see it. Pictures and posters hanging on the walls. Library shelves are heavy with books, film cassettes and DVDs. Prizes and costumes are everywhere. Even the names carved into the wooden table at the center of the room. All of it makes you hear something: echoes of stories in chorus. Stories of young, curious people who passed through. Friendships were forged through collaboration. Love stories have begun over a shared passion for film. Personalities were formed. Confidence was built frame by frame. Art militants raised with purpose. Dreams conceived in late-night discussions and realized on screen.

    Lives were being shaped here, and they still are.

    ## Foundations and Legacy

    Born in the early years of the Tunisian Federation of Amateur Filmmakers (FTCA), as one of the very first clubs to emerge, Club Hammam-Lif quickly became a force far greater than its modest space suggested. Long before digital cameras and before cinema could be spoken freely, this same garage produced pioneers. Young filmmakers and cultural militants passed through its worn wooden door and carried its spirit far beyond Hammam Lif. In times when images were political acts and screening a film could be a form of resistance, the club became a space of awakening. Films born here questioned authority, exposed social fractures, and defended dignity, freedom, and collective memory.

    Salma Baccar began her journey here before directing “L’Éveil” (1967), one of the first feminist films in Tunisia, and later the landmark “Fatma 75”, a film so radical in its critique that it was prohibited by the authorities. Moudoud Lotfi, himself disabled, created “Les Invalides” (1979), a powerful protest against the absence of assistance and accessibility for disabled people. The film’s impact extended beyond the screen and contributed to legal reforms. Alongside filmmakers, technicians such as Khaled Tounsi, one of Tunisia’s first cameramen, shaped the technical language of a national cinema still in the making. In an era when cinema was inseparable from political and cultural struggle, films born in this garage challenged silence, questioned injustice, and treated the image as an act of engagement. What began as amateur practice here often became lifelong commitment.

    ## Naro Lives On

    The current generation holding the club consists of nine members, all in their twenties, all from different worlds. Artists, engineers, journalists, teachers, web developers. Different paths, one shared passion: cinema.

    This new generation carries the responsibility with “naro” in their souls: they are here to deliver, to innovate, to transform. They do not position themselves against the past, but alongside it. Aware of what has been built before them, they choose to shape what comes next.

    Every Saturday evening at 4pm, they gather. Coffee and tea cups in hand, they discuss. Sometimes things heat up, voices rise and ideas clash. Other times, you can hear their laughter from outside the garage door.

    They plan photo outings. Writing workshops. They debate movie ideas and shoot films that represent them and the club's values. Playing with lights, frames, and DIY materials, their low-budget productions have made it to audiences, captured minds, and won prizes.

    But they're not content with that.

    They launched Ydour (meaning "it moves around" or "recording" in movie sets), a new initiative built on a simple but powerful idea: bring movies to people in all regions instead of waiting for people to come to the movies. Screenings and debates now take place beyond the garage walls or during the International Festival of Amateur Film in Kelibia (FIFAK), reaching wider audiences, planting seeds in new communities.

    With the same innovative spirit, they built this website: to digitize the experience and make it accessible to all enthusiasts and curious minds, and to preserve this legacy for the generations that will come after them.

    The concrete walls still stand. The names carved in the table remain. And every Saturday at 4pm, new voices join the chorus.

    Club Hammam-Lif was built by those who came before, is held by those standing today, and waits for those who will come next.

    The cycle continues. The fire still burns. And the garage door remains open.`,
      author: "Marcus Rodriguez",
      date: "2026-02-21",
      category: "Blog",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 3,
      title: "نادي السينمائيين الهواة بحمام الأنف",
      excerpt: `منذ سنة 1964… استمرارية جيل إلى جيل

تأسّس نادي السينمائيين الهواة بحمام الأنف سنة 1964، ومنذ بداياته لم يكن النادي مجرد إطار لممارسة السينما كهواية، بل كان مشروعًا ثقافيًا متكاملًا ساهم في تنشيط الحياة الثقافية والاجتماعية بمدينة حمام الأنف، وامتد تأثيره إلى المشهد الثقافي الوطني.
 `,
      lang: 'ar',
      body: `
منذ سنة 1964… استمرارية جيل إلى جيل

تأسّس نادي السينمائيين الهواة بحمام الأنف سنة 1964، ومنذ بداياته لم يكن النادي مجرد إطار لممارسة السينما كهواية، بل كان مشروعًا ثقافيًا متكاملًا ساهم في تنشيط الحياة الثقافية والاجتماعية بمدينة حمام الأنف، وامتد تأثيره إلى المشهد الثقافي الوطني.

على امتداد عقود احتضن النادي عروضًا سينمائية، وورشات تكوينية، ونقاشات فكرية مفتوحة، فكان فضاءً للتعلّم والتجربة والحوار. وقد أسهم في تكوين أجيال من الشباب، ليس فقط في تقنيات الصورة والسينما، بل أيضًا في تنمية الشخصية، وتعزيز روح النقد البنّاء، والقدرة على التعبير وتحمل المسؤولية. لقد كان مدرسة للسينما، وفي الوقت نفسه مدرسة للحياة.

ينتمي النادي إلى الجامعة التونسية للسينمائيين الهواة، ويُعدّ من أبرز نواديها وأكثرها حضورًا وانتظامًا. وقد ساهم بفاعلية في دعم مسيرة الجامعة واستمراريتها، وفي ترسيخ مكانة حركة السينمائيين الهواة في تونس، من خلال مشاركاته المتواصلة ومبادراته الثقافية المتنوعة.

كما التزم النادي بروح الأرضية الثقافية للجامعة، القائمة على العمل الجماعي الديمقراطي والمنظم. وقد ارتكز عمله على معادلة أساسية تجمع بين التكوين والإنتاج في مسار تصاعدي، حيث يشكّل التكوين قاعدة تُفضي إلى إنتاج واعٍ ومسؤول يعكس انشغالات الناس وهمومهم.

ولم تكن أفلام النادي وإنتاجاته بعيدة عن الواقع الاجتماعي، بل انشغلت بقضايا أوسع تهم الجماهير. فكانت الصورة وسيلة لطرح الأسئلة، ومساحة للتعبير الحر في إطار فني يجمع بين الإبداع والالتزام.

وعلى امتداد أكثر من ستة عقود شكّلت استمرارية الأجيال سرّ ديمومة النادي. فكل جيل مرّ به بنى على ما أنجزه السابقون، وأضاف رؤيته وتجربته الخاصة، ثم سلّم المشعل للجيل الذي يليه. وقد وضعت الأجيال المؤسسة الأسس والقيم وروح الالتزام، وطوّرت الأجيال اللاحقة العمل وواكبت التحولات التقنية والفكرية، فكانت النتيجة مسارًا متواصلًا من العطاء والتجدد.

وفي تسعينات القرن الماضي انضم جيل جديد إلى النادي في مرحلة انتقالية هامة، فشهدت الفترة التصوير على أفلام 16 ملم، ثم النقلة إلى تقنية الفيديو. وكان جيلًا جمع بين روح السينما الكلاسيكية وتحولات التكنولوجيا الحديثة، كما ساهم بفاعلية في تنظيم المهرجانات والتظاهرات، وفي تعزيز حضور النادي داخل الجامعة وعلى الساحة الثقافية، محافظًا على روح الاستمرارية ومضيفًا ديناميكية جديدة لمسيرته.

إن قوة نادي السينمائيين الهواة بحمام الأنف تكمن في هذا التراكم الإنساني والثقافي، وفي روح التطوع والعمل الجماعي التي حافظت على استمراريته منذ سنة 1964 إلى اليوم. فهو ليس مجرد جمعية سينمائية، بل تجربة جماعية متجددة صنعتها الأجيال وتحمل مسؤوليتها الأجيال القادمة.

والنادي… مستمر. فلكل جيل دوره، ولكل مرحلة إضافتها، وما زالت الحكاية تُكتب، صورةً بعد صورة.
  `,
      author: "Elena Petrov",
      date: "2026-02-21",
      category: "Article",
      readTime: "1 min read",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Blog': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Article': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Autre 1': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Autre 2': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
      'Autre 3': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  useEffect(() => {
    const a = searchParams.get('article')
    if (a) {
      const id = parseInt(a, 10)
      const found = articles.find((it) => it.id === id)
      if (found) setSelectedArticle(found)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <PageTitle title='Blog & Articles' />
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Insights, reviews, and deep dives into the world of cinema
          </div>
        </div>

        {/* Featured Article */}{articles.length > 0 ?
          <div className="mb-12">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="aspect-[16/9] lg:aspect-auto overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge className={`w-fit mb-4 ${getCategoryColor(articles[0].category)}`}>
                    Featured • {articles[0].category}
                  </Badge>
                  <CardTitle className="text-2xl md:text-3xl mb-4">
                    <button
                      onClick={() => {
                        setSelectedArticle(articles[0])
                        setSearchParams({ article: String(articles[0].id) })
                      }}
                      className="hover:text-primary transition-colors text-left"
                    >
                      {articles[0].title}
                    </button>
                  </CardTitle>
                  <CardDescription className="text-base mb-4">
                    {articles[0].excerpt}
                  </CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>By {articles[0].author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(articles[0].date)}</span>
                    <span className="mx-2">•</span>
                    <span>{articles[0].readTime}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          : (
            <div className="text-center py-12 bg-muted/50 rounded-lg space-y-4">
              <Inbox className="w-40 h-40 mx-auto text-muted-foreground" />
              <p className="text-lg text-muted-foreground">Blog is empty currently.</p>
            body: `From storytelling to production leadership, women directors are changing how films are made and who they represent.

      This feature profiles several influential directors and examines the systemic barriers they continue to challenge.

      Resources for mentorship and emerging talent are included at the end.`,
              <p className="text-sm text-muted-foreground">Check back soon!</p>
            </div>
          )
        }

        {/* Articles Grid */}{articles.length > 1 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article) => (
              <Card
                key={article.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  setSelectedArticle(article)
                  setSearchParams({ article: String(article.id) })
                }}
                onKeyDown={(e: any) => { if (e.key === 'Enter') { setSelectedArticle(article); setSearchParams({ article: String(article.id) }) } }}
                role="button"
                tabIndex={0}
              >
                <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <Badge className={`w-fit mb-2 ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </Badge>
                  <CardTitle className="text-xl leading-tight line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-4 line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>By {article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {article.readTime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          : ""}
        {selectedArticle ? (
          <ArticleModal
            article={selectedArticle}
            open={!!selectedArticle}
            onClose={() => {
              setSelectedArticle(null)
              const sp = new URLSearchParams(searchParams.toString())
              sp.delete('article')
              setSearchParams(sp)
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
