const TRACK_DURATIONS = [
  60000, 108000, 90000, 105000, 134000, 176000, 182000, 41000, 113000, 135000,
  83000, 138000, 169000, 285000, 96000, 98000, 26000, 140000, 122000, 116000,
  74000, 192000, 133000, 163000, 192000, 74000, 169000, 99000, 74000, 125000, 71000
];

const TOTAL_DURATION = TRACK_DURATIONS.reduce((a, b) => a + b, 0);
const EPOCH = new Date('2026-03-21T00:00:00Z').getTime();

exports.handler = async (event, context) => {
  const now = Date.now();
  const elapsed = (now - EPOCH) % TOTAL_DURATION;

  let accumulated = 0;
  let trackIndex = 0;
  let positionInTrack = 0;

  for (let i = 0; i < TRACK_DURATIONS.length; i++) {
    if (elapsed < accumulated + TRACK_DURATIONS[i]) {
      trackIndex = i;
      positionInTrack = elapsed - accumulated;
      break;
    }
    accumulated += TRACK_DURATIONS[i];
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store'
    },
    body: JSON.stringify({ trackIndex, positionInTrack, trackDuration: TRACK_DURATIONS[trackIndex], serverTime: now })
  };
};
