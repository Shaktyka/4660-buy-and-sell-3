'use strict';

// Правила валидации
const ValidationTexts = {
  minLength: `Минимальное количество символов должно быть`,
  maxLength: `Максимальное количество символов должно быть`,
  required: `Поле обязательно для заполнения`,
  minValue: `Минимальное значение должно быть`,
  allowedTypes: `Значениями поля могут быть`
};

const CommentRequirements = {
  minLength: 20
};

const OfferRequirements = {
  img: {
    required: true
  },
  title: {
    required: true,
    minLength: 10,
    maxLength: 100
  },
  text: {
    required: true,
    minLength: 50,
    maxLength: 1000
  },
  category: {
    required: true
  },
  price: {
    required: true,
    minValue: 100
  },
  type: {
    required: true,
    allowedTypes: [`Куплю`, `Продам`]
  }
};

const validityObject = {
  errors: [],
  isValid: true
};

const validation = {
  validateComment: (dataObj) => {
    const validity = Object.assign({}, validityObject);
    const commentLength = dataObj.comment.length;

    if (commentLength < CommentRequirements.minLength) {
      validity.isValid = false;
      validity.errors.push({
        comment: `${ValidationTexts.minLength} ${CommentRequirements.minLength}`
      });
    }
    return validity;
  },

  validateOffer: (dataObj) => {
    console.log(dataObj);
    const validity = Object.assign({}, validityObject);
  
    return validity;
  }
};

module.exports = validation;
