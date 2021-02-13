import React from "react";

const MissionsList = props => {
  return (
    <section className="missions-list">
      {props.error ? (
        <div data-testid="errorMessage" className="error">{props.error}</div>
      ) : (
        <div>
          {props.missions.map(mission => (
            <div data-testid="mission"  className="mission" key={mission.mission_id}>
              {mission.mission_name}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MissionsList;
