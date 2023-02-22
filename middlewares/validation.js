const validateAddedContact = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

const validateUpdatedContact = schema => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (!Object.keys(value).length) {
      const error = new Error('Missing fields');
      error.status = 400;
      throw error;
    }
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

const validateStatusContact = schema => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (!Object.keys(value).length) {
      const error = new Error('Missing field favorite');
      error.status = 400;
      throw error;
    }
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

const validateContactId = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

const validateUser = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

const validateSubscription = schema => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (!Object.keys(value).length) {
      const error = new Error('Missing field subscription');
      error.status = 400;
      throw error;
    }
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = {
  validateAddedContact,
  validateUpdatedContact,
  validateStatusContact,
  validateContactId,
  validateUser,
  validateSubscription,
};
