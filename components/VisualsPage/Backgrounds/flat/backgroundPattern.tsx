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
				</defs>
        <circle
          cx={1000}
          cy={1000}
					r={999}
					fill='url(#pattern-background)'
				/>
			</svg>
		</div>
	);
};

export default BackgroundPattern;
