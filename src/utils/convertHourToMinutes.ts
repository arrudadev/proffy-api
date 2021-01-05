export function convertHourToMinutes(time: string): number {
  if (!time || typeof time !== 'string') {
    throw new Error(
      'convertHourToMinutes - Need to enter with time (in string format)',
    );
  }

  if (!time.match(/^\d{1,2}:\d{1,2}$/)) {
    throw new Error(
      'convertHourToMinutes - Need to enter with time in format 00:00',
    );
  }

  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = hour * 60 + minutes;

  return timeInMinutes;
}
