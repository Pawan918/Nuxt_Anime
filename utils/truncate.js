export const truncate = (str, maxlength)=> {
  if(!str) return "Not Available"
    return (str.length > maxlength) ?
      str.slice(0, maxlength - 1) + '…' : str;
  }