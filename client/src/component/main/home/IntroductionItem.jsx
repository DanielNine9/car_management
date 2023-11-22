import React from "react";

const IntroductionItem = ({ data }) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <img
          src={data.img}
          alt=""
        />
        <div>
          <h3 className="text-primary_color text-2xl my-1">{data.title}</h3>
          <p className="text-xl text-gray-700">{data.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionItem;
