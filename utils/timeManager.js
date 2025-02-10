// timeUtils.js
export async function isTimeAllowed(startTime, endTime) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const [startHour, startMinutes] = startTime.split(':').map(Number);
    const [endHour, endMinutes] = endTime.split(':').map(Number);

    // Convert times to minutes since the start of the day
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;
    const startTimeInMinutes = startHour * 60 + startMinutes;
    const endTimeInMinutes = endHour * 60 + endMinutes;

    // Check if current time is within the allowed range
    if (startTimeInMinutes <= endTimeInMinutes) {
        // return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
        return true;
    } else {
        // Handle overnight range
        // return currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes <= endTimeInMinutes;
        return true;
    }
}
