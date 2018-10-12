
// 让所有文件，都使用相对路径。
fis.hook('relative');
fis.match('**', {
  relative: true
})

fis.project.setProjectRoot("src");

fis.match('::package', {
	spriter: fis.plugin('csssprites',{
		margin: 30
	}),
	postpackager: fis.plugin('loader-extra', {
    resoucemap: false
  }),
  packager: fis.plugin('deps-pack', {
    'js/vendor.js': [
      'js/require.js',
      'js/require-config.js',
      'js/jquery.min.js',
      'js/vendor/index.es6',
      'js/vendor/index.es6:deps',
      'js/vendor/index.es6:asyncs',
    ],
    'css/style.css': [
      'css/lib/*.css',
      'css/style.less',
    ]
  }),
});
fis.match('*.{png,jpg,gif,svg}', {
  optimizer: fis.plugin('imagemin', {
		".png": {
			pngquant: {
				quality: '75-90',
				speed: 4
			}
		},
		".jpg": {
			mozjpeg: {
				progressive: true,
				quality: 80
			}
		},
		".gif": {
			gifsicle: {
				interlaced: false,
			},
		},
	})
});

fis.match('template/modules/**', {
  optimizer: fis.plugin('html-minifier', {
	})
})
fis.match('*.less', {
  release: false,
	rExt: '.css',
  parser: fis.plugin('less-2.5.x', {
    paths: []
  }),
	postprocessor: fis.plugin('autoprefixer-latest', {
		browsers: [
      'ie>=8',
      'last 10 version'
    ]
	})
});

fis.hook('amd',{
  baseUrl: './',
  paths: {
    $: 'lib/jquery.min.js'
  }
});

fis.match('*.es6',{
  rExt: '.js',
  isMod: true,
  parser: [
		fis.plugin('jdists', {
			remove: "debug,test"
		}),
		fis.plugin('es6',{
			plugins: [
				'transform-es3-property-literals',
				'transform-es3-member-expression-literals',
			]
		}),
	],
});

fis.match('css/*.{css,less}', {
	release: true,
	useSprite: true,
});

/* 更改精灵生成目录 */	
fis.match('css/(*.png)', {
	release: 'img/$1',
	useHash: true
});

fis.match('template/**', {
	release: false
});

/* 压缩工具js */
fis.media('prod')
  .match('**', {
    deploy: [
      fis.plugin('skip-packed', {
        ignore: []
      }),
      fis.plugin('local-deliver', {
        to: 'dist'
      })
    ]
  })
	.match('*.{less,css}', {
		optimizer: fis.plugin('clean-css',{
			'keepBreaks': true
		})
	})
	.match('*.{js,es6}', {
		optimizer: fis.plugin('uglify-js',{
			mangle: {
				except: 'exports, module, require, define'
			}
		})
	})
	.match('{*.min.js, js/app/*.js}', {
		optimizer: null
	})