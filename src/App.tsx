import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import { lazy, Suspense } from "react";
import ScrollToTopOnLocationChange from "./lib/router/scroll-to-top";
import NotFound from "./views/NotFound";
import PageLoader from "./views/PageLoader";
import { LocaleScope, LocaleRedirect } from "./i18n/locale";
import "./i18n";

const Home = lazy(() => import("./views/Home"));
const Movies = lazy(() => import("./views/Movies"));
const MoviePlayer = lazy(() => import("./views/MoviePlayer"));
const Events = lazy(() => import("./views/Events"));
const AfterworkMovienight = lazy(() => import("./views/events/AfterworkMovienight"));
const YdourEvent = lazy(() => import("./views/events/YdourEvent"));
const YdourEventV2 = lazy(() => import("./views/events/YdourEventV2"));
const FilmsDeHammamLifEvent = lazy(() => import("./views/events/FilmsDeHammamLifEvent"));
const Blog = lazy(() => import("./views/Blog"));
const BlogArticle = lazy(() => import("./views/BlogArticle"));
const About = lazy(() => import("./views/About"));
const Person = lazy(() => import("./views/Person"));
const Palmares = lazy(() => import("./views/Palmares"));
const Contact = lazy(() => import("./views/Contact"));

const queryClient = new QueryClient();

// Page routes, defined once with locale-neutral relative paths. Mounted under
// each "/<locale>" branch below so the same table serves every locale.
const PageRoutes = () => (
  <Layout>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="movies/:id" element={<MoviePlayer />} />
        <Route path="movies" element={<Movies />} />
        <Route path="events/ydour" element={<YdourEvent />} />
        <Route path="events/ydour-v2" element={<YdourEventV2 />} />
        <Route path="events/films-de-hammamlif" element={<FilmsDeHammamLifEvent />} />
        <Route path="events/afterwork-movienight" element={<AfterworkMovienight />} />
        <Route path="events" element={<Events />} />
        <Route path="blog/:slug" element={<BlogArticle />} />
        <Route path="blog" element={<Blog />} />
        <Route path="about" element={<About />} />
        <Route path="people/:id" element={<Person />} />
        <Route path="palmares" element={<Palmares />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Layout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH || "/"}>
        <ScrollToTopOnLocationChange />
        <Routes>
          <Route
            path="/en/*"
            element={
              <LocaleScope locale="en">
                <PageRoutes />
              </LocaleScope>
            }
          />
          <Route
            path="/fr/*"
            element={
              <LocaleScope locale="fr">
                <PageRoutes />
              </LocaleScope>
            }
          />
          {/* "/" and any non-locale path redirect to the resolved locale. */}
          <Route path="*" element={<LocaleRedirect />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
