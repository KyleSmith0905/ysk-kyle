import { FunctionComponent, useEffect, useState } from 'react';
import { edgeScrolling } from '../../lib/edgeScrolling';

const BrowserMovement: FunctionComponent = () => {

  useEffect(() => {
		document.documentElement.style.overflow = 'auto';
  }, []);

	return (
		<></>
	)
}

export default BrowserMovement;