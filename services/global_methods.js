class GlobalMethods {

  static isEmpty(val){
    const value = (
      val === undefined ||
      val == null ||
      val.length <= 0 ||
      Object.keys(val).length === 0 && val.constructor === Object
    )
    return value;
  }

  static systemFormatDate(date){
    return date.toLocaleString({
      month: 'numeric',
      day: 'numeric',
      year: "numeric"
    })
  }

}

export default GlobalMethods;
