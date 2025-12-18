import Coverage from "../../component/Home/Coverage";
import Footer from "../../component/Home/Footer";
import ForWhom from "../../component/Home/ForWhom";
import HeroSection from "../../component/Home/HeroSection";
import HowItWorks from "../../component/Home/HowItWorks";
import LatestBooks from "../../component/Home/LatestBooks";
import OurPromise from "../../component/Home/OurPromise";
import WhyChooseBookCourier from "../../component/Home/WhyChooseBookCourier";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <LatestBooks></LatestBooks>
      <Coverage />
      <WhyChooseBookCourier />
      <HowItWorks />
      <ForWhom />
      <OurPromise />
    </div>
  );
};

export default Home;
