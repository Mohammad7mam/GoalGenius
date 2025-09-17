// import { useEffect } from "react";
import Herosction from "../componant/herosction";
import MenuAppBar from "../componant/header";
import SplitSection from "../componant/split-section";
import YoutubeComponent from "../componant/BackgroundComponent";


export default function Home() {
  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     e.preventDefault(); // نمنع السكروول العادي

  //     const vh = window.innerHeight * 0.15; // 20vh
  //     const direction = Math.sign(e.deltaY); // 1 للنزول، -1 للطلوع

  //     window.scrollBy(0, direction * vh); // مباشرة بدون تأخير
  //   };

  //   // تسجيل الحدث
  //   window.addEventListener("wheel", handleScroll, { passive: false });

  //   return () => {
  //     // إزالة الحدث عند الخروج
  //     window.removeEventListener("wheel", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <MenuAppBar />
      <Herosction />
      <SplitSection />
      <YoutubeComponent />
    </>
  );
}
