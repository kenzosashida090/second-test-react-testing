import { PropsWithChildren } from "react";
import { createStoreHook, Provider } from "react-redux";

const ReduxProvider = ({ children }: PropsWithChildren) => {
  const store:any = createStoreHook();

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
