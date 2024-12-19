"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ProfileContextProps = {
  tabActive: number;
  setTabActive: Dispatch<SetStateAction<number>>;
};

type Props = {
  children: React.ReactNode;
};

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined,
);

export const ProfileProvider = (props: Props) => {
  const [tabActive, setTabActive] = useState(1);

  const value = {
    tabActive,
    setTabActive,
  };

  return (
    <ProfileContext.Provider value={value}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
