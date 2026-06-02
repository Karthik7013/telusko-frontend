import { Provider } from "react-redux";
import { store } from "@/store/store";

type ContextProviderProps = {
    children: React.ReactNode;
}

const ContextProvider = (props: ContextProviderProps) => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}

export default ContextProvider;
