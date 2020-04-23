export default ({ app }) => {
  app.i18n.pluralizationRules = {
    ru: russianPluralization
  };
}

function russianPluralization(number, choicesLength) {
  if (number === 0) {
    return 0;
  }

  const teen = number > 10 && number < 20;
  const endsWithOne = number % 10 === 1;

  if (!teen && endsWithOne) {
    return 1;
  }

  if (!teen && number % 10 >= 2 && number % 10 <= 4) {
    return 2;
  }

  return (choicesLength < 4) ? 2 : 3;
}
