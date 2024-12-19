import Drawer from "@/views/profile/Drawer";
import Orders from "@/views/profile/Orders";
import ProfileInfor from "@/views/profile/ProfileInfo";

const Profile = () => {
  return (
    <div className="max-w-app flex gap-8 py-20">
      <Drawer />
      {/* <ProfileInfor /> */}
      <Orders />
    </div>
  );
};

export default Profile;
