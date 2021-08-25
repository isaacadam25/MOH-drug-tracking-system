import React, { useState, useEffect } from "react";
import { getAuthToken } from "../services/authService";
import {
  totalRegistered,
  totalUsedDrugs,
  totalLostDrugs,
} from "../services/distribution.service";
import Content from "../layout/Content";
import UseCard from "../components/UseCard";

const Dashboard = (props) => {
  const [totalReg, setTotalReg] = useState(0);
  const [totalUsed, setTotalUsed] = useState(0);
  const [totalLost, setTotalLost] = useState(0);

  const getUsed = async () => {
    try {
      const { data } = await totalUsedDrugs(getAuthToken());
      setTotalUsed(data.amount);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getReg = async () => {
    try {
      const { data } = await totalRegistered(getAuthToken());
      setTotalReg(data.amount);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getLost = async () => {
    try {
      const { data } = await totalLostDrugs(getAuthToken());
      setTotalLost(data.amount);
    } catch (ex) {
      console.log(ex);
    }
  };

  const { profile } = props;

  useEffect(() => {
    getUsed();
    getReg();
    getLost();
  }, []);

  return (
    <Content title="Dashboard" profile={profile}>
      <div className="row justify-content-center">
        <UseCard url="/" title={totalUsed} size={4} text="Total Used Drugs" />
        <UseCard url="/" title={totalLost} size={4} text="Total Lost dDrugs" />
        <UseCard
          url="/"
          title={totalReg}
          size={4}
          text="Total Registered Batches"
        />
      </div>
    </Content>
  );
};

export default Dashboard;
