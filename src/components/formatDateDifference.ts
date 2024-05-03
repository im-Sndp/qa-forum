export const formatDateDifference = (inputDateStr) => {
    const inputDate = new Date(inputDateStr);
    const currentDate = new Date();
  
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
  
    if (secondsDifference < 60) {
      return `${secondsDifference} seconds ago`;
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      const remainingSeconds = secondsDifference % 60;
      return `${minutes} minutes, ${remainingSeconds} seconds ago`;
    } else if (secondsDifference < 86400) {
      const hours = Math.floor(secondsDifference / 3600);
      const remainingMinutes = Math.floor((secondsDifference % 3600) / 60);
      const remainingSeconds = secondsDifference % 60;
      return `${hours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds ago`;
    } else if (secondsDifference <= 30 * 86400) {
      const daysDifference = Math.floor(secondsDifference / 86400);
      return `${daysDifference} days ago`;
    } else if (secondsDifference <= 365 * 86400) {
      const months = Math.floor(secondsDifference / (30 * 86400));
      const remainingDays = Math.floor((secondsDifference % (30 * 86400)) / 86400);
      return `${months} months, ${remainingDays} days ago`;
    } else {
      const years = Math.floor(secondsDifference / (365 * 86400));
      const remainingMonths = Math.floor((secondsDifference % (365 * 86400)) / (30 * 86400));
      const remainingDays = Math.floor((secondsDifference % (30 * 86400)) / 86400);
      return `${years} years, ${remainingMonths} months, ${remainingDays} days ago`;
    }
};