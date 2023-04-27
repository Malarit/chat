export const SCREENS = <const>[
  "MyPage",
  "News",
  "Messages",
  "Friends",
  "Streams",
  "Music",
  "Settings",
];

export type screens = typeof SCREENS[number];

export type screen = {
  activeScreen: screens;
};

export function isScreens(str: string): str is screens {
  return !!SCREENS.find((screen) => str === screen);
}
