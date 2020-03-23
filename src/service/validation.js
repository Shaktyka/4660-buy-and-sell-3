const commentRequirements = {
  minLength: 20
};

const offerRequirements = {
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
    min: 100
  },
  type: {
    required: true,
    types: [`Куплю`, `Продам`]
  }
};
