import AdminHome from "../../AdminDashboard/AdminHome/AdminHome";
const role = 'volunteer'
const VolunteerHome = () => {
  return (
    <div>
      <AdminHome role={role}/>
    </div>
  );
};

export default VolunteerHome;
