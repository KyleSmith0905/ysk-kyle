const BackgroundPattern = () => {
  return (
    <div id='Background'>
      <div className='fill' />
      <svg className='pattern' height="100%" width="100%">
        <defs>
          <pattern id="background-pattern" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
            <circle cx="16" cy="16" r="0.7" fill="var(--color-text)" />
          </pattern>
        </defs>
        <rect fill="url(#background-pattern)" height="200%" width="200%" />
      </svg>
    </div>
  );
};

export default BackgroundPattern;