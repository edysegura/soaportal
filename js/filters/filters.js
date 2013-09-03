soaApp.filter('currency', function() {
  return function(input, curSymbol, decPlaces, thouSep, decSep) {
    if(input != null) {
      curSymbol = curSymbol || "";
      decPlaces = decPlaces || 2;
      thouSep = thouSep || ".";
      decSep = decSep || ",";
      input = accounting.formatMoney(input, curSymbol, decPlaces, thouSep, decSep); // R$ 4.999,99
    }
    return input;
  }
});