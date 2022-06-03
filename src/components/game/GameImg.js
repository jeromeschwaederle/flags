import { Fragment, useState } from "react";

import Spinner from "../../UI/spinner";

export default function GameImg(props) {
  const { id, className, src, alt } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  const loadHandler = () => {
    setIsLoaded(true);
  };

  return (
    <Fragment>
      {!isLoaded && <Spinner />}
      <img
        onLoad={loadHandler}
        id={id}
        className={className}
        src={src}
        alt={alt}
      />
    </Fragment>
  );
}
