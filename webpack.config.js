// 引入一个包
const path = require('path');
// 引入 html-webpack-plugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 clean 插件
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const isPord = false;
// webpack中的所有配置信息都应该写在module.exports中
module.exports = {
	// 指定入口文件
	entry: './src/index.ts',
	// 指定打包文件所在目录
	output: {
		// 指定打包后的目录
		path: path.resolve(__dirname, 'dist'),
		// 打包后的文件名称
		filename: 'bundle.js',
		// 告诉 webpack 不使用箭头函数
		environment: {
			arrowFunction: false,
		}
	},
	// 模式
	mode: isPord ? 'production' : 'development', //  development：开发环境，production：生产环境
	// 指定 webpack 打包时要使用的模块
	module: {
		// 指定要加载的规则
		rules: [{
				// test指定的是规则生效的文件
				test: /\.ts$/,
				// 配置要使用的loader,按照数组从后往前执行
				use: [{
					// 指定加载器
					loader: 'babel-loader',
					// 设置babel
					options: {
						// 设置预定义的环境
						presets: [
							[
								// 指定环境插件
								"@babel/preset-env",
								// 配置信息
								{
									// 要兼容的目标浏览器
									"targets": {
										"chrome": "88",
										"ie": "11"
									},
									// 指定 corejs 的版本
									"corejs": "3",
									// 使用corejs的方式，"usage"表示按需加载
									"useBuiltIns": "usage"
								}
							]
						]
					}
				}, 'ts-loader'],
				// 要排除的文件夹
				exclude: /node_modules/
			},
			// 设置 less 文件的处理
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader",
					// 引入 postcss 加载器
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
										{
											browsers: 'last 2 versions'
										}
									]
								]
							}
						}
					},
					"less-loader"
				]
			}
		]
	},
	// 配置 webpack插件
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			// title: '这是一个自定义的title',
			template: './src/index.html'
		}),
	],

	// 用来设置引用模块
	resolve: {
		extensions: ['.ts', '.js']
	}
}