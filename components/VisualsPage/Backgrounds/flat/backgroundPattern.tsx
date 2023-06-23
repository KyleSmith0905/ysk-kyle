const BackgroundPattern = () => {
	return (
		<div className='FlatBackgroundPattern'>
			<svg className='pattern' height='100%' width='100%'>
				<defs>
					<pattern
						id='pattern-background'
						width='16'
						height='16'
						patternUnits='userSpaceOnUse'
						patternTransform='rotate(135)'
					>
						<circle cx='16' cy='16' r='1.2' fill='var(--color-text)' />
					</pattern>
					<clipPath id='pattern-circular-clip'>
						<path d='M1000,1a999,999 0 1,0 0, 1998a999,999 0 1,0 0, -1998' />
					</clipPath>
				</defs>
        <circle
          cx={1000}
          cy={1000}
					r={999}
					fill='url(#pattern-background)'
					clipPath='url(#pattern-circular-clip)'
				/>
			</svg>
		</div>
	);
};

export default BackgroundPattern;
