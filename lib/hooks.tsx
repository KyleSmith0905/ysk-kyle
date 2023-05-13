import { createContext, Dispatch, FunctionComponent, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { Cookies } from './cookies';
import { GraphicsLevels } from './graphicsLevel';

const GraphicsContext = createContext<{
	graphics: GraphicsLevels,
	autoGraphics: GraphicsLevels | 'Assume-Space',
	setGraphics: Dispatch<SetStateAction<GraphicsLevels>>,
	setAutoGraphics: Dispatch<SetStateAction<GraphicsLevels | 'Assume-Space'>>,
	// @ts-expect-error Set graphics should be defined before most code runs
}>({graphics: 'Auto', autoGraphics: 'Space'});

/**
 * Applies all the basic providers needed for bubbles.
 */
const AllProviders: FunctionComponent<{cookies: Cookies, children: ReactNode}> = ({children, cookies}) => {
	const [graphics, setGraphics] = useState<GraphicsLevels>(cookies?.graphics ?? 'Auto');
	const [autoGraphics, setAutoGraphics] = useState<GraphicsLevels | 'Assume-Space'>('Flat');

	return (
		<GraphicsContext.Provider value={{graphics, autoGraphics, setGraphics, setAutoGraphics}}>
			{children}
		</GraphicsContext.Provider>
	);
};

/**
 * Gets the current active graphics settings.
 */
const useGraphics = () => {
	const {graphics, setGraphics, autoGraphics, setAutoGraphics} = useContext(GraphicsContext);

	const [effectiveGraphics, setEffectiveGraphics] = useState<Omit<GraphicsLevels, 'Auto'>>('Flat');

  // Compares the user's graphics settings to a parameter.
  useEffect(() => {
    let activeGraphics = graphics === 'Auto' ? autoGraphics : graphics;
    if (activeGraphics === 'Assume-Space') activeGraphics = 'Flat';
    setEffectiveGraphics(activeGraphics);
  }, [graphics, autoGraphics]);

	return {setGraphics, setAutoGraphics, graphics, autoGraphics, effectiveGraphics};
};

export {AllProviders, useGraphics};