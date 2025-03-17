import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// context 
import DataProvider from './context/DataProvider/DataProvider';

// landing page 
import Landing from './pages/landing';

// Homepages 
import ChatApp from './pages/home-pages/chat-app';
import KidsCourse from './pages/home-pages/kids-course';
import AnalyticsPage from './pages/home-pages/analytics';
import BusinessDigital from './pages/home-pages/business-digital';
import BusinessExpense from './pages/home-pages/business-expense';
import BusinessTracker from './pages/home-pages/business-tracker';
import BusinessSolution from './pages/home-pages/business-solution';
import CollaborationTool from './pages/home-pages/collaboration-tool';
import CryptoProfile from './pages/home-pages/crypto-profile';
import BusinessManagement from './pages/home-pages/business-management';
import BusinessSubscription from './pages/home-pages/business-subscription';
import DataDriven from './pages/home-pages/data-driven';
import LanguageLearning from './pages/home-pages/language-learning';


// inner pages 
import Terms from './pages/inner-pages/terms';
import About from './pages/inner-pages/about';
import Blogs from './pages/inner-pages/blogs';
import Pricing from './pages/inner-pages/pricing';
import Feature from './pages/inner-pages/features';
import Contact from './pages/inner-pages/contact';
import HelpCenter from './pages/inner-pages/help-center';
import BlogDetails from './pages/inner-pages/blog-details';
import AboutSolution from './pages/inner-pages/about-solution';
import PricingSolution from './pages/inner-pages/pricing-solution';
import ContactSolution from './pages/inner-pages/contact-solution';
import FeaturesSolution from './pages/inner-pages/features-solution';
import HelpCenterDetails from './pages/inner-pages/help-center-details';
import CustomerTestimonial from './pages/inner-pages/customer-testimonial';
import Career from './pages/inner-pages/career';
import CareerDetails from './pages/inner-pages/career-details';

// miscellaneous pages
import NotFound from './pages/404';
import Login from './pages/auth/login';
import Signup from './pages/auth/sign-up';
import ResetPassword from './pages/auth/reset-password';
import NioScrollToTop from './components/NioScrollToTop/NioScrollToTop';
import FarmerForm from './components/FarmerPages/FarmerForm';
import VerifCode from './pages/auth/verif_code';
import ProfilePage from './components/Profile';
import Answers from './pages/auth/Answers/answers';
import VerifPassword from './pages/auth/verif-password/verif';
import ForgotPassword from './pages/auth/forgot-password';
import SideNavBar from './components/SideNavBar/SideNavBar';
import ResponsiveTable from './components/SideNavBar/responsivetable';
import MapSelector from './components/weather/carte-google';
import MapWithComments from './components/FarmerDashboard/LeafletCard/LeafletCard';
import ParcelInfo from './components/FarmerDashboard/ParcelInfo/ParcelInfo';
import ShapeViewer from './components/FarmerDashboard/ParcelInfo/ShapeViewer';
import Observations from './components/FarmerDashboard/ParcelInfo/Observations';
import AddObservation from './components/FarmerDashboard/ParcelInfo/AddObservation';
import ChartComponent from './components/FarmerDashboard/charte/charte';
import UpdateFarmerProfile from './components/FarmerDashboard/farmerprofile';
import GestionUser from './components/AdminBackoffice/GestionUser';

function AppRoutes() {

  return (
    <Routes>

      {/* landing page */}
      <Route path="/" element={<Landing />} />

      {/* Homepages */}
      <Route path="/index-analytics" element={<AnalyticsPage />} />
      <Route path="/index-kids-course" element={<KidsCourse />} />
      <Route path="/index-collaboration-tool" element={<CollaborationTool />} />
      <Route path="/index-bs-expense-tracker" element={<BusinessTracker />} />
      <Route path="/index-live-chat-app" element={<ChatApp />} />
      <Route path="/index-bs-solution" element={<BusinessSolution />} />
      <Route path="/index-saas" element={<BusinessExpense />} />
      <Route path="/index-bs-digital" element={<BusinessDigital />} />
      <Route path="/index-crypto-profile" element={<CryptoProfile />} />
      <Route path="/index-bs-management" element={<BusinessManagement />} />
      <Route path="/index-bs-subscription" element={<BusinessSubscription />} />
      <Route path="/index-data-driven" element={<DataDriven />} />
      <Route path="/index-language-learning" element={<LanguageLearning />} />

      {/* inner page  */}
      <Route path='/about' element={<About />} />
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/features' element={<Feature />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/contact-us' element={<Contact />} />
      <Route path='/help-center' element={<HelpCenter />} />
      <Route path='/blog-details' element={<BlogDetails />} />
      <Route path='/terms-and-conditions' element={<Terms />} />
      <Route path='/about-solution' element={<AboutSolution />} />
      <Route path='/features-solution' element={<FeaturesSolution />} />
      <Route path='/pricing-solution' element={<PricingSolution />} />
      <Route path='/contact-us-solution' element={<ContactSolution />} />
      <Route path='/help-center-details' element={<HelpCenterDetails />} />
      <Route path='/customer-testimonials' element={<CustomerTestimonial />} />
      <Route path='/careers' element={<Career />} />
      <Route path='/career-details' element={<CareerDetails />} />
      <Route path='/Profile' element={<ProfilePage />} />

      {/* miscellaneous pages */}
      <Route path="*" element={<NotFound />} />
      <Route path="/404" element={<NotFound />} />
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/sign-up' element={<Signup />} />




      <Route path='/auth/reset-password' element={<ResetPassword />} />   ///////e5er wa7da
      <Route path='/auth/forgot-password' element={<ForgotPassword />} />  //////thenya
      <Route path='/auth/verif-password' element={<VerifPassword />} />     //////theltha
      <Route path='/auth/answers' element={<Answers />} />            //////loula






      <Route path="/FarmerForm" element={<FarmerForm />} />
      <Route path='/auth/code-forget' element={<VerifCode />} />


      <Route path='/sidebar' element={<SideNavBar />} />
      <Route path='/table' element={<ResponsiveTable />} />
      <Route path='/MapSelector' element={<MapSelector />} />
      <Route path='/Leaflet' element={<MapWithComments />} />
      <Route path='/parcelinfo' element={<ParcelInfo />} />
      <Route path='/shapeviewr' element={<ShapeViewer />} />
      <Route path="/observations/:shapeId" element={<Observations />} />
      <Route path="/observations/add/:shapeId" element={<AddObservation />} />


      <Route path='/charte' element={<ChartComponent />} />

      <Route path='/UpdateFarmerProfile' element={<UpdateFarmerProfile />} />


      <Route path='/gestionUser' element={<GestionUser />} />


    </Routes>
  );
}


function App() {

  useEffect(() => {
    document.body.classList.add('nk-body');
  }, []);

  return (
    <DataProvider>
      <BrowserRouter>
        <NioScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </DataProvider>
  );
}



export default App;
