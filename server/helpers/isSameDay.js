const isSameDay = (dateString) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  return (
    inputDate.getFullYear() === currentDate.getFullYear() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getDate() === currentDate.getDate()
  );
};

module.exports = isSameDay
