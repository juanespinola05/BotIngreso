module.exports = {
    name: "translateCodes",
    run: (string) => {
        return new Promise((res, rej) => {
            
            var codes = ["<b>","<s>","<n>","<k>","<i>"],
                codesReplacements = ["**","__","\n","~~","*"];
            
            for(i = 0; i < codes.length; i++) {
                stringSplitted = string.split(codes[i]);
                string = stringSplitted.join(codesReplacements[i]);
            }
        
            res(string);
        });
    }
}