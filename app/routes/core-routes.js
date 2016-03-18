var	React = require('react/addons'),
	patients = require('../data/patients.js').patients;

ReactApp = React.createFactory(require('../components/ReactApp'));

module.exports = function(app) {

	app.get('/', function(req, res){
		var reactHtml = React.renderToString(ReactApp({ data: patients }));
    	res.render('index.ejs', {reactOutput: reactHtml});
	});

};
