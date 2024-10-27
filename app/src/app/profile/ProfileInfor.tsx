import Button from "@/packages/@ui-kit/Button";
import Checkbox from "@/packages/@ui-kit/Checkbox";
import DatePickup from "@/packages/@ui-kit/DatePickup";
import Dropdown from "@/packages/@ui-kit/Dropdown";
import ImageKit from "@/packages/@ui-kit/Image";
import ImageEditor from "@/packages/@ui-kit/Image/ImageEditor";
import Input from "@/packages/@ui-kit/Input";
import Line from "@/packages/@ui-kit/Line";
import { useAuth } from "@/services/provider/AuthProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const platformItems = [
  {
    value: "facebook",
    title: "Facebook",
  },
  {
    value: "tiktok",
    title: "Tiktok",
  },
  {
    value: "youtube",
    title: "Youtube",
  },
  {
    value: "instagram",
    title: "Instagram",
  },
];

const ProfileInfor = () => {
  const { user, updateProfile } = useAuth();
  const [date, setDate] = useState(new Date());
  const [platform, setPlatform] = useState(platformItems[0]);
  const [time, setTime] = useState(dayjs().utc().add(30, "day"));

  const [formData, setFormData] = useState(user);
  const [formError, setFormError] = useState<string[]>([]);

  const onSetFormData = (key: string, value: string | boolean | any) => {
    setFormError([]);
    if (key.includes(".")) {
      const keys = key.split(".");

      setFormData((prevData: any) => {
        return {
          ...prevData,
          [keys[0]]: {
            ...prevData[keys[0]],
            [keys[1]]: {
              ...prevData[keys[0]][keys[1]],
              [keys[2]]: value,
            },
          },
        };
      });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
      setTime(dayjs.utc(user.dob));
    }
  }, [user]);

  const handleUpdateProfile = () => {
    try {
      updateProfile(formData);
    } catch (error) {}
  };

  const handleDateChange = (date: any) => {
    if (date) {
      setTime(date.utc());
      onSetFormData("dob", date.utc());
    }
  };

  return (
    <div className="shadow-card flex w-full flex-col rounded-lg bg-white px-6 py-8">
      <p className="text-2xl font-bold">Hồ sơ của tôi</p>
      <p className="mt-1 text-sm text-grays/75">
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </p>

      <div className="mt-8 flex flex-col gap-2">
        <div className="flex w-full items-center gap-8 max-sm:gap-2">
          <div className="flex min-w-[152px] max-sm:min-w-[65px] sm:justify-end">
            <p className="text-sm font-bold">Tên</p>
          </div>
          <Input
            classContainer="w-full"
            value={formData?.name}
            onChange={(e: any) => {
              onSetFormData("name", e.target.value);
            }}
          />
        </div>
        <div className="flex w-full items-center gap-8 max-sm:gap-2">
          <div className="flex min-w-[152px] max-sm:min-w-[65px] sm:justify-end">
            <p className="text-sm font-bold">Email</p>
          </div>
          <Input classContainer="w-full" value={formData?.email} disabled />
        </div>
        <div className="flex w-full items-center gap-8 max-sm:gap-2">
          <div className="flex min-w-[152px] max-sm:min-w-[65px] sm:justify-end">
            <p className="text-sm font-bold">Giới tính</p>
          </div>

          <div className="flex h-10 items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                onChange={(e: any) => {
                  onSetFormData("sex", true);
                }}
                isChecked={formData?.sex}
              />
              <p className="text-sm">Nam</p>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                onChange={(e: any) => {
                  onSetFormData("sex", false);
                }}
                isChecked={!formData?.sex}
              />
              <p className="text-sm">Nữ</p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-8 max-sm:gap-2">
          <div className="flex min-w-[152px] max-sm:min-w-[65px] sm:justify-end">
            <p className="text-sm font-bold">Ngày sinh</p>
          </div>
          <DatePickup
            time={time}
            handleDateChange={(e: any) => handleDateChange(e)}
          />
        </div>
      </div>

      <p className="mt-6 text-sm font-bold">
        Your social links used for promoting products
      </p>

      <div className="mt-2 flex flex-col gap-2">
        <div className="flex w-full gap-1 max-sm:flex-col sm:items-center sm:gap-8">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Facebook</p>
          </div>
          <Input
            classContainer="w-full"
            placeholder="Input your Facebook profile link"
            value={formData?.social.facebook.linkUrl}
            onChange={(e: any) => {
              onSetFormData("social.facebook.linkUrl", e.target.value);
            }}
          />
        </div>
        <div className="flex w-full gap-1 max-sm:flex-col sm:items-center sm:gap-8">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Instagram</p>
          </div>
          <Input
            classContainer="w-full"
            placeholder="Input your Instagram profile link"
            value={formData?.social.instagram.linkUrl}
            onChange={(e: any) => {
              onSetFormData("social.instagram.linkUrl", e.target.value);
            }}
          />
        </div>

        <div className="flex w-full gap-1 max-sm:flex-col sm:items-center sm:gap-8">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Tiktok</p>
          </div>
          <Input
            classContainer="w-full"
            placeholder="Input your Tiktok profile link"
            value={formData?.social.tiktok.linkUrl}
            onChange={(e: any) => {
              onSetFormData("social.tiktok.linkUrl", e.target.value);
            }}
          />
        </div>
        <div className="flex w-full gap-1 max-sm:flex-col sm:items-center sm:gap-8">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Youtube</p>
          </div>
          <Input
            classContainer="w-full"
            placeholder="Input your Youtube profile link"
            value={formData?.social.youtube.linkUrl}
            onChange={(e: any) => {
              onSetFormData("social.youtube.linkUrl", e.target.value);
            }}
          />
        </div>
        <div className="flex w-full gap-1 max-sm:flex-col sm:items-center sm:gap-8">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Website/App/Others</p>
          </div>
          <Input
            classContainer="w-full"
            placeholder="Input your Youtube profile link"
            value={formData?.social.other.linkUrl}
            onChange={(e: any) => {
              onSetFormData("social.other.linkUrl", e.target.value);
            }}
          />
        </div>
      </div>

      <p className="mt-6 text-sm font-bold">
        Shopee link used for promoting products
      </p>

      <div className="mt-2 flex flex-col gap-2">
        <div className="flex w-full gap-1 max-sm:flex-col sm:items-center sm:gap-8">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Shopee Live</p>
          </div>
          <Input
            classContainer="w-full"
            placeholder="Input your Shopee profile link"
            value={formData?.social.shopee.linkUrl}
            onChange={(e: any) => {
              onSetFormData("social.shopee.linkUrl", e.target.value);
            }}
          />
        </div>
        <div className="flex w-full gap-1 max-sm:flex-col sm:items-center sm:gap-8">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Shopee Video</p>
          </div>
          <Input
            classContainer="w-full"
            placeholder="Input your Shopee live profile link"
            value={formData?.social.shopeeLive.linkUrl}
            onChange={(e: any) => {
              onSetFormData("social.shopeeLive.linkUrl", e.target.value);
            }}
          />
        </div>
      </div>

      <Button
        title="Lưu"
        className="ml-auto mt-4 !rounded-full !px-10"
        onClick={() => {
          handleUpdateProfile();
        }}
      />
    </div>
  );
};

export default ProfileInfor;
