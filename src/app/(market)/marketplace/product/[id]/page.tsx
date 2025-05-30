import ImageSlider from "@/components/market/marketplace/ImageSlider";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { BsBoxSeamFill } from "react-icons/bs";
import ShareButtons from "@/components/market/marketplace/ShareButtons";
import BackButton from "@/components/market/marketplace/BackButton";
import Review from "@/components/market/marketplace/Products/Review";
import DetailsPageBtn from "@/components/market/marketplace/Products/DetailsPageBtn";
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resParams = await params;
  const { id } = resParams;
  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/listings/${id}`
    );
    const {
      _id,
      productName,
      price,
      description,
      photoUrls,
      category,
      tags,
      unit,
      stock,
    } = await res.data;
    return (
      <>
        <div className="flex -ml-5  flex-col lg:flex-row gap-20 mb-24 mt-6">
          <div className="lg:w-2/5 w-full -ml-1">
            <ImageSlider data={photoUrls} />
          </div>
          <div className="lg:w-3/5 w-full">
            {/* Button*/}
            <div>
              <BackButton />
            </div>
            {/* info */}
            <div className="mt-7">
              <h2 className="text-2xl font-bold">{productName}</h2>
              {/* Rating */}
              {/* price */}
              <h4 className="text-[#3D9958] font-medium flex items-center mt-3 gap-0.5">
                {price}.00 <FaBangladeshiTakaSign />{" "}
              </h4>
              <p className="text-[#6E7673] py-6 font-nunito">{description}</p>
              <div className="flex items-center gap-1.5">
                <BsBoxSeamFill className="text-[#FF9500]" />
                <span className="text-[#6E7673] capitalize font-semibold">
                  Available:{stock} <span className="capitalize">{unit}</span>{" "}
                  in stock
                </span>
              </div>
              {/* add cart */}
              <div className="flex gap-2 my-6">
                <DetailsPageBtn id={_id} />
              </div>
              {/* other info */}
              <div className="font-nunito space-y-1.5 text-[#6E7673]">
                <p>Category: {category}</p>
                <p>
                  Tags:
                  {tags.length > 0 && (
                    <span className="uppercase pl-0.5">{tags.join(" / ")}</span>
                  )}
                </p>
                {/* share button */}
                <ShareButtons />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Review />
        </div>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return (
      <div className="p-6 h-[65vh] text-center text-red-600">
        <h1 className="text-xl font-bold">😔 Something went wrong</h1>
        <p>Failed to load the product. Please try again later.</p>
        <Link
          href="/marketplace"
          className="text-blue-500 underline mt-4 inline-block"
        >
          ← Back to Products
        </Link>
      </div>
    );
  }
}
