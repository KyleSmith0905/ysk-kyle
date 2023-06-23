import BackgroundConnections from './backgroundConnections';
import BackgroundNoise from './backgroundNoise';
import BackgroundPattern from './backgroundPattern';

const FlatBackground = () => {
  return (
    <>
      <BackgroundNoise/>
      <BackgroundPattern/>
      <BackgroundConnections/>
    </>
  );
};

export default FlatBackground;