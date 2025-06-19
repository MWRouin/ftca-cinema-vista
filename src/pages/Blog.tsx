
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "The Evolution of Cinematography in Modern Film",
      excerpt: "Exploring how technological advances have transformed the art of visual storytelling in contemporary cinema.",
      author: "Sarah Chen",
      date: "2024-03-10",
      category: "Analysis",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 2,
      title: "Breaking Down Parasite: A Masterclass in Social Commentary",
      excerpt: "An in-depth analysis of Bong Joon-ho's Oscar-winning film and its brilliant use of symbolism and metaphor.",
      author: "Marcus Rodriguez",
      date: "2024-03-05",
      category: "Review",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 3,
      title: "The Golden Age of Independent Cinema",
      excerpt: "How independent filmmakers are reshaping the industry with innovative storytelling and fresh perspectives.",
      author: "Elena Petrov",
      date: "2024-02-28",
      category: "Industry",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 4,
      title: "Film Noir: Shadows and Light in Classic Hollywood",
      excerpt: "A journey through the dark alleys and moral ambiguity of film noir's most iconic masterpieces.",
      author: "David Park",
      date: "2024-02-22",
      category: "History",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 5,
      title: "The Art of Sound Design in Horror Films",
      excerpt: "Understanding how audio elements create tension and fear in the most effective horror movies.",
      author: "Amanda Liu",
      date: "2024-02-15",
      category: "Technical",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 6,
      title: "Women Directors Reshaping Cinema",
      excerpt: "Celebrating the contributions of female filmmakers who are bringing new voices and perspectives to the screen.",
      author: "Rachel Kim",
      date: "2024-02-08",
      category: "Industry",
      readTime: "9 min read",
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
      'Analysis': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Review': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Industry': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'History': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
      'Technical': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Articles</h1>
          <p className="text-lg text-muted-foreground">
            Insights, reviews, and deep dives into the world of cinema
          </p>
        </div>

        {/* Featured Article */}
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
                  <Link to={`/blog/${articles[0].id}`} className="hover:text-primary transition-colors">
                    {articles[0].title}
                  </Link>
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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Link to={`/blog/${article.id}`}>
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
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
