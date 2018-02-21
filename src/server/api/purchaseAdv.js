import config from '../serverConfig';
import validator from '../validators/purchaseValidator';
import promotionFunction from '../utilities/promotionFunction';
import promotionPackage from '../utilities/promotionPackage';

function calculateBaseOnAdvType({ advs }) {
  const advTypeMap = {};
  for (const index in advs) {
    const advType = advs[index].advType;
    if (!advTypeMap[advType]) {
      advTypeMap[advType] = {};
    }
    advTypeMap[advType].total = (advTypeMap[advType].total ? advTypeMap[advType].total + 1 : 1);
    advTypeMap[advType].originalPrice = config.advPrice[advType];
  }
  return advTypeMap;
}

function runPromotionFunction({ promotionType, originalPriceModule, companyAdvPackage }) {
  return promotionType && promotionFunction[promotionType] ?
    promotionFunction[promotionType]({ ...originalPriceModule, statement: companyAdvPackage[promotionType] }) :
    promotionFunction.getTotalOriginalPrice({ ...originalPriceModule });
}

function convertToTwoDecimal(number) {
  return parseFloat((Math.round(number * 100) / 100).toFixed(2));
}

export default async function purchaseAdv(req, res) {
  const { body } = req;

  const errors = validator(body);
  if (errors.length) {
    return res.status(400).send({ 'errors': errors });
  }

  try {
    const { advs } = body;
    const companyName = body.companyName.toLowerCase();
    const advTypeMap = calculateBaseOnAdvType({ advs });

    let grandTotal = 0;

    for (const advType in advTypeMap) {
      const companyPackage = promotionPackage[companyName];
      let total = 0;

      if (companyPackage && companyPackage[advType]) {
        total = runPromotionFunction({ promotionType: Object.keys(companyPackage[advType])[0], companyAdvPackage: companyPackage[advType], originalPriceModule: advTypeMap[advType] });
      } else {
        total = promotionFunction.getTotalOriginalPrice({ ...advTypeMap[advType] });
      }

      advTypeMap[advType].currentUnitPrice = convertToTwoDecimal(total / advTypeMap[advType].total);
      grandTotal += total;
    }

    grandTotal = convertToTwoDecimal(grandTotal);

    return res.status(200).send({ grandTotal, advTypeMap });
  } catch (err) {
    return res.status(400).send({ ...err });
  }
}