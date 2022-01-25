const fs = require('fs');
const path = require('path');


// step 1 - read commands.json

let data = undefined;


try {

  data = fs.readFileSync(path.join(__dirname, 'commands.json'));
  data = JSON.parse(data);

} catch (error) {

  console.log(error);
  process.exit();

}

// step 2 - map fields in data

data = data.map((item) => {
  return ({
    label: item.title,
    documentation: `${item.description}\n\n# Syntax:\n${item.syntax}${item.example ? '\n\n# Example:\n' : ''}${item.example ? item.example.join('\n') : ''}`,
    insertText: item.syntax
  })
})

// step 3 - save data.json

try {
  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data));
} catch (error) {

}