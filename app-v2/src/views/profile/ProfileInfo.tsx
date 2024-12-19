"use client";
import Input from "@/components/@core/Input";
import Button from "@/packages/@ui-kit/Button";
import Checkbox from "@/packages/@ui-kit/Checkbox";
import DatePickup from "@/packages/@ui-kit/DatePickup";
import Dropdown from "@/packages/@ui-kit/Dropdown";
import ImageKit from "@/packages/@ui-kit/Image";
import ImageEditor from "@/packages/@ui-kit/Image/ImageEditor";
import Line from "@/packages/@ui-kit/Line";
import { useAuthContext } from "@/services/AuthProvider";
import { IProfileInfo, UserType } from "@/types/user.type";
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
  const [date, setDate] = useState(new Date());
  const [platform, setPlatform] = useState(platformItems[0]);
  const [time, setTime] = useState(dayjs().utc().add(30, "day"));

  const { user, updateProfile } = useAuthContext();
  const [formData, setFormData] = useState<UserType>(user);
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
      console.log(user);

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

  if (!user) return;

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
          <Input classContainer="w-full" disabled value={formData?.email} />
        </div>
        <div className="flex w-full items-center gap-8 max-sm:gap-2">
          <div className="flex min-w-[152px] max-sm:min-w-[65px] sm:justify-end">
            <p className="text-sm font-bold">Address</p>
          </div>
          <textarea
            value={formData?.address}
            onChange={(e) => onSetFormData("address", e.target.value)}
            className="mt-2 w-full rounded-lg border border-line bg-transparent p-2 text-xs outline-none hover:border-primary focus:border-primary"
          ></textarea>
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
        <div className="flex w-full gap-1 max-sm:flex-col sm:items-center sm:gap-8">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Shoppe username</p>
          </div>
          <Input
            classContainer="w-full"
            placeholder="Input your Shoppe username"
            value={formData?.social?.shopeeUsername.linkUrl}
            onChange={(e: any) => {
              onSetFormData("social.shopeeUsername.linkUrl", e.target.value);
            }}
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
            value={formData?.social?.facebook.linkUrl}
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
            value={formData?.social?.instagram.linkUrl}
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
            value={formData?.social?.tiktok.linkUrl}
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
            value={formData?.social?.youtube.linkUrl}
            onChange={(e: any) => {
              onSetFormData("social.youtube.linkUrl", e.target.value);
            }}
          />
        </div>
        <div className="flex w-full gap-1 max-sm:flex-col sm:items-center sm:gap-8">
          <div className="flex min-w-[152px] sm:justify-end">
            <p className="text-sm font-bold">Shoppe</p>
          </div>
          <Input
            classContainer="w-full"
            placeholder="Input your Shoppe profile link"
            value={formData?.social?.shopee.linkUrl}
            onChange={(e: any) => {
              onSetFormData("social.shopee.linkUrl", e.target.value);
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
