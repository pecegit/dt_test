module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['spec'],
        browsers: ['PhantomJS'],
        files: [
            'js/jquery.min.3.1.1.js',
            'js/deals_module.js',
            'tests/**/*.js'
        ]
    });
};