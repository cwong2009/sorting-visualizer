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
import { Grid, Slider } from "@material-ui/core";

const sampleSize = 100;

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

  useEffect(() => {
    const elements: SortElement[] = Array.from(Array(sampleSize).keys()).reduce(
      (acc: SortElement[], n: number, idx: number) => {
        const val = Math.random() * sampleSize + 1;
        //const val = 10 - n;
        acc.push({
          val,
          status: Status.NORMAL,
          key: `${idx}_${val}`,
        });
        return acc;
      },
      []
    );

    // bubble sort
    //bubbleSort(elements, action);
    heapSort(elements, action);
  }, []);

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
      return "rgba(169, 92, 232, 0.8)";
    } else if (status === Status.SELECTED) {
      return "green";
    } else if (status === Status.SWAP) {
      return "red";
    } else if (status === Status.COMPELTE) {
      return "navy";
    } else if (status === Status.LARGEST) {
      return "yellow";
    }
  };

  const onSliderChange = (event: any, newValue: number | number[]) => {
    setSortStep(newValue as number);
  };

  useEffect(() => {
    //if (action) {
    action("PLAY_HISTORY_TO", sortStep);
    //}
  }, [sortStep, action]);

  return (
    <div className="body">
      <div className="container">
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
                      height: `${(100 * val) / sampleSize}%`,
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
          <div className="slider-container">
            {sortData && sortData.history && (
              //   <Slider
              //     trackStyle={{ backgroundColor: "gray" }}
              //     handleStyle={{
              //       borderColor: "gray",
              //       height: "20px",
              //       width: "20px",
              //       marginLeft: "0px",
              //       marginTop: "-8px",
              //     }}
              //     onChange={onSliderChange}
              //     value={SortData.cur}
              //     min={0}
              //     max={SortData.history.length - 1}
              //   />
              <Grid container spacing={2}>
                <Grid item xs>
                  <Slider
                    min={0}
                    max={sortData.history.length - 1}
                    value={sortStep}
                    onChange={onSliderChange}
                  />
                </Grid>
                <Grid item>
                  <Sort />
                </Grid>
              </Grid>
            )}
          </div>
          <div onClick={handleCancelSort} className="button">
            Pause
          </div>
          <div onClick={handleResume} className="button">
            Resume
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visualizer;
