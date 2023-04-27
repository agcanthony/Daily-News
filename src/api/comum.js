export async function getAllErrors(error) {
    let message = '';
 
    if (error.errors === undefined || error.erros === null)
       message = error;
    else {
       const totalErros = Object.keys(error.errors).length;
 
       for (var i = 0; i < totalErros; i++)
          message = message + Object.values(error.errors)[i] + "<br/>";
    }
 
    return message;
 }