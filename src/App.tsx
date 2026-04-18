
//import { Toaster } from "@/components/ui/toaster";
//import { Toaster as Sonner } from "@/components/ui/sonner";
//import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import { lazy, Suspense } from "react";
import ScrollToTopOnLocationChange from "./lib/router/scroll-to-top";
import NotFound from "./pages/NotFound";
import PageLoader from "./pages/PageLoader";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const MoviePlayer = lazy(() => import("./pages/MoviePlayer"));
const Events = lazy(() => import("./pages/Events"));
const AfterworkMovienight = lazy(() => import("./pages/events/AfterworkMovienight"));
const YdourEvent = lazy(() => import("./pages/events/YdourEvent"));
const YdourEventV2 = lazy(() => import("./pages/events/YdourEventV2"));
const FilmsDeHammamLifEvent = lazy(() => import("./pages/events/FilmsDeHammamLifEvent"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const About = lazy(() => import("./pages/About"));
const Palmares = lazy(() => import("./pages/Palmares"));
const Contact = lazy(() => import("./pages/Contact"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH || "/"}>
        <ScrollToTopOnLocationChange />
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies/:id" element={<MoviePlayer />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/events/ydour" element={<YdourEvent />} />
              <Route path="/events/ydour-v2" element={<YdourEventV2 />} />
              <Route path="/events/films-de-hammamlif" element={<FilmsDeHammamLifEvent />} />
              <Route path="/events/afterwork-movienight" element={<AfterworkMovienight />} />
              <Route path="/events" element={<Events />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/palmares" element={<Palmares />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
