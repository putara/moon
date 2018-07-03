// https://en.wikipedia.org/wiki/Julian_day
function calcJulianDay(date)
{
  return (date.getTime() / 86400000) + 2440587.5;
}

// https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
// https://en.wikipedia.org/wiki/Lunar_phase#Calculating_phase
const JD_KNOWN_NEW_MOON = 2451549.5;	// 6 Jan 2000 12:24:01
const SYNODIC_MONTH = 29.530588853;
export function calcPhase(date)
{
  var days = calcJulianDay(date) - JD_KNOWN_NEW_MOON;
  var cycles = days / SYNODIC_MONTH;
  return cycles % 1;
}
