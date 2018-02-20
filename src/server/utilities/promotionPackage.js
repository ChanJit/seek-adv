export default {
  unilever: {
    classic: {
      bundle: {
        unitPurchase: 3,
        unitPrice: 2
      }
    },
    standout: null,
    premium: null
  },
  apple: {
    classic: null,
    standout: {
      specialPrice: {
        price: 299.99
      }
    },
    premium: null
  },
  nike: {
    classic: null,
    standout: null,
    premium: {
      cheaperForMore: {
        minItem: 4,
        price: 379.99
      }
    }
  },
  ford: {
    classic: {
      bundle: {
        unitPurchase: 5,
        unitPrice: 4
      }
    },
    standout: {
      specialPrice: {
        price: 309.99
      }
    },
    premium: {
      cheaperForMore: {
        minItem: 3,
        price: 389.99
      }
    }
  }
};
