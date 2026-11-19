function getSellingPrice(product) { return product.salePriceVnd ?? product.listPriceVnd; }
const BUNDLES = {
  outfit: { priceVnd: 550000, ids: ['halter-bra', 'flared-pants'] },
  socks: { priceVnd: 199000, ids: ['grip-socks', 'grip-socks', 'grip-socks'] },
  full: { priceVnd: 950000, ids: ['halter-bra', 'flared-pants', 'ballet-wrap', 'grip-socks', 'cloud-headband'] }
};
const SHIPPING_POLICY = { thresholdVnd: 500000, demo: true };
function quoteCart(items, products = PRODUCTS) {
  const lines = items.map(item => ({ ...item, unitPriceVnd: getSellingPrice(products.find(p => p.id === item.id)) }));
  const groups = new Map();
  lines.forEach(line => { if (line.bundleGroupId) { const group = groups.get(line.bundleGroupId) || []; group.push(line); groups.set(line.bundleGroupId, group); } });
  for (const group of groups.values()) {
    const definition = BUNDLES[group[0].bundleId];
    const expected = definition?.ids.slice().sort().join('|');
    const valid = definition && group.every(l => l.bundleId === group[0].bundleId && l.qty === group[0].qty) && group.map(l => l.id).sort().join('|') === expected;
    if (!valid) { group.forEach(l => { delete l.bundleGroupId; delete l.bundleId; }); continue; }
    const weight = group.reduce((sum, l) => sum + l.unitPriceVnd, 0);
    let allocated = 0;
    group.forEach((l, index) => { l.unitPriceVnd = index === group.length - 1 ? definition.priceVnd - allocated : Math.floor(definition.priceVnd * l.unitPriceVnd / weight); allocated += l.unitPriceVnd; });
  }
  return { lines, subtotalVnd: lines.reduce((sum, l) => sum + l.unitPriceVnd * l.qty, 0) };
}
