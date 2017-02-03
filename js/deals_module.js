var dealsModule = (function () {
    'use strict';
    var _data;

    function publicSetData( data ) {
        _data = data;
    }

    /**
     * Returns deals matching filters
     * @param {Object} filters
     * @return {array} matching deals
     */
    function getFilteredData(filters) {

        // none checked, return all deals
        // also make sure it doesn't blow
        if (
               filters == undefined ||
               (
                   (filters.types == undefined || filters.types.length == 0) && (filters.speed == undefined) && (filters.data == undefined )
               )
            )
           return _data.deals;

        // hack to deal with the fact that "Broadband" always contains "Phone" too.
        // TO DO - find a better way to deal with this
        if (filters.types.indexOf("Broadband") !=-1) filters.types.push("Phone");

        // scan deals for matches
        return $.grep(_data.deals, function(el) {
            var productTypes = el.productTypes;

            //look for matching product types
            var matched_types = $.grep(filters.types, function(el) {
                return productTypes.indexOf(el) != -1 ;
            });
            // must match all product type filters exclusively
            if ((matched_types.length != filters.types.length) || (matched_types.length != productTypes.length))
                return false;

            // must match speed
            if (filters.speed && el.speed.sortValue != filters.speed)
                return false;

            // must match mobile data (I assume deals with less data than the selected filter are also OK)
            if (filters.data && el.mobile.data.sortValue < filters.data)
                return false;

            // made it here, must be matching all conditions
            return true;
        });
    }

    // Reveal public pointers to
    // private functions and properties
    return {
        setData : publicSetData,
        getFilteredData: getFilteredData
    };
})();
