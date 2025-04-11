
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import ArticleDetail from "./pages/ArticleDetail";
import AuthorProfile from "./pages/AuthorProfile";
import UserDashboard from "./pages/UserDashboard";
import ArticleEditor from "./pages/ArticleEditor";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/article/:slug" element={<ArticleDetail />} />
          <Route path="/author/:slug" element={<AuthorProfile />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/editor/:slug" element={<ArticleEditor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tag/:tag" element={<Explore />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
