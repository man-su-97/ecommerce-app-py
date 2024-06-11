import banner from "../assets/banner.jpeg";
import storyimg1 from "../assets/stoty-img-1.jpeg";
import storyimg2 from "../assets/story-img-2.jpeg";
import footerImg from "../assets/foot-img-3.jpeg";
import ProductSlider from "../pages/Slider";

function HomeLayout() {
  return (
    <div className="w-screen h-scrren ">
      <section className="w-full overflow-hidden">
        <img
          src={banner}
          alt="banner"
          className="h-full w-full object-cover object-center"
        />
      </section>

      <div className="flex justify-center">
        <h1 className="text-5xl my-20">About us</h1>
      </div>

      <div className="px-40 flex width-[100rem]">
        <div className="px-56 py-14">
          <p className="text-justify overflow-hidden ">
            welcome to Pleasureyourself , where we believe that sexual wellness
            is an essential part of overall well-being. Our platform is
            dedicated to providing a judgment-free space where individuals can
            explore their desires, preferences, and curiosities with confidence
            and respect. We offer a wide range of carefully curated sexual
            products designed to enhance pleasure, promote intimacy, and
            prioritize safety. But our commitment goes beyond just selling
            products; we're here to spark conversations, challenge taboos, and
            foster a culture of sexual empowerment. Whether you're seeking
            education, advice, or simply browsing for your next adventure, we're
            here to support you every step of the way. Join us on this journey
            towards a healthier, happier, and more fulfilling sexual experience.
          </p>
          <button className=" bg-[#DAACDE] text-white text-xs rounded-lg px-4 py-2 mt-10">
            SHOP NOW
          </button>
        </div>

        <img
          src={storyimg1}
          alt="story-img-1"
          className="h-[779px] w-[762px]"
        />
      </div>
      <div className="bg-[#EDC8F0] pt-48 my-40 pb-20">
        <ProductSlider />
      </div>
      <div className=" px-40 flex w-full h-full">
        <div className="w-2/5 h-full pl-20 pt-10 ">
          <img
            src={storyimg2}
            alt="story-img-2"
            className="h-[644px] w-[528px] "
          />
        </div>

        <div className=" w-3/5 h-full">
          <div className="flex flex-col items-start  w-96 space-y-10 ml-60 mt-80">
            <div className="">
              <h2 className="text-4xl ">PLEASURE FOR EVERYONE</h2>
            </div>

            <p className="text-justify">
              We believe that pleasure knows no bounds and that everyone
              deserves access to safe, satisfying experiences. Whether you
              identify as male, female, non-binary, or anywhere in between, our
              inclusive selection is here to empower you on your journey towards
              sexual fulfillment. Explore our offerings and discover the
              possibilities that await you.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="bg-[#EDC8F0] pt-48 mt-52 pb-20">
        <ProductSlider />
      </div> */}
      <div className="flex flex-col items-center justify-between ">
        <h2 className="text-3xl mt-48">CRAFTED FOR EXCELLENCE </h2>
        <p className="text-center overflow-hidden px-[40rem] py-10">
          We pride ourselves on offering adult toys of unparalleled excellence,
          ensuring the ultimate experience every time. From luxurious materials
          to expert craftsmanship, each product is curated to elevate your
          intimate moments to new heights. Explore our collection and discover
          the perfect companion for your desires
        </p>
        <img
          src={footerImg}
          className="w-[55rem] h-[40rem] object-cover object-center"
          alt="footerImage"
        />
      </div>
      <div className="flex bg-[#EDC8F0] justify-evenly items-center mt-20">
        <div className="flex flex-col py-16">
          <div className="py-10">
            <h1>SHOP</h1>
            <ul>
              <li>MEN</li>
              <li>WOMEN</li>
            </ul>
          </div>
          <div className="py-10">
            <h1>HELP</h1>
            <ul>
              <li>TERMS & CONDITIONS</li>
              <li>PRIVACY POLICY</li>
              <li>SHIPPING & RETURNS</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col py-10">
          <div className="py-10">
            <h1>Pleasuretourself</h1>
            <ul>
              <li>OUR STORY</li>
              <li>CONTACT US</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="py-10">
            <h1>CONTACT US</h1>
            <p>contactpleasureyourself@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
