import { Fragment, useState } from "react";

import Spinner from "../../UI/spinner";

export default function GameImg({ id, className, src, alt, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadHandler = () => {
    setIsLoaded(true);
  };

  return (
    <Fragment>
      {!isLoaded && <Spinner />}
      <img
        onClick={onClick}
        onLoad={loadHandler}
        id={id}
        className={className}
        src={src}
        alt={alt}
      />
    </Fragment>
  );
}
