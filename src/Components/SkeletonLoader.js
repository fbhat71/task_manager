import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonLoader(props) {
  const { size = 1, ...rest } = props;
  return size > 1 ? (
    Array.from({ length: size }, (_, index) => (
      <Skeleton key={index} variant="text" {...rest} />
    ))
  ) : (
    <Skeleton variant="text" {...rest} />
  );
}
