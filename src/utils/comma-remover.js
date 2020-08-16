const commaRemover = (data) => {
  const numberOnly = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  
  return numberOnly
}

export default commaRemover