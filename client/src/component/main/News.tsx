import React from "react";
import Introduction from "./home/Introduction";
import Table from "./home/Table";
import ChooseColor from "./home/ChooseColor";
import According from "./home/According";

type Props = {};

const News = (props: Props) => {
  return (
    <div>
      <Introduction />
      <Table />
      <ChooseColor />
      <According />
    </div>
  );
};

export default News;
