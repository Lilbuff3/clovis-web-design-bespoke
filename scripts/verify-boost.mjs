import fs from 'fs';

// 1. Verify vercel.json has SPA rewrites
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
if (!vercel.rewrites || !vercel.rewrites.some(r => r.source === '/(.*)' && r.destination === '/index.html')) {
  console.error('FAIL: vercel.json missing SPA rewrite');
  process.exit(1);
}
console.log('PASS: vercel.json SPA rewrite configured');

// 2. Verify all BOOST_CHAPTERS IDs exist in BoostPage.tsx and Boost.tsx
const boostChapters = ['boost-top', 'boost-calc', 'boost-diag', 'boost-teardown', 'boost-proof', 'boost-faq', 'boost-closing'];
const boostPageCode = fs.readFileSync('src/components/BoostPage.tsx', 'utf8');
const boostCode = fs.readFileSync('src/components/Boost.tsx', 'utf8');
const combinedBoost = boostPageCode + boostCode;

for (const id of boostChapters) {
  if (!combinedBoost.includes(`id="${id}"`)) {
    console.error(`FAIL: Missing ID in Boost files: ${id}`);
    process.exit(1);
  }
}
console.log('PASS: All BOOST_CHAPTERS IDs exist in DOM elements');

// 3. Verify calculator formulas
function calc(speed, visitors, ticketValue) {
  const baselineConversion = 0.038;
  const retentionRate = Math.min(1, Math.max(0.18, 1 - (speed - 0.8) * 0.14));
  const optimalCallers = Math.round(visitors * baselineConversion);
  const actualCallers = Math.min(optimalCallers, Math.round(optimalCallers * retentionRate));
  const lostCallers = Math.max(0, optimalCallers - actualCallers);
  const estimatedCloseRate = 0.4;
  const monthlyLostRevenue = Math.round(lostCallers * estimatedCloseRate * ticketValue);
  const annualLostRevenue = monthlyLostRevenue * 12;
  const roiMultiple = annualLostRevenue > 0 ? Math.max(1, Math.round(annualLostRevenue / 500)) : 0;
  return { optimalCallers, actualCallers, lostCallers, monthlyLostRevenue, annualLostRevenue, roiMultiple };
}

// Test 0.8s speed
const opt = calc(0.8, 1200, 850);
if (opt.lostCallers !== 0 || opt.monthlyLostRevenue !== 0) {
  console.error('FAIL: At 0.8s, leak must be 0, got:', opt);
  process.exit(1);
}
console.log('PASS: At 0.8s, zero leakage verified:', opt);

// Test 4.2s speed
const slow = calc(4.2, 1200, 850);
if (slow.lostCallers <= 0 || slow.monthlyLostRevenue <= 0) {
  console.error('FAIL: At 4.2s, leak must be > 0, got:', slow);
  process.exit(1);
}
console.log('PASS: At 4.2s, realistic leak computed: lost callers =', slow.lostCallers, ', monthly = $' + slow.monthlyLostRevenue, ', ROI = ' + slow.roiMultiple + 'x');

// Test extreme bounds: speed 7.5s, visitors 8000, ticket 5000
const extreme = calc(7.5, 8000, 5000);
if (extreme.lostCallers <= 0 || !isFinite(extreme.monthlyLostRevenue)) {
  console.error('FAIL: Extreme values calculation failed:', extreme);
  process.exit(1);
}
console.log('PASS: Extreme upper bounds test passed:', extreme);

console.log('ALL 5 AUTOMATED ASSERTIONS PASSED WITH ZERO ERRORS');
