function Searcher() {
    this.how = new TAFFY([
        { id: 1, page: "how to create package", keywords: "create,package" },
        { id: 2, page: "how to create user", keywords: "create,user" },
        { id: 3, page: "how to create domain", keywords: "create,domain" },
        { id: 4, page: "how to create role", keywords: "create,role" }
    ]);
    this.content = new TAFFY([
        { id: 1, page: "page1", keywords: "apple,bananna" },
        { id: 2, page: "page2", keywords: "kiwi,guava" },
        { id: 3, page: "page3", keywords: "cherry,berry" },
        { id: 4, page: "page4", keywords: "mango,grapes" }
    ]);
}

Searcher.prototype.search = function (searchString) {
    var tokenizedSearchString = searchString.split(" ");
    var results = [];
    for (i = 0, r = 0; i < tokenizedSearchString.length; i++) {
        this.content({ keywords: { likenocase: tokenizedSearchString[i] } }).each(function (item) {
            results[r] = item.page;
            r++;
        });

    }

    return jQuery.unique(results); 
};

Searcher.prototype.suggest = function (searchString) {
    searchString.replace("how", "");
    searchString.replace("how to", "");
    searchString.trim();
    var tokenizedSearchString = searchString.split(" ").reverse();
    var results = [];
    for (i = 0, r = 0; i < tokenizedSearchString.length; i++) {
        if (tokenizedSearchString[i] != " " && tokenizedSearchString[i] != "")
        {
            this.how({ keywords: { likenocase: tokenizedSearchString[i] } }).each(function (item) {
                results[r] = item.page;
                r++;
            });
        }
        
    }
    return jQuery.unique(results);
};