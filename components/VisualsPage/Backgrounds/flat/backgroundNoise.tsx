const BackgroundNoise = () => {
	return (
		<svg style={{ position: 'absolute' }} height='125rem' width='125rem'>
			<defs>
				<radialGradient id='gggrain-gradient' r='0.5'>
					<stop offset='0%' stopColor='var(--color-text)' stopOpacity={0} />
					<stop offset='100%' stopColor='var(--color-text)' stopOpacity={1} />
				</radialGradient>
				<filter
					id='gggrain-filter'
					x='-20%'
					y='-20%'
					width='140%'
					height='140%'
					filterUnits='objectBoundingBox'
					primitiveUnits='userSpaceOnUse'
					color-interpolation-filters='sRGB'
				>
					<feTurbulence
						type='fractalNoise'
						baseFrequency='0.54'
						numOctaves='2'
						seed='2'
						stitchTiles='stitch'
						x='0%'
						y='0%'
						width='100%'
						height='100%'
						result='turbulence'
					/>
					<feColorMatrix
						type='saturate'
						values='0'
						x='0%'
						y='0%'
						width='100%'
						height='100%'
						in='turbulence'
						result='colormatrix'
					/>
					<feComponentTransfer
						x='0%'
						y='0%'
						width='100%'
						height='100%'
						in='colormatrix'
						result='componentTransfer'
					>
						<feFuncR type='linear' slope='3' />
						<feFuncG type='linear' slope='3' />
						<feFuncB type='linear' slope='3' />
					</feComponentTransfer>
					<feColorMatrix
						x='0%'
						y='0%'
						width='100%'
						height='100%'
						in='componentTransfer'
						result='colormatrix2'
						type='matrix'
						values='
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 19 -11
            '
					/>
				</filter>
        <filter
          id='gggrain-saturate'
          x='-20%'
          y='-20%'
          width='140%'
          height='140%'
          filterUnits='objectBoundingBox'
          primitiveUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feColorMatrix
            type='saturate'
            values='3'
            x='0%'
            y='0%'
            width='100%'
            height='100%'
            in='SourceGraphic'
            result='colormatrix'
          ></feColorMatrix>
        </filter>
				<clipPath id='noise-circular-clip'>
          <circle r={999} cx={1000} cy={1000}/>
				</clipPath>
			</defs>
			<g filter="url(#gggrain-saturate)" opacity={0.05}>
				<circle
          cx={1000}
          cy={1000}
					r={999}
					fill='url(#gggrain-gradient)'
				/>
				<circle
          r={999}
          cx={1000}
          cy={1000}
					fill='transparent'
					filter='url(#gggrain-filter)'
					clipPath='url(#noise-circular-clip)'
				/>
			</g>
		</svg>
	);
};

export default BackgroundNoise;
