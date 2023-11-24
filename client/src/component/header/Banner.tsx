import { escape } from 'querystring';
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Product } from '../main/type';
import { getBestSellingProduct } from '../../redux/apiRequest';
import { useSelector } from 'react-redux';




const Banner = () => {
  const [slideImages, setSlideImages] = useState<string[]>([])
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );

  const getProducts = async () => {
    setTimeout(async () => {
      try {
        const res = await getBestSellingProduct()
        const imgs = res?.data
        if (imgs) {
          setSlideImages(imgs.map((img: Product) => img?.imageURL))
        }
      } catch (e) {
        console.log(e)
      }
    }, 100);

  }


  useEffect(() => {
    getProducts()
  }, [])


  return (
    <>
      <div className="relative w-full h-[700px] ">
        {
          slideImages.length ?
            <Slide duration={1000} infinite={true} pauseOnHover={true} indicators={true} arrows={false} transitionDuration={1000} cssClass='h-[700px]'>
              {slideImages.map((slideImage, index) => (
                <div key={index}>
                  <img src={slideImage} alt={slideImage} className='w-full bg-contain' />
                </div>
              ))}
            </Slide> :
            <img src="https://www.ford.com.vn/content/ford/vn/vi_vn/site-wide-content/billboard-carousels/homepage-carousel-new/jcr:content/par/billboard_670946416__1155109222/imageComponent/image.imgs.full.high.jpg" alt="" className='h-[700px] w-full' />
        }
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center z-10">
          <div>
            <h1 className="text-4xl font-semibold mb-2">{isVietnamese ? "Chào mừng đến cửa hàng của chúng tôi" : "Welcome to Our Store"}</h1>
            <p className="text-lg mb-4">{isVietnamese ? "Khám phá các sản phẩm và ưu đãi tuyệt vời" : "Discover amazing products and deals"}</p>
            {/* <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Shop Now
            </button> */}
          </div>
        </div>
      </div>

    </>
  );
};

export default Banner;
