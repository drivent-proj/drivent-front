export default function useHotelCapacity(room) {
  let counter = 0;
  let types = {};
  let type = '';
  room.forEach((element) => {
    counter += element?.capacity;
    element?.capacity === 1
      ? (types['Single'] = true)
      : element?.capacity === 2
        ? (types['Double'] = true)
        : (types['Triple'] = true);
    type =
      Object.keys(types).length === 1
        ? `${Object.keys(types)}`
        : Object.keys(types).length === 2
          ? `${Object.keys(types)[0]} e ${Object.keys(types)[1]}`
          : `${Object.keys(types)[0]}, ${Object.keys(types)[1]} e ${Object.keys(types)[2]}`;
  });
  return { vacancy: counter, type };
}
