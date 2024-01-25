import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import NavBar from "../Navbar";
import "./index.css"
import User from "../UserProfile";
import { SlUserFollowing } from "react-icons/sl";
import { SlUserFollow } from "react-icons/sl";
import { MdOutlinePostAdd } from "react-icons/md";
import Followers from "../Followers";
import Posts from "../Posts";
import Following from "../Following";

export default function Profile() {
  return (
    <>
      <NavBar />
      <User />

      <div className="d-flex overflow-hidden profile-tabs-main mt-4">
        <Tabs
          aria-label="Basic tabs"
          defaultValue={0}
          className=" profile-tabs"
        >
          <TabList className="profile-tabs d-flex w-100 justify-content-around gap-0">
            <Tab>{<MdOutlinePostAdd />} Posts</Tab>
            <Tab>{<SlUserFollow />} Followers</Tab>
            <Tab>{<SlUserFollowing />}Following</Tab>
          </TabList>
          <TabPanel value={0} className="mt-4">
           <Posts/>
          </TabPanel>
          <TabPanel value={1}>
            <Followers/>
          </TabPanel>
          <TabPanel value={2}>
            <Following/>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
