import { useContext, lazy, Suspense } from "react";

import { ThemeContext } from "./context/theme.context";
import  Navbar  from "./components/navbar/Navbar.component";
import { Route, Routes } from "react-router-dom";





const App = () => {
   const { darkMode } = useContext(ThemeContext);

   const appStyles = darkMode ? "app dark" : "app";

   return (
      <div className={appStyles}>
         <Navbar />
         <div className="wrapper">
            <Suspense fallback={""}>
               <Routes>
                  <Route path="/" element={""} />
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