import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "./layouts/main.layout";
import RootLayout from "./layouts/root-layout.layout";
import ProtectedLayout from "./layouts/protected.layout";
import AdminProtectedLayout from "./layouts/admin-protected.layout";

import HomePage from "./pages/home.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import AccountPage from "./pages/account-page";
import MobilePage from "./pages/mobile.page";
import AccessoryPage from "./pages/accessory.page";
import AdminPagePage from "./pages/admin.page";
import AllDevices from "./components/AllDevices";
import AllAccessories from "./components/AllAccessories";
import ScrollToTop from "./components/ScrollToTop";

import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {

  return (
    <>
      <StrictMode>   
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            <Route element={<RootLayout />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/devices" element={<AllDevices />} />
                <Route path="/accessories" element={<AllAccessories />} />
                <Route path="/mobile/:id" element={<MobilePage />} />
                <Route path="/accessory/:id" element={<AccessoryPage/>}/>
                <Route element={<ProtectedLayout />}>
                  <Route path="/account" element={<AccountPage />} />
                  <Route element={<AdminProtectedLayout />}>
                  <Route path="/admin" element={<AdminPagePage />} />
                  </Route>
                </Route>
              </Route>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Route>
          </Routes> 
        </BrowserRouter>
        </ClerkProvider>
      </StrictMode>
    </>
  )
}

export default App