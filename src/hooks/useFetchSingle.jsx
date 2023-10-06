import { useEffect, useState } from "react";
import axios from "axios";

const useFetchSingle = (url) => {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [runTime, setRunTime] = useState("");

  const runTimeCalculate = (time) => {
    let minute = 0,
      hour = 0;
    if (time === undefined) {
      return "unknown";
    } else if (time > 60) {
      minute = time % 60;
      hour = Math.floor(time / 60);
      return hour + "h " + minute + "m";
    } else {
      return time + "m ";
    }
  };

  const fetchDetail = async (urls) => {
    try {
      setLoading(true);
      const response = await axios.get(urls);
      setDetail(response.data);
      setLoading(false);
      setRunTime(
        runTimeCalculate(
          response.data.runtime || response.data.episode_run_time?.[0]
        )
      );
    } catch (error) {
      console.log("error fetching details", error);
    }
  };
  useEffect(() => {
    fetchDetail(url);
  }, [url]);
  return { detail, loading, runTime };
};

export default useFetchSingle;
