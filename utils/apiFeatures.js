class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.specialObj = {};
  }

  filter() {
    // 1A ) FILTERING
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    this.specialObj = excludedFields.reduce((acc, curr) => {
      if (queryObj.hasOwnProperty(curr)) {
        acc[curr] = queryObj[curr];
        delete queryObj[curr];
      }
      return acc;
    }, {});

    // 1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, function (match) {
      return `$${match}`;
    });
    queryStr = JSON.parse(queryStr);

    this.query = this.query.find(queryStr);

    return this;
  }

  sort() {
    // 2) SORTING
    if (this.specialObj.sort) {
      const sortBy = this.specialObj.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt _id');
    }
    return this;
  }

  limitFields() {
    // 3) FIELDS LIMITING
    if (this.specialObj.fields) {
      const fields = this.specialObj.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // 4) PAGINATION
    const page = +this.specialObj.page || 1;
    const limit = +this.specialObj.limit || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
