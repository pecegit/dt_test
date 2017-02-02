var dealsModule = (function () {
    'use strict';
    var _data;

    function publicSetData( data ) {
        _data = data;
    }

    /**
     * Returns deals matching filters
     * @param {array} filters
     * @return {array} matching deals
     */
    function getFilteredData(filters) {

        // none checked, return all deals
        if (filters == undefined || filters.length == 0) return _data.deals;

        // return deals matching all filters
        return $.grep(_data.deals, function(el) {
            var productTypes = el.productTypes;

            var matched_filters = $.grep(filters, function(el) {
                return productTypes.indexOf(el) != -1 ;
            });

            return matched_filters.length == filters.length;
        });
    }

    // Reveal public pointers to
    // private functions and properties
    return {
        setData : publicSetData,
        getFilteredData: getFilteredData
    };
})();
