/*function translate(text) {
    const vowels = 'aeiouAEIOU';
    let result = '';
    for (let char of text) {
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            if (!vowels.includes(char)) {
                result += char + 'o' + char.toLowerCase();
            } else {
                result += char;
            }
        } else {
            result += char;
        }
    }
    
    return result;
}
console.log(translate('this is fun'));       
console.log(translate('Hello World'));    */





function translate(text){
    const vowels="aeiouAEIOU";
    let result="";
    for(let char of text)
    {
        if((char>='a' && char<='z')||(char>='A' && char<='Z'))
        {
            if(!vowels.includes(char))
            {
               result+=char+'o'+char.toLowerCase(); 
            }
            else
            {
               result+=char;  
            }
        }
        else
        {
            result+=char;
        }
    }
    return result;
}
console.log(translate('this is fun'));       
console.log(translate('Hello World'));