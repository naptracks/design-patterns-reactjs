//high order components are just functions that return functions
// sharing complex behaviour between multiple components (much like with container component)
// add extra functionality
import { useEffect } from "react";
import { UserInfo } from "../react-hooks/customHooks/useCurrentUser.js";

export const printProps = (Component) => {
  return (props) => {
    console.log(props);

    return <Component {...props} />;
  };
};

const UserInfoWrapped = printProps(UserInfo);

export const withUser = (Component, userID) => {
  return (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(`/user/${userID}`);
        setUser(response.data);
      })();
    }, []);
    return <Component {...props} user={user} />;
  };
};

const UserInfoWithLoader = withUser(UserInfo, "234");

const App = () => {
  return (
    <>
      <UserInfoWrapped a={1} b={"hello"} />
      <UserInfoWithLoader />
    </>
  );
};
export const withEditableUser = (Component, userID) => {
  return (props) => {
    const [originalUser, setOriginalUser] = useState(null);
    const [user, setUser] = useState();

    useEffect(() => {
      (async () => {
        const res = await axios.get(`/users/${userID}`);
        setOriginal(res.data);
        setUser(res.data);
      })();
    }, []);

    const onChangeUser = (changes) => {
      setUser({ ...user, changes });
    };

    const onSaveUser = async () => {
      const res = await axios.post(`/user/${userID}`, { user });
      setOriginalUser(res.data);
      setUser(res.data);
    };

    const onResetUser = () => {
      setUser(originalUser);
    };

    return (
      <Component
        {...props}
        user={user}
        onChangeUser={onChangeUser}
        onSaveUser={onSaveUser}
        onRestUser={onResetUser}
      />
    );
  };
};

export const UserInfoForm = withEditableUser(
  { user, onChangeUser, onSaveUser },
  () => {
    const { name, age } = user || {};

    return user ? (
      <>
        <p>{name}</p>
        <input
          value={name}
          onChange={(e) => onChangeUser({ name: e.target.value })}
        />
        <p>{age}</p>
        <input
          type="number"
          value={age}
          onChange={(e) => onChangeUser({ name: e.target.value })}
        />
        <button onClick={onResetUser}>Reset</button>
        <button onClick={onSaveUser}>Save Changes</button>
      </>
    ) : (
      <p>loading...</p>
    );
  },
  "123" // userID
);


const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)


export const withEditableResource = (Component, resourcePath, resourceName) => {
  return (props) => {
    const [originalData, setOriginalData] = useState(null);
    const [data, setData] = useState();

    useEffect(() => {
      (async () => {
        const res = await axios.get(resourcePath);
        setOriginalData(res.data);
        setData(res.data);
      })();
    }, []);

    const onChange = (changes) => {
      setData({ ...data, changes });
    };

    const onSave = async () => {
      const res = await axios.post(resourcePath, { [resourceName]: data });
      setOriginalData(res.data);
      setData(res.data);
    };

    const onReset = () => {
      setData(originalData);
    };

    const resourceProps = {
      [resourceName]: data,
      [`onChange${capitalize(resourceName)}`]: onChange,
      [`onSave${capitalize(resourceName)}`]: onSave,
      [`onReset${capitalize(resourceName)}`]: onReset,
    };

    return (
      <Component
        {...props}
        {...resourceProps} 
      />
    );
  };
};


export const UserInfoWithResource = withEditableResource(
  { user, onChangeUser, onSaveUser },
  () => {
    const { name, age } = user || {};

    return user ? (
      <>
        <p>{name}</p>
        <input
          value={name}
          onChange={(e) => onChangeUser({ name: e.target.value })}
        />
        <p>{age}</p>
        <input
          type="number"
          value={age}
          onChange={(e) => onChangeUser({ name: e.target.value })}
        />
        <button onClick={onResetUser}>Reset</button>
        <button onClick={onSaveUser}>Save Changes</button>
      </>
    ) : (
      <p>loading...</p>
    );
  },
  "/users/123", "user" // resourcePath, "resourceName"
);
