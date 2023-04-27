import JsxList from "../../components/jsxList";
import Block from "./../../components/block/index";

type jsxListContainer = {
  elements: JSX.Element[];
  classNameWrapper?: string;
};

const JsxListContainer: React.FC<jsxListContainer> = (props) => {
  const { elements, classNameWrapper } = props;

  const el = elements.map((item) => <Block element={item} />);

  return <JsxList elements={el} classNameWrapper={classNameWrapper} />;
};

export default JsxListContainer;
