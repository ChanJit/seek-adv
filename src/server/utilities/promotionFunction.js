function getTotalOriginalPrice({ totalUnit, originalPrice }) {
  return {
    total: totalUnit * originalPrice,
    originalPrice,
    discountPrice: originalPrice
  };
}

function convertToTwoDecimal(number) {
  return parseFloat((Math.round(number * 100) / 100).toFixed(2));
}

function bundle({ statement, totalUnit, originalPrice }) {
  const { unitPurchase, unitPrice } = statement;
  const originalPriceUnit = totalUnit % unitPurchase;
  const dividValue = parseInt(totalUnit / unitPurchase);
  return {
    total: (dividValue > 0) ?
      (unitPrice * originalPrice * dividValue + originalPriceUnit * originalPrice) :
      getTotalOriginalPrice({ totalUnit, originalPrice }).total,
    originalPriceUnit,
    type: 'bundle',
    discountPrice: (dividValue > 0) ? convertToTwoDecimal((unitPrice * originalPrice) / unitPurchase) : originalPrice,
    originalPrice
  };
}

function cheaperForMore({ statement, totalUnit, originalPrice }) {
  return {
    total: (totalUnit >= statement.minItem) ?
      statement.price * totalUnit :
      getTotalOriginalPrice({ totalUnit, originalPrice }).total,
    discountPrice: (totalUnit >= statement.minItem) ?
      statement.price :
      originalPrice,
    type: 'cheaperForMore',
    originalPrice
  };
}

function specialPrice({ statement, totalUnit, originalPrice }) {
  return {
    total: statement.price * totalUnit,
    discountPrice: statement.price,
    type: 'specialPrice',
    originalPrice
  };
}

export default {
  'bundle': bundle,
  'cheaperForMore': cheaperForMore,
  'specialPrice': specialPrice,
  'getTotalOriginalPrice': getTotalOriginalPrice,
  'convertToTwoDecimal': convertToTwoDecimal
};