"use client";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const FullCourse = () => {
  const [sessionOpenIndex, setSessionOpenIndex] = useState<number>(0);

  const toggleCourseSession = (sessionIndex: number) => {
    if (sessionOpenIndex == sessionIndex) {
      setSessionOpenIndex(-1);
      return;
    }
    setSessionOpenIndex(sessionIndex);
  };

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className="h-fit rounded-md border border-line !p-0 max-lg:flex-1 lg:!sticky lg:top-16 lg:max-w-[360px]"
    >
      {[1, 2, 3, 4].map((course, index) => {
        return (
          <div key={index}>
            <ListItemButton
              onClick={() => {
                toggleCourseSession(index);
              }}
              className="rounded-md border border-line !bg-gray-200"
            >
              <ListItemText primary={"Course " + index} />
              <IoIosArrowForward
                className={`${sessionOpenIndex == index ? "rotate-90" : "rotate-0"} transition-all`}
              />
            </ListItemButton>
            <Collapse
              in={sessionOpenIndex == index}
              timeout="auto"
              unmountOnExit
            >
              <List key={index} component="div" disablePadding>
                {[1, 2, 3, 4].map((lesson, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 border border-line p-4"
                    >
                      <Checkbox
                        checked={true}
                        className="pointer-events-none"
                      />
                      <div className="flex flex-col">
                        <p>{index + 1}. Welcome to this course</p>
                        <p className="text-sm text-grays">2.4 min</p>
                      </div>
                    </div>
                  );
                })}
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
};

export default FullCourse;
