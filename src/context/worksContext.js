import { createContext, useState, useEffect, useContext } from "react";
import { getWorkIndicators } from "../commons";

const Context = createContext({
  works: [],
});

const Provider = ({ children }) => {
  const [works, setWorks] = useState();

  const loadWorks = async () => {
    const workTemp = await getWorkIndicators();
    setWorks(workTemp);
    localStorage.setItem("works", JSON.stringify(workTemp));
  };

  useEffect(() => {
    const workStorage = JSON.parse(localStorage.getItem("works"));
    if (!works && !workStorage) {
      loadWorks();
    } else {
      setWorks(workStorage)
    }
  }, []);

  const exposed = {
    works,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useWorks = () => useContext(Context);

export default Provider;
