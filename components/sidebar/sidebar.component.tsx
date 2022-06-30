import React from "react";
import Image from "next/image";
import SidebarMenuItem from "../sidebar-menu-item/sidebar-menu-item.component";
import { HomeIcon } from "@heroicons/react/solid";
import {
  ClipboardIcon,
  HashtagIcon,
  UserIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import TwitterIcon from "../../public/twitter.svg";

const Sidebar = () => {
  return (
    <div className={"hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24"}>
      <div className={"hoverEffect p-0 hover:bg-blue:100 xl:px-1"}>
        {<Image height={"50"} width={"50"} src={TwitterIcon} />}
      </div>

      <div className={"mt-4 mb-2.5 xl:items-start"}>
        <SidebarMenuItem text={"Home"} Icon={HomeIcon} active />
        <SidebarMenuItem text={"Explore"} Icon={HashtagIcon} />
        <SidebarMenuItem text={"Notifications"} Icon={BellIcon} />
        <SidebarMenuItem text={"Messages"} Icon={InboxIcon} />
        <SidebarMenuItem text={"Bookmarks"} Icon={BookmarkIcon} />
        <SidebarMenuItem text={"Lists"} Icon={ClipboardIcon} />
        <SidebarMenuItem text={"Profile"} Icon={UserIcon} />
        <SidebarMenuItem text={"More"} Icon={DotsCircleHorizontalIcon} />
      </div>

      <button
        className={
          "bg-blue-400 rounded-full text-white w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        }
      >
        Tweet
      </button>

      <div
        className={
          "hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto"
        }
      >
        <img
          src={
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.EtEaemD9C_M2GVoWx_X5lgHaHa%26pid%3DApi&f=1"
          }
          alt={"user-image"}
          className={"h-10 w-10 rounded-full xl:mr-2"}
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className={"font-bold "}>Aditya</h4>
          <p className="text-gray-500">@awesomeeaditya</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  );
};

export default Sidebar;
