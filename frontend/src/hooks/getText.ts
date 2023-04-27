import { DEFAULTLANG, Multilingual_ru } from "../config/languages";
import { useAppSelector } from "../redux/hooks";
import { selectLanguage } from "../redux/slices/account/selectors";

function GetText() {
  // const language = useAppSelector(selectLanguage);

  return Multilingual_ru;
}

export default GetText;
