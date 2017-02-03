describe("Deals module", function() {
    var fakeDealsData;

    //clean copy of the data for each spec, because this is js..
    beforeEach(function() {
        fakeDealsData = fakeData.getFakeDeals();
    });

    it("Fake data is loading", function() {
        expect(fakeDealsData).not.toBe(null);
        expect(fakeDealsData).not.toBeUndefined();
    });

    it("There are 7 deals in the fake test data - warns about tampering with data sample", function() {
        expect(fakeDealsData.deals.length).toBe(7);
    });

    it("Tt exists", function() {
        expect(dealsModule).not.toBe(null);
        expect(dealsModule).not.toBeUndefined()
    });

    it("It sets the data object", function() {

        spyOn(dealsModule, 'setData').and.callThrough();

        dealsModule.setData(fakeDealsData);
        var res = dealsModule.getFilteredData();

        expect(dealsModule.setData).toHaveBeenCalled();
        expect(res).toEqual(jasmine.anything());
    });

    // TO DO - implement a custom Jasmine matcher to double check the filter results by actual productType values not only count
    it("When is called with null filters it returns all deals", function() {
        var deals = dealsModule.getFilteredData();

        expect(deals.length).toBe(7);
    });

    it("When is called with empty filters array it returns all deals ", function() {
        var deals = dealsModule.getFilteredData([]);

        expect(deals.length).toBe(7);
    });

    it("When filtering by Broadband show 3 matching deals", function() {
        var filters = {
            types: ["Broadband"]
        };
        var deals = dealsModule.getFilteredData(filters);

        expect(deals.length).toBe(3);
    });

    it("When filtering by Broadband AND TV show 2 matching deals", function() {
        var filters = {
            types: ["Broadband", "TV"]
        };
        var deals = dealsModule.getFilteredData(filters);

        expect(deals.length).toBe(2);
    });

    it("When filtering by Broadband AND Mobile show the 1 matching deal", function() {
        var filters = {
            types: ["Broadband", "Mobile"]
        };
        var deals = dealsModule.getFilteredData(filters);

        expect(deals.length).toBe(1);
    });

    it("When filtering by Broadband, Mobile and TV AND Mobile Data 5GB show 0 matching deals", function() {
        var filters = {
            types: ["Broadband", "Mobile", "TV"],
            data : 5
        };
        var deals = dealsModule.getFilteredData(filters);

        expect(deals.length).toBe(0);
    });

    it("When filtering by Broadband, Mobile and TV AND Mobile Data 10GB show 1 matching deal", function() {
        var filters = {
            types: ["Broadband", "Mobile", "TV"],
            data : 2
        };
        var deals = dealsModule.getFilteredData(filters);

        expect(deals.length).toBe(1);
    });

    it("When filtering by Broadband and Speed 52Mb show 1 matching deal", function() {
        var filters = {
            types: ["Broadband"],
            speed : 53248
        };
        var deals = dealsModule.getFilteredData(filters);

        expect(deals.length).toBe(1);
    });

    it("When filtering by Broadband and Speed 100Mb show 0 matching deal", function() {
        var filters = {
            types: ["Broadband"],
            speed : 102400
        };
        var deals = dealsModule.getFilteredData(filters);

        expect(deals.length).toBe(0);
    });

    it("When filtering by Broadband and Mobile data returns 0", function() {
        var filters = {
            types: ["Broadband"],
            data : "2 GB"
        };
        var deals = dealsModule.getFilteredData(filters);

        expect(deals.length).toBe(0);
    });
});