import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import logo from "./logo.svg";
import "./index.css";
import { useSelector, useStore } from "react-redux";
import {
  Action,
  SortDto,
  SortElement,
  SortStep,
  Status,
} from "../../model/sortElement";
import { bubbleSort } from "../../algorithm/bubbleSort";
import { heapSort } from "../../algorithm/heapSort";
import { Sort } from "@material-ui/icons";
import { Button, Grid, Slider } from "@material-ui/core";
import Div100vh from "react-div-100vh";
import classes from "*.module.css";

function Visualizer() {
  const store: any = useStore();
  const sortData: SortDto = useSelector((state: SortDto) => state);
  const [sortStep, setSortStep] = useState(0);
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  //   const action = (type: any, payload?: any) =>
  //     store.dispatch({ type, payload });

  const action = useCallback(
    (type: any, payload?: any) => store.dispatch({ type, payload }),
    [store]
  );

  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleCancelSort = () => {
    action("PAUSE_HISTORY");
  };

  const handleResume = () => {
    action("PLAY_HISTORY");
  };

  const getStatusColor = (status: Status) => {
    if (status === Status.NORMAL) {
      return "#dc63e0";
    } else if (status === Status.COMPARE) {
      return "pink";
    } else if (status === Status.SWAP) {
      return "red";
    } else if (status === Status.LARGEST) {
      return "yellow";
    } else if (status === Status.ASSIGN_VALUE) {
      return "red";
    }
  };

  const onSliderChange = (event: any, newValue: number | number[]) => {
    setSortStep(newValue as number);
  };

  useEffect(() => {
    if (action) {
      action("PLAY_HISTORY_TO", sortStep);
    }
  }, [sortStep, action]);

  return (
    <div className="body">
      <Div100vh className="container">
        <div className="content">
          {sortData &&
            sortData.elements &&
            sortData.elements.map((element: SortElement) => {
              const { val, key, status } = element;
              return (
                <div
                  key={key}
                  style={{
                    flex: " 1 0 auto",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="element"
                    style={{
                      height: `${(100 * val) / sortData.elements.length}%`,
                      flex: "1 0 auto",
                      marginLeft: "1px",
                      backgroundColor: getStatusColor(status),
                      color: "white",
                      fontSize: "1px",
                    }}
                  ></div>
                </div>
              );
            })}
        </div>
        <div className="footer">
          {sortData && sortData.history && (
            <Grid container direction="row" spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  min={0}
                  max={sortData.history.length - 1}
                  value={sortData.cur}
                  onChange={onSliderChange}
                />
              </Grid>
              <Grid item>
                <Sort />
              </Grid>
              <Grid item>
                <Button
                  onClick={handleCancelSort}
                  variant="contained"
                  color="primary"
                >
                  Pause
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleResume}
                  variant="contained"
                  color="primary"
                >
                  Play
                </Button>
              </Grid>
            </Grid>
          )}
        </div>
      </Div100vh>
    </div>
  );
}

export default Visualizer;
