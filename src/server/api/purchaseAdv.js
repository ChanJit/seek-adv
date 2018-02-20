import config from '../serverConfig';
import validator from '../validators/purchaseValidator';
import promotionFunction from '../utilities/promotionFunction';

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
      const companyPackage = config.promotionPackage[companyName];

      grandTotal += companyPackage && companyPackage[advType] ?
        runPromotionFunction({ promotionType: Object.keys(companyPackage[advType])[0], companyAdvPackage: companyPackage[advType], originalPriceModule: advTypeMap[advType] }) :
        promotionFunction.getTotalOriginalPrice({ ...advTypeMap[advType] });
    }

    return res.status(200).send({ grandTotal: parseFloat(Math.round(grandTotal * 100) / 100).toFixed(2) });
  } catch (err) {
    return res.status(400).send({ ...err });
  }
}