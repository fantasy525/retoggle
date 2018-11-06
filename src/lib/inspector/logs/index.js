import React, { useState, useEffect } from "react";
import { Activity } from "react-feather";
import styled from "styled-components";
import { haveLogs, addLogSubscriber, getLogs } from "../state-handler";
import Log from "./log";

const Container = styled.div``;

const Title = styled.div`
  font-size: 14px;

  span {
    margin-left: 5px;
  }
`;

export default function Logs() {
  const [logs, setLogs] = useState({});
  useEffect(() => {
    if (haveLogs()) {
      setLogs({ ...getLogs() });
    }

    addLogSubscriber(log => {
      setLogs(previousLogs => ({
        ...previousLogs,
        ...{ [log.name]: log }
      }));
    });
  }, []);

  return (
    <Container>
      <Title>
        <Activity size={12} />
        <span>Logs</span>
      </Title>
      {Object.values(logs).map(log => (
        <Log {...log.props} />
      ))}
    </Container>
  );
}
