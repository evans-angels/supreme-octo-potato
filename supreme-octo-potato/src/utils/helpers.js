function calculateVariantCount(params) {
  let total = 1;

  params.forEach(param => {
    let values = param.text.split("=");
    values = values.length === 2 ? values[1] : 0;

    if (values) {
      let paramValueCount = values.split("|").length;
      total *= paramValueCount;
    }
  });
  return total;
}

function getAllVariations(params = [], geolocationParams = []) {

  let arr = params.map(param => {
    let keyValuesArr = param.text.split("=");
    
    let key = keyValuesArr[0];
    let values = keyValuesArr[1];
    values = values.length ? values.split("|") : [];
    let paramValuePairs = values.map(value => `${key}=${value}`);
    return paramValuePairs;
  });
  if (geolocationParams.length) {
    arr.push(geolocationParams);
  }
  console.log('going into cart')
  console.log(arr)
  let allCombosArr = cartesian(arr);
  allCombosArr = allCombosArr.map(arr => `?${arr.join("&")}`);

  return allCombosArr;
}

function cartesian(arg) {
  var r = [],
    max = arg.length - 1;
  function helper(arr, i) {
    for (var j = 0, l = arg[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(arg[i][j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}

function colorCodeParams(string) {
  let colorizedParams = string.split(/\?|=|&/);
  let paramArray = [];
  let singleParam = [];

  colorizedParams.forEach(param => {
    if (param) {
      singleParam.push(param);
      if (singleParam.length === 2) {
        paramArray.push(singleParam);
        singleParam = [];
      }
    }
  });

  return paramArray;
}

export { calculateVariantCount, getAllVariations, colorCodeParams };
