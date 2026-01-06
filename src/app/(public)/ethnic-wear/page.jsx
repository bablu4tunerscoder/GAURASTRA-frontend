import Image from "next/image";
import OccasionBased from "./OccasionBased";

export default function EthnicwearPage() {

  const occasionBasedWears = [
    {
      title: "Wedding Wear",
      image: "/assets/womenethnic01.png",
      url: "/women/lehenga"
    },
    {
      title: "Festive Wear",
      image: "/assets/EthnicSection01.png",
      url: "/women/kurti"
    },
    {
      title: "Party Wear",
      image: "/assets/EthnicSection01.png",
      url: "/women/saree"
    },
    {
      title: "Daily Wear",
      image: "/assets/EthnicSection01.png",
      url: "/women/dupatta"
    },
    {
      title: "Office Wear",
      image: "/assets/EthnicSection01.png",
      url: "/women/lehenga"
    },
  ]

  return (
    <section>
      <Image
        src="/assets/ethnicBannerPage.png"
        alt="ethnic Page"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      {/* main content */}

      {/*  */}
      <OccasionBased data={occasionBasedWears} />


    </section>
  );
}
