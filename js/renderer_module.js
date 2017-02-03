// TO DO - test, unit
var rendererModule = (function () {
    var template,
        table_el;

    function init() {
        var source = $("#row-template").html();
        template = Handlebars.compile(source);
        table_el = $("#results table");

        Handlebars.registerHelper('KBtoMB', function(value) {
            return value/1024;
        });
    }

    function render(data) {
        var deals = { deals: []},
            table_html;

        deals["deals"] = data;
        table_html = template(deals);
        table_el.children('tbody').replaceWith(table_html);
    }

    return {
        setup: init,
        render: render
    };
})();