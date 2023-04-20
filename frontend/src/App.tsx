import { useContext, lazy, Suspense } from "react";

import { ThemeContext } from "./context/theme.context";
import  Navbar  from "./components/navbar/Navbar.component";
import { Route, Routes } from "react-router-dom";

import CustomLinearProgress from "./components/custom-linear-progress/custoom-linear_progress";

// Imports with Lazy loading
const Home = lazy(() => import("./components/pages/home/Home.page"));


const App = () => {
   const { darkMode } = useContext(ThemeContext);

   const appStyles = darkMode ? "app dark" : "app";

   return (
      <div className={appStyles}>
         <Navbar />
         <div className="wrapper">
            <Suspense fallback={<CustomLinearProgress />}>
               <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/companies">
                     <Route index element={""} />
                     <Route path="add" element={""} />
                  </Route>
                  <Route path="/jobs">
                     <Route index element={""} />
                     <Route path="add" element={""} />
                  </Route>
                  <Route path="/candidates">
                     <Route index element={""} />
                     <Route path="add" element={""} />
                  </Route>
               </Routes>
            </Suspense>
         </div>
      </div>
   );
};

export default App;