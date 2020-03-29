'use strict';

const CommentRequirement = {
  minLength: {
    VALUE: 20,
    ERROR_TEXT: `Минимальное количество символов`
  }
};

const REQUIRE_ERROR_TEXT = `Нужно заполнить поле`;

const OfferRequirement = {
  avatar: {
    allowedExtentions: {
      VALUE: [`jpeg`, `jpg`, `png`],
      ERROR_TEXT: `Неразрешённый тип данных`
    }
  },
  ticketName: {
    minLength: {
      VALUE: 10,
      ERROR_TEXT: `Минимальное количество символов`
    },
    maxLength: {
      VALUE: 100,
      ERROR_TEXT: `Максимальное количество символов`
    }
  },
  comment: {
    minLength: {
      VALUE: 50,
      ERROR_TEXT: `Минимальное количество символов`
    },
    maxLength: {
      VALUE: 1000,
      ERROR_TEXT: `Максимальное количество символов`
    }
  },
  price: {
    minValue: {
      VALUE: 100,
      ERROR_TEXT: `Не менее`
    }
  },
  action: {
    allowedType: {
      VALUE: [`buy`, `sell`],
      ERROR_TEXT: `Неразрешённое значение`
    }
  },
  category: {
    allowedEntries: {
      VALUE: [1, 2, 3, 4],
      ERROR_TEXT: `Выбраны некорректные значения категорий`
    }
  }
};

module.exports = {
  CommentRequirement,
  REQUIRE_ERROR_TEXT,
  OfferRequirement
};
