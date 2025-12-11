import Coverage from "../../component/Home/Coverage";
import HeroSection from "../../component/Home/HeroSection";
import LatestBooks from "../../component/Home/LatestBooks";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <LatestBooks></LatestBooks>
      <Coverage />
    </div>
  );
};

export default Home;
