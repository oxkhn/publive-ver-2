"use client";
import { useProfileContext } from "@/services/ProfileProvider";
import Drawer from "@/views/profile/Drawer";
import Orders from "@/views/profile/Orders";
import ProfileInfor from "@/views/profile/ProfileInfo";

const Profile = () => {
  const { tabActive } = useProfileContext();

  return (
    <div className="max-w-app flex gap-8 py-20">
      <Drawer />
      {tabActive == 1 && <ProfileInfor />}
      {tabActive == 2 && <Orders />}
    </div>
  );
};

export default Profile;
