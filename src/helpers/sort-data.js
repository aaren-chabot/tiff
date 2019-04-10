const sortHelpers = {};

sortHelpers.sortByDate = (arr, key) => {
	return arr.sort(function(a, b){
		return new Date(a[key]) - new Date(b[key]);
	});
};

module.exports = sortHelpers;
