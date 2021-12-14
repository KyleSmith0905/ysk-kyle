import { FunctionComponent, useEffect } from 'react';

const PanoramaMovement: FunctionComponent = () => {

  useEffect(() => {
		document.documentElement.style.overflow = 'hidden';
		const widthScale = window.innerWidth / 2000;
		const heightScale = window.innerHeight / 2000;
		document.body.style.transform = 'scale(' + Math.min(widthScale, heightScale) + ')';

		return () => {
			document.body.style.transform = 'none'
		};
  }, []);

	return (
		<></>
	)
}

export default PanoramaMovement;