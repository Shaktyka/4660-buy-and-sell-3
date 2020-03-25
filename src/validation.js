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

// const IMG_EXTENTIONS = ['JPG'];

const OfferRequirements = {
  avatar: {
    required: true
  },
  ticketName: {
    required: true,
    minLength: 10,
    maxLength: 100
  },
  comment: {
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
  action: {
    required: true,
    allowedTypes: [`buy`, `sell`]
  }
};

const allowImgTypes = [`image/jpeg`, `image/png`];

const validityObject = {
  errors: [],
  isValid: true
};

const validation = {
  validateComment: (comment) => {
    const validity = Object.assign({}, validityObject);

    if (comment.length < CommentRequirements.minLength) {
      validity.isValid = false;
      validity.errors.push({
        comment: `${ValidationTexts.minLength} ${CommentRequirements.minLength}`
      });
    }
    return validity;
  },

  validateOffer: (offerData) => {
    const validity = Object.assign({}, validityObject);
    // const {type, size, path, name} = offerData.files.avatar;

    const avatar = offerData.avatar.trim();
    const ticketName = offerData[`ticket-name`].trim();
    const comment = offerData.comment.trim();
    const category = offerData.category.trim();
    const price = offerData.price.trim();
    const action = offerData.action.trim();

    // console.log(ticketName);
    // Проверить наличие файла
    // проверить длину, тип, размер
    if (avatar.length === 0) {
      validity.isValid = false;
      validity.errors.push({
        avatar: `${ValidationTexts.required}`
      });
    }

    // Проверка заголовка
    

    // Проверка категории

    // Проверка цены

    // Проверка action

    return validity;
  }
};

module.exports = validation;
