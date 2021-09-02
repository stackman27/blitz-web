const purchaseItemCountTemporaryFix = (purchaseInfo) => {
  if (purchaseInfo) {
    const result = purchaseInfo.cartItems.reduce(function (sum, item) {
      return (sum = sum + item.purchaseCount);
    }, 0);
    return result;
  }
};

export { purchaseItemCountTemporaryFix };
