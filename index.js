var fs = require('fs')
const csvFilePath='/Users/mateobalcorta/Desktop/Work/dataWork/20180312.csv'
const csv=require('csvtojson')
const Json2csvParser = require('json2csv').Parser;
const arrayObject = []
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    // combine csv header row and csv line to a json object
    // jsonObj.a ==> 1 or 4
    arrayObject.push(jsonObj)
})
.on('done',(error)=>{
    const fields = ['first_name', 'last_name', 'email', 'address1', 'city', 'state', 'zip', 'phone'];
    // const opts = { fields }

    try {
        const validNumber =       
             arrayObject.filter(element => {
                return element.phone !== ''
            })
        const jsonValidNumber = JSON.stringify(validNumber)
        // console.log(jsonValidNumber)
        const json2csvParser = new Json2csvParser({ fields })
        const csv = json2csvParser.parse(validNumber);
         fs.writeFile('mynewfile.csv',csv, function (err) {
                if (err) throw err;
                console.log('Saved!');
            }); 
      } catch (err) {
        console.error(err);
      }
   
    // console.log(validNumber)
    console.log(error, 'end')
})