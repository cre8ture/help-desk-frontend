

/**
 * Formats a date and time string into a localized date and time format.
 *
 * @param {string} date - The date string in ISO format (YYYY-MM-DD).
 * @param {string} time - The time string in 24-hour format (HH:MM).
 * @return {string} The formatted date and time string in the user's locale.
 */
export const formatDateTime = (date: string, time: string) => {
    console.log(date, time);
  
    // Extract the date part from the date string
    const datePart = date.split('T')[0];
  
    // Combine the date part with the time
    const dateTimeString = `${datePart}T${time}`;
  
    // Create a new Date object using the combined string
    const dateTime = new Date(dateTimeString);
  
    console.log(dateTime);
  
    // Check if the date is valid
    if (isNaN(dateTime.getTime())) {
      return 'Invalid date and time';
    }
  
    return dateTime.toLocaleString(); // Adjust the format as needed
  };
  