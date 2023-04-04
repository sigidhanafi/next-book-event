import React from "react";
import Image from "next/image";

import banner from "../../../public/banner-1.png";

const HomeBanner = () => {
  return (
    <div className="flex bg-gray-100">
      <Image src={banner} alt="" fill={false} />
    </div>
  );
};

export default HomeBanner;
