import React from "react";
import { useEffect } from "react";
import { useState } from "react";

// a testing wrapper for using react functional component to wrap class component
// as a result you can use hook in the wrapper and pass it to the class component 
// e.g. redux props useSelector / useeffect / useState

const FuncHookWrapper = (props) => {
  const { children } = props;
  const [hookProps, setHookProps] = useState({
    testA: 999,
    testB: 1,
  });

  useEffect(() => {
    const updateProps = () => {
      setInterval(() => {
        setHookProps((prev) => {
          return { testA: prev.testA - 1, testB: prev.testB + 1 };
        });
      }, 1000);
    };

    updateProps();
    return () => {
      clearInterval(updateProps);
    };
  }, []);

  const childElements = React.Children.map(children, (child) =>
    React.cloneElement(child, { ...hookProps })
  );

  return <>{childElements}</>;
};

export default FuncHookWrapper;
