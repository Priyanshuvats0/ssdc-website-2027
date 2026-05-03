import GroupLabel from "./GroupLabel";
import TeamCard from "./TeamCard";

const TeamGroup = ({ label, people, startIndex }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
    <GroupLabel label={label} />
    <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center" }}>
      {people.map((person, i) => (
        <TeamCard key={person.name} person={person} index={startIndex + i} />
      ))}
    </div>
  </div>
);

export default TeamGroup;
