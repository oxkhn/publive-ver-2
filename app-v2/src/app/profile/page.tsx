import Drawer from "@/views/profile/Drawer";
import ProfileInfor from "@/views/profile/ProfileInfo";

const Profile = () => {
  return (
    <div className="max-w-app flex gap-8 py-20">
      <Drawer />
      <ProfileInfor />
    </div>
  );
};

export default Profile;
