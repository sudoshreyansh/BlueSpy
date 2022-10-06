import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Dashboard(props) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits dataMeta={props.data.data.metadata} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic dataError={props.data.data.appinspector} />
        </div>
      </div>
    </>
  );
}
