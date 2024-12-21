"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import TiktokLogo from "@/assets/images/tiktok_icon.svg";
import VideoLogo from "@/assets/images/video_library.svg";
import ImageLogo from "@/assets/images/broken_image.svg";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import Input from "@/components/@core/Input";
import { IoSearchOutline } from "react-icons/io5";
import DropdownHor from "@/packages/@ui-kit/Dropdown3";
import DropdownItem from "@/packages/@ui-kit/Dropdown3/DropdownItem";
import { useContentContext } from "@/services/ContentProvider";
import { filterDate } from "./data";
import Button from "@/packages/@ui-kit/Button2";

export const FilterTabBrand = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterDateActive, setFilterDateActive] = useState(filterDate[0]);

  const { updateFilterTiktok, brands } = useContentContext();

  const [bwBrands, setBwBrands] = useState<string[]>([]);
  const [pcBrands, setPcBrands] = useState<string[]>([]);
  const [hcBrands, setHcBrands] = useState<string[]>([]);

  const [selectedBWBrand, setSelectedBWBrand] = useState<string>("");
  const [selectedPCBrand, setSelectedPCBrand] = useState<string>("");
  const [selectedHCBrand, setSelectedHCBrand] = useState<string>("");

  const [buSelected, setBuSelected] = useState<string>("");
  const [brandSelected, setBrandSelected] = useState<string>("");

  useEffect(() => {
    if (Array.isArray(brands)) {
      const pc = brands.find((item) => item.bu === "PC");
      const hc = brands.find((item) => item.bu === "HC");
      const bw = brands.find((item) => item.bu === "BW");

      if (pc && Array.isArray(pc.brand)) {
        setPcBrands(pc.brand);
      }
      if (hc && Array.isArray(hc.brand)) {
        setHcBrands(hc.brand);
      }
      if (bw && Array.isArray(bw.brand)) {
        setBwBrands(bw.brand);
      }
    }
  }, [brands]);

  useEffect(() => {
    const handler = setTimeout(() => {
      updateFilterTiktok("title", searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  return (
    <div className="sticky top-20">
      <div className="z-10 flex justify-between gap-4 border-b py-2">
        <div className="flex w-full items-center justify-between gap-4">
          {/* <div className="flex gap-2">
            <div className="grid cursor-pointer place-items-center p-1">
              <Image src={VideoLogo} alt="" className="h-5" />
            </div>
            <div className="grid cursor-pointer place-items-center p-1">
              <Image src={ImageLogo} alt="" className="h-5" />
            </div>
          </div> */}

          {/* <div className="h-6 w-[1px] bg-grays/15"></div> */}

          <div className="item-start flex gap-4 py-2">
            {/* <div className="flex items-center gap-2">
              <p className="text-sm">Thời gian</p>
              <DropdownHor
                defaultValue={filterDateActive}
                onSelected={(index) => {
                  updateFilterTiktok("createAt", filterDate[index].value);
                  setFilterDateActive(filterDate[index]);
                }}
                classElementCustom=""
                className="!h-6"
              >
                {filterDate.map((_, i) => (
                  <DropdownItem key={i} title={_.title} />
                ))}
              </DropdownHor>
            </div> */}
            {/* <div className="h-6 w-[1px] bg-grays/15"></div> */}
            {/* <div className="flex items-center gap-2">
              <p className="text-sm">C.sóc sắc đẹp</p>
              <DropdownHor
                defaultValue={bwBrands[0]}
                value={selectedBWBrand}
                onSelected={(index) => {
                  setSelectedBWBrand(bwBrands[index]);
                }}
                classContainer=""
                className="!h-6"
              >
                {bwBrands.map((_, i) => (
                  <DropdownItem key={i} title={_} />
                ))}
              </DropdownHor>
            </div>
            <div className="h-6 w-[1px] bg-grays/15"></div>
            <div className="flex items-center gap-2">
              <p className="text-sm">C.sóc cơ thể</p>
              <DropdownHor
                defaultValue={pcBrands[0]}
                value={selectedPCBrand}
                onSelected={(index) => {
                  setSelectedPCBrand(pcBrands[index]);
                }}
                classContainer=""
                className="!h-6"
              >
                {pcBrands.map((_, i) => (
                  <DropdownItem key={i} title={_} />
                ))}
              </DropdownHor>
            </div>
            <div className="h-6 w-[1px] bg-grays/15"></div>
            <div className="flex items-center gap-2">
              <p className="text-sm">C.sóc nhà cửa</p>
              <DropdownHor
                defaultValue={hcBrands[0]}
                value={selectedHCBrand}
                onSelected={(index) => {
                  setSelectedHCBrand(hcBrands[index]);
                }}
                classContainer=""
                className="!h-6"
              >
                {hcBrands.map((_, i) => (
                  <DropdownItem key={i} title={_} />
                ))}
              </DropdownHor>
            </div> */}

            <Button
              title="Chăm sóc sắc đẹp"
              onClick={() => {
                setBuSelected("PC");
                setBrandSelected("");
              }}
              className={`!h-7 ${buSelected == "PC" && "bg-primary text-white"}`}
              variant="outline"
            />
            <div className="h-6 w-[1px] bg-grays/15"></div>
            <Button
              title="Chăm sóc cơ thể"
              onClick={() => {
                setBuSelected("BW");
                setBrandSelected("");
              }}
              className={`!h-7 ${buSelected == "BW" && "bg-primary text-white"}`}
              variant="outline"
            />
            <div className="h-6 w-[1px] bg-grays/15"></div>
            <Button
              title="Chăm sóc nhà cửa"
              onClick={() => {
                setBuSelected("HC");
                setBrandSelected("");
              }}
              className={`!h-7 ${buSelected == "HC" && "bg-primary text-white"}`}
              variant="outline"
            />
          </div>
          <div className="flex flex-1 justify-end">
            <Input
              value={searchValue}
              className="!h-7"
              icon={<IoSearchOutline />}
              placeholder="Tìm nhãn hiệu của bạn"
              onChange={(e: any) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-2 py-2">
        {buSelected == "PC" &&
          pcBrands.map((pcBrand, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => {
                setBrandSelected(pcBrand);
              }}
              title={pcBrand}
              className={`!h-7 whitespace-nowrap ${brandSelected == pcBrand && "bg-primary text-white"}`}
            />
          ))}
        {buSelected == "BW" &&
          bwBrands.map((bwBrand, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => {
                setBrandSelected(bwBrand);
              }}
              title={bwBrand}
              className={`!h-7 whitespace-nowrap ${brandSelected == bwBrand && "bg-primary text-white"}`}
            />
          ))}
        {buSelected == "HC" &&
          hcBrands.map((hcBrand, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => {
                setBrandSelected(hcBrand);
              }}
              title={hcBrand}
              className={`!h-7 whitespace-nowrap ${brandSelected == hcBrand && "bg-primary text-white"}`}
            />
          ))}
        <div></div>
      </div>
    </div>
  );
};
