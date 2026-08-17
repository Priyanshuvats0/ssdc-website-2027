export const teamData = {
  faculty: [
    { name: "Dr. Manoj Sachan", role: "Faculty Advisor", img: "/images/team/manoj sachan.png", initials: "MS", index: "01" },
    { name: "Er. Rahul Gautam", role: "Co-Faculty Advisor", img: "/images/team/rahul gautam.png", initials: "RG", index: "02" },
  ],
  mentors: [
    { name: "Arvind Kumar", role: "Mentor", img: "/images/team/arvind.png", initials: "AK", index: "03" },
    { name: "Marut Jindal", role: "Mentor", img: "/images/team/marut jindal.png", initials: "MJ", index: "04" },
  ],
};

export const teamTotals = {
  faculty: teamData.faculty.length,
  mentors: teamData.mentors.length,
  displayed: teamData.faculty.length + teamData.mentors.length,
  overall: 40,
};
