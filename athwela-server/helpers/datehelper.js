function getDateMinusTwoYears() {
    var dateBegin = new Date();
    dateBegin.setFullYear(dateBegin.getFullYear() - 2);
    dateBegin.setDate(1);
    dateBegin.setUTCHours(0, 0);
    return dateBegin;
}

module.exports = { getDateMinusTwoYears }