const path = require('path');

module.exports = {
	entry:{index:"./src/index.js", page2:"./src/page2.js"},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, "dist")
	}
};