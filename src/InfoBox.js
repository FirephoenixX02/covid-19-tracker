import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        {/* Title (Coronavirus cases) */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* Number of cases */}
        <h2 className="infoBox__cases">{cases}</h2>

        {/* Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
