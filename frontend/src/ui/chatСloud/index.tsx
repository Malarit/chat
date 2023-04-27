import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type chatCloud = {
  text: string;
  time: string;
  reverse?: boolean;
  className?: string;
};

const ChatСloud: React.FC<chatCloud> = React.memo((props) => {
  const { text, time, className, reverse } = props;

  const getText = () => {
    return text.split(/<br>|\n/g).map((item, i) => (
      <React.Fragment key={i}>
        {item} <br />
      </React.Fragment>
    ));
  };

  return (
    <div className={cn(style.root, className, { [style.right]: reverse })}>
      <div className={cn(style.cloud, { [style.reverse]: reverse })}>
        {getText()}
        <span>{time}</span>
      </div>
    </div>
  );
});

export default ChatСloud;
