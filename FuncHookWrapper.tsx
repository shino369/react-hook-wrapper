import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../store";

// a testing wrapper for using react functional component to wrap class component
// as a result you can use hook in the wrapper and pass the computed result to the class component by props
// e.g. redux props useSelector / useEffect / useState

interface Props {
  reduxKeys: { [key: string]: string[] };
}

interface ReduxStates {
  [key: string]: any;
}

const FuncHookWrapper: React.FC<Props> = ({ children, reduxKeys }) => {
  const [stateMapper, setStateMapper] = useState<ReduxStates>();
  const store = useSelector((rootState: any) => rootState);

  useEffect(() => {
    if (reduxKeys) {
      let reduxState: ReduxStates = {};
      const storeKeys = Object.keys(reduxKeys);
      storeKeys.map((key) => {
        if (reduxKeys[key] && reduxKeys[key].length > 0) {
          reduxKeys[key].map((childKey) => {
            reduxState[childKey] = store[key][childKey];
          });
        }
      });
      setStateMapper(reduxState);
    }
  }, []);

  const childElements = React.Children.map(children, (child: any) =>
    React.cloneElement(child, {
      reduxState: stateMapper,
    })
  );

  return <>{childElements}</>;
};

export default FuncHookWrapper;
