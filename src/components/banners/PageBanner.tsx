import React from "react";
import Image from "next/image";

import banner from "../../../public/banner-2.png";

const PageBanner = () => {
  return (
    <div className="flex bg-gray-100 w-auto">
      <Image src={banner} alt="" />
    </div>
  );
};

export default PageBanner;
