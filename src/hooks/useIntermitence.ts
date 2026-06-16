import { useCallback, useState } from "react";

export const useIntermitence = (initialStatus = false) => {
  const [status, setStatus] = useState(initialStatus);
  const switchStatus = useCallback(() => {
    setStatus((currentStatus) => !currentStatus);
  }, []);

  return { status, switchStatus };
};

export default useIntermitence;
