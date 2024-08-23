export const formattedDate = (date:any)=>{
    if(!date) return
    return  new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
  }