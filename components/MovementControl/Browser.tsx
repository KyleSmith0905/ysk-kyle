import { FunctionComponent, useEffect } from 'react';

const BrowserMovement: FunctionComponent = () => {

  useEffect(() => {
		document.documentElement.style.overflow = 'auto';

		return () => {
			document.documentElement.style.overflow = 'hidden';
		}
  }, []);

	return (
		<></>
	)
}

export default BrowserMovement;