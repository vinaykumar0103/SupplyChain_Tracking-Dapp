import React, { useState, useEffect, useContext } from "react";

//INTERNAl IMPORTS
import {
  Table,
  NavBar,
  Footer,
  Form,
  StartShipment,
  GetShipment,
  CompleteShipment,
  Profile,
  Services,
} from "../Components/index";

import { TrackingContext } from "../Context/Tracking";

const index = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount
  } = useContext(TrackingContext);

  //STATE VARIABLES
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, SetOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);


  //DATA STATE VARIABLES
  const [allShipmentsdata, setAllShipmentsdata] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipment()

    return async () => {
      const allData = await getCampaignsData;
      setAllShipmentsdata(allData);
    };
  }, []);

  return (
    <>
      <Services
        SetOpenProfile={SetOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
      />

      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsdata={allShipmentsdata}
      />

      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />

      <Profile
        openProfile={openProfile}
        SetOpenProfile={SetOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
      />

      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />

      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />

      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />

    </>
  )

}
export default index;

