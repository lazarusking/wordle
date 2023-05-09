import { forwardRef } from "react";
import Grid from "./Grid";

export default forwardRef(function WordleCells(props, ref) {
  return <Grid {...props} ref={ref} />;
});
