const BackgroundNoise = () => {
	return (
		<svg style={{ position: 'absolute', transform: 'translateZ(0px)'}} width="2000" height="2000">
			<defs>
        <clipPath id='noise-circular-clip'>
          <path	d='M1000,1a999,999 0 1,0 0, 1998a999,999 0 1,0 0, -1998'/>
				</clipPath>
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
					colorInterpolationFilters='sRGB'
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
          colorInterpolationFilters='sRGB'
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
          />
        </filter>
			</defs>
			<g opacity={0.05}>
				<circle
          cx={1000}
          cy={1000}
					r={999}
					fill='url(#gggrain-gradient)'
          />
				<rect
          width="100%"
          height="100%"
					filter='url(#gggrain-filter)'
					fill='transparent'
					clipPath='url(#noise-circular-clip)'
				/>
			</g>
		</svg>
	);
};

export default BackgroundNoise;
