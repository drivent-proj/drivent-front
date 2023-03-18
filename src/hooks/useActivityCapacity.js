export default function useActivityCapacity(maxCapacity, subscribes) {
  return maxCapacity-subscribes;
};
