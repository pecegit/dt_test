var filtersModule = (function () {
    var _typeFilterControls,
        _speedFilterControl;

    function init() {
        _typeFilterControls = $('input[name=types_filter]').change(onChange);
        _speedFilterControl = $('#speed_filter').change(onChange);

        $('#hamburger').on('click touch',function() {
            console.log('asd');
            $('#filters').toggle();
        })
    }

    function onChange() {
        PubSub.pub('filters_changed', getFilters());
    }

    function getFilters() {
        var filters = {},
            speed = _speedFilterControl.val();

        filters["types"] = typeFiltersToArray();

        if (speed.indexOf('GB') != -1) { //eh
            filters["data"] = parseInt(speed, 10)
        } else {
            if (speed > 0)
                filters["speed"] = speed;
        }

        return filters;
    }

    function typeFiltersToArray() {
        return _typeFilterControls.map(function(){
            return this.checked ? this.value : null
        }).get();
    }

    return {
        setup: init,
        getFilters: getFilters
    };
})();