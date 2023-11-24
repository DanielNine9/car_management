import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { translate } from "../../redux/authSlice";

type Props = {};

const Translate = (props: Props) => {
  const isVietnamese = useSelector(
    (state: any) => state?.auth?.translate?.isVietnamese
  );
  const dispatch = useDispatch();


  const handleChange = () => {
    dispatch(translate());
  };

  return (
    <div>
      <div className="flex gap-4 justify-end py-4">
        {isVietnamese
          ? "Chế độ xem tiếng Việt"
          : "English view mode"}
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" onClick={handleChange}/>
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

export default Translate;
