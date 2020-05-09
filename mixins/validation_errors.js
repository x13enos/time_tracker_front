export default {
  computed: {
    $validationErrorMessage() {
      return (attribute, validationList) => {
        const errors = []
        if (!attribute.$dirty) return errors
        validationList.forEach((validation) => {
          !attribute[validation] && errors.push(this.$t(`validations.${toSnakeCase(validation)}`))
        })
        return errors
      }
    }
  }
}

function toSnakeCase(value) {
  return value.split(/(?=[A-Z])/).join('_').toLowerCase()
}
