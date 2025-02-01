import images from "../Images/index";
import Image from "/next/image";

export default ({
   setOpenProfile,
   setCompleteModel,
   setGetModel,
   setStartModel,
}) => {

   const team = [
      {
         avatar : images.compShipment,
      },

      {
         avatar : images.getShipment,
      },

      {
         avatar : images.startShipment
      }
   ]
   
}