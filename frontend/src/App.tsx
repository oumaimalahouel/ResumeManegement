import { useContext, lazy, Suspense } from "react";
import Navbar from "./components/navbar/Navbar.component";
import { ThemeContext } from "./context/theme.context";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "./components/custom-linear-progress/custoom-linear_progress";
import Jobs from "./components/pages/jobs/Jobs.page";
import AddJob from "./components/pages/jobs/AddJob.page";
import Candidates from "./components/pages/candidates/Candidates.page";
import AddCandidate from "./components/pages/candidates/AddCandidate.page";

// Imports with Lazy loading
const Home = lazy(() => import("./components/pages/home/Home.page"));
const Companies = lazy(() => import("./components/pages/CompaniesPages/Companies.page"));
const AddCompany = lazy(() => import("./components/pages/CompaniesPages/AddCompany.page"));


const App = () => {
   const { darkMode } = useContext(ThemeContext);

   const appStyles = darkMode ? "app dark" : "app";

   return (
      <div className={appStyles}>
         <Navbar />
         <div className="wrapper">
            <Suspense fallback={<CustomLinearProgress />}>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/companies">
                     <Route index element={<Companies />} />
                     <Route path="add" element={<AddCompany />} />
                  </Route>
                  <Route path="/jobs">
                     <Route index element={<Jobs/>} />
                     <Route path="add" element={<AddJob/>} />
                  </Route>
                  <Route path="/candidates">
                     <Route index element={<Candidates/>} />
                     <Route path="add" element={<AddCandidate/>} />
                  </Route>
               </Routes>
            </Suspense>
         </div>
      </div>
   );
};

export default App;