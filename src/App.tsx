
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MoviePlayer from "./pages/MoviePlayer";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/ftca-cinema-vista/" element={<Home />} />
              <Route path="/ftca-cinema-vista/movies" element={<Movies />} />
              <Route path="/ftca-cinema-vista/movie/:id" element={<MoviePlayer />} />
              <Route path="/ftca-cinema-vista/events" element={<Events />} />
              <Route path="/ftca-cinema-vista/blog" element={<Blog />} />
              <Route path="/ftca-cinema-vista/about" element={<About />} />
              <Route path="/ftca-cinema-vista/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
