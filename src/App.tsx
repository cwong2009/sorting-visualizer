import React, { useEffect, useReducer, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector, useStore } from "react-redux";
import {
  Action,
  SortDto,
  SortElement,
  SortStep,
  Status,
} from "./model/sortElement";
import { Button, Slider } from "antd";
import "antd/dist/antd.dark.css";
import "antd/dist/antd.compact.css";
import { bubbleSort } from "./algorithm/bubbleSort";
import { heapSort } from "./algorithm/heapSort";
import { PlayCircleFilled } from "@ant-design/icons";

const sampleSize = 100;

function App() {
  const store: any = useStore();
  const SortData: SortDto = useSelector((state: SortDto) => state);
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  const action = (type: any, payload?: any) =>
    store.dispatch({ type, payload });

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

  const onSliderChange = (e: any) => {
    action("PLAY_HISTORY_TO", e);
  };

  return (
    <div className="body">
      <div className="side-panel">
        {/* <button
          onClick={() => {
            action("INCREMENT_ASYNC");
          }}
        >
          Add
        </button> */}
        Steps:
        {SortData.history ? SortData.history.length : 0}
        <br />
        Cur: {SortData.cur}
        <br />
        Last: {SortData.last}
        <br />
        Speed: {SortData.speed}
        {SortData &&
          SortData.history &&
          SortData.history
            .slice(SortData.cur, SortData.cur + 50)
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
                      idx === 0
                        ? "log-content-items first"
                        : "log-content-items"
                    }
                  >{`${JSON.stringify(step.items)}`}</div>
                </div>
              );
            })}
      </div>
      <div className="container">
        <div className="content">
          {SortData &&
            SortData.elements &&
            SortData.elements.map((element: SortElement) => {
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
            {SortData && SortData.history && (
              <Slider
                trackStyle={{ backgroundColor: "gray" }}
                handleStyle={{
                  borderColor: "gray",
                  height: "20px",
                  width: "20px",
                  marginLeft: "0px",
                  marginTop: "-8px",
                }}
                onChange={onSliderChange}
                value={SortData.cur}
                min={0}
                max={SortData.history.length - 1}
              />
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

export default App;
