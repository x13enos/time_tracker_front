export default {
  data: function () {
    return {
      errorMessages: {},
      formSubmitting: false
    }
  },

  computed: {
    $formErrorMessage() {
      return (attributeName, validationList = []) => {
        const attribute = selectAttribute(this.$v, attributeName)
        const errors = []
        if (!attribute.$dirty) return errors
        validationList.forEach((validation) => {
          !attribute[validation] && errors.push(this.$t(`validations.${toSnakeCase(validation)}`))
        })
        if (this.errorMessages[toSnakeCase(attributeName)] ) {
          errors.push(...this.errorMessages[toSnakeCase(attributeName)])
        }
        return errors
      }
    },
  },

  methods: {
    async $formSubmit(request,
                      successCallback = () => {},
                      errorCallback = () => {} ) {
      this.errorMessages = {}
      this.formSubmitting = true
      try{
        const response = await request() || {}
        successCallback(response.data)
        this.formSubmitting = false
      } catch(errors) {
        this.errorMessages = errors
        errorCallback()
        this.formSubmitting = false
      }
    },

    $formErrorMessageCleanUp(attributeName) {
      if(!!this.errorMessages[toSnakeCase(attributeName)])
        this.$delete(this.errorMessages, toSnakeCase(attributeName))
    }
  }
}

function toSnakeCase(value) {
  return value.split(/(?=[A-Z])/).join('_').toLowerCase()
}

function selectAttribute(validationsObject, attributeName) {
  if(!!validationsObject.form) {
    return validationsObject.form[attributeName]
  } else {
    return validationsObject[attributeName]
  }
}
