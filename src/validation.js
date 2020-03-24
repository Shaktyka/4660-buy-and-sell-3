'use strict';

// Правила валидации
const ValidationTexts = {
  minLength: `Минимальное количество символов должно быть `,
  maxLength: `Максимальное количество символов должно быть `,
  required: `Поле обязательно для заполнения`,
  minValue: `Минимальное значение должно быть `,
  allowedTypes: `Значениями поля могут быть `
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

const validateComment = (comment) => {
  const validity = {
    errors: [],
    isValid: true
  };

  return validity;
};

const validateOffer = (data) => {
  const validity = {
    errors: [],
    isValid: true
  };
  

  return validity;
};

module.exports = {
  validateOffer, 
  validateComment
};
