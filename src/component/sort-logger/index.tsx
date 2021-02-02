import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { SortDto, SortStep } from "../../model/sortElement";

export default function SortLogger() {
  const sortData: SortDto = useSelector((state: SortDto) => state);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      sortInformation: {
        padding: "0px 5px 5px 5px",
      },
    })
  );

  const classes = useStyles();

  return (
    <List>
      <div className={classes.sortInformation}>
        Steps:
        {sortData.history ? sortData.history.length : 0}
        <br />
        Cur: {sortData.cur}
        <br />
        Speed: {Math.abs(sortData.speed)}
      </div>
      {sortData &&
        sortData.history &&
        sortData.history
          .slice(sortData.cur, sortData.cur + 50)
          .map((step: SortStep, idx: number) => {
            return (
              <div className="log-contianer" key={`${step.step}`}>
                <div
                  className={
                    idx === 0
                      ? "log-content-action first"
                      : "log-content-action"
                  }
                >{`#${step.step} ${step.action}`}</div>
                <div
                  className={
                    idx === 0 ? "log-content-items first" : "log-content-items"
                  }
                >{`${JSON.stringify(step.items)}`}</div>
              </div>
            );
          })}
    </List>
  );
}
