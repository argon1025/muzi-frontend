import CampaignList from "../components/campaign-list/campaign-list";
import Footer from "../components/footer/footer";
import MainNavigation from "../components/main-navigation/main-navigation";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      <CampaignList />
      <Footer />
    </div>
  );
};

export default MainPage;
