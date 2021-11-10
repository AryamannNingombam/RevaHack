import React from "react";
import {
  MainPagination,
  PaginationDot,
} from "../../pages/PreLogin/prelogin.styles";
import { slideList } from "./slideList";

export const Pagination = ({ index }) => {
  return (
    <MainPagination pointerEvents="none">
      {slideList.map((_, i) => {
        return <PaginationDot key={i} index={index} i={i} />;
      })}
    </MainPagination>
  );
};
