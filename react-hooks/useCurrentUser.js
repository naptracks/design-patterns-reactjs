import { useState, useEffect} from "react";
import axios from "axios";

export const useCurrentUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await axios.get("/current-use");
            setUser(res.data);
        })(); //call the async function
    }, []);

    return user;
}

export const useUser = ({userID}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/${userID}`);
      setUser(res.data);
    })(); //call the async function
  }, [userID]);

  return user;
};

export const useRessource = resourceURL => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get(resourceURL);
      setResource(res.data);
    })(); //call the async function
  }, [resourceURL]);

  return resource;
};

export const useDataSource = getResourceFunc => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getResourceFunc();
      setResource(res.data);
    })(); //call the async function
  }, [getResourceFunc]);

  return resource;
};

const serverResource = resourceURL => async () => {
 const response = await axios.get(resourceURL);
 return response.data;
}

const localStorageResource = key => {
    return localStorage.getItem(key);
}

export const UserInfo = ({userID}) => {
    const user = useDataSource(serverResource(`/resource/url`))
    const message = useDataSource(localStorageResource('message'));

    const { name, age, hobbies} = user || {};

    return (
      <>
        <h1>User Info</h1>
        <p>
          {name} , {age}, {hobbies}{" "}
        </p>
      </>
    );
}





