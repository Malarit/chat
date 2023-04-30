import { useSearchParams } from "react-router-dom";
import { SCREENS, screens } from "../redux/slices/screen/types";
import { KeysOfUnion } from "../utils/types";

type params = { [key: string]: string | number };
type urls = Record<screens, params>;

export interface iurls extends urls {
  MyPage: {
    user: string;
  };
  Friends: {};
  Messages: {};
  Music: {};
  News: {};
  Settings: {};
  Streams: {};
}

export interface isearchParams extends URLSearchParams {
  get(name: KeysOfUnion<iurls[keyof iurls]>): string | null;
}

function useScreensUrlParams<T extends screens>(screen?: T, option?: iurls[T]) {
  const [searchParams, setSearchParams] = useSearchParams();

  
  return {
    searchParams: searchParams as isearchParams,
    setScreenParams<T extends screens>(screen?: T, option?: iurls[T]) {
      setSearchParams(option);
    },
  };
}

export default useScreensUrlParams;
