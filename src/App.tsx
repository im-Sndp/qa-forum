import { useEffect, useState } from 'react'
import './App.css'
import { Appbar } from './components/Appbar'
import { Leftsidebar } from './components/Leftsidebar'
import { Home } from './pages/Home'
import axios from "axios"
import { BACKEND_URL } from './config'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import Question from './pages/Question'
import { Ask } from './pages/Ask'
import { Redirect } from './pages/Redirect'
import { AboutUs } from './pages/AboutUs'
import { Policy } from './pages/Policy'
import { ContactUs } from './pages/ContactUs'
import {ProgressBar} from './pages/Progress'

function App() {
  const [isOpen, setIsOpen] = useState(0)
  const [loading,setLoading] = useState(true);
  const [login,setLogin] = useState(false);
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
  
      if (token) {
        const headers = {
          'Authorization': token,
          'Content-Type': 'application/json'
        };
  
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/questions/islogin`, { headers });
  
          if (response.status === 200) {
            console.log("User is logged in");
            setLogin(true);
          } else {
            console.log("User is not logged in");
            setLogin(false);
          }
        } catch (error) {
          console.error("Error checking login status:", error);
          setLogin(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
  
    checkLoginStatus();
  }, []);
  
  if (loading) {
    return(
      <div>
        <div role="status" className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  
  if (!login) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/*" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  return (
    <>
      <Appbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Leftsidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<Home />} />
          <Route path="/questions/:id" element={<Question />} />
          <Route path="/questions/ask" element={<Ask />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/terms-conditions" element={<Policy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/achivements" element={<ProgressBar/>} />
          <Route path="/*" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
