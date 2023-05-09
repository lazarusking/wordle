// import { useState } from "react";
import InfoModal from "../modals/InfoModal";
import SettingsModal from "../modals/SettingsModal";
import StatsModal from "../modals/StatsModal";
import Navbar from "./Navbar";

export default function NavModalContainer({ modal, setModal,...props }) {
  // const [modal, setModal] = useState(null);
  return (
    <>
      {modal == "stat" && <StatsModal setModal={setModal} {...props}/>}
      {modal == "info" && <InfoModal setModal={setModal} />}
      {modal == "settings" && <SettingsModal setModal={setModal} />}
      <Navbar setModal={setModal} />
    </>
  );
}
