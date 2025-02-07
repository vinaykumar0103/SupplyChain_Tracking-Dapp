export default ({ setCreateShipmentModel, allShipmentsData }) => {
  const convertTime = (time) => {
    const newTime = newDate(time);
    const dataTime = new Intl.DateTimeFormat(
      'en-us', {
        year: "numeric",
        month: "2-mont",
        day: "2-digit"
      }).format(newTime);

      return dataTime;
  }
}