function getTotalOriginalPrice({ total, originalPrice }) {
  return total * originalPrice;
}

function bundle({ statement, total, originalPrice }) {
  const { unitPurchase, unitPrice } = statement;
  const modValue = total % unitPurchase;
  const dividValue = parseInt(total / unitPurchase);
  return (dividValue > 0) ? (unitPrice * originalPrice * dividValue + modValue * originalPrice) : getTotalOriginalPrice({ total, originalPrice });
}

function cheaperForMore({ statement, total, originalPrice }) {
  return total >= statement.minItem ? statement.price * total : getTotalOriginalPrice({ total, originalPrice });
}

function specialPrice({statement, total}) {
  return statement.price * total;
}

export default {
  'bundle': bundle,
  'cheaperForMore': cheaperForMore,
  'specialPrice': specialPrice,
  'getTotalOriginalPrice': getTotalOriginalPrice
};