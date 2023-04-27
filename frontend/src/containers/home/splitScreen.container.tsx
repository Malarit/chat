import SplitScreen from "../../components/splitScreen";
import { splitScreen } from "../../components/splitScreen/types";

const SplitScreenContainer: React.FC<splitScreen> = (props) => {
  return <SplitScreen {...props} />;
};

export default SplitScreenContainer;
