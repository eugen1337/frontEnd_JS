import store from "../redux/store";
import { Provider } from "react-redux";

export default () => {
    return (props) => {
        return <Provider store={store}>{props.children}</Provider>;
    };
};
