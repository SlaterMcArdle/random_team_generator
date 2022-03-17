let students = [
    {
        name: "Niccolo Eck",
        group: null
    },
    {
        name: "Daniel Holland",
        group: null
    },
    {
        name: "Jay Moses",
        group: null
    },
    {
        name: "Carlos Castillo",
        group: null
    },
    {
        name: "Ian Nicholas",
        group: null
    },
    {
        name: "Miguel Torre",
        group: null
    },
    {
        name: "Joanna Christian",
        group: null
    },
    {
        name: "Slater McArdle",
        group: null
    },
    {
        name: "Jesse Maraya",
        group: null
    },
    {
        name: "Jo Hill",
        group: null
    },
    {
        name: "Moises G",
        group: null
    },
    {
        name: "Trent Tkachuk",
        group: null
    },
    {
        name: "Roberto Gonzalez",
        group: null
    },
    {
        name: "Antar Martin",
        group: null
    },
    {
        name: "Lee Anne Sigua",
        group: null
    },{
        name: "Christian Le",
        group: null
    },
    {
        name: "Mitchell Mudgett",
        group: null
    },{
        name: "Isaac Mercado",
        group: null
    },{
        name: "Will Pikus",
        group: null
    },
];


var available_students = JSON.parse(JSON.stringify(students));

let group_number = 1;

students.forEach ((student) => {
    if (student.group == null && available_students.length >= 3) {
        // add the group number to the student and reove them from the available students list
        let student_index = students.findIndex(element => element.name == student.name);
        if (student_index != -1) {
            students[student_index].group = group_number;
            available_students.splice(student_index, 1);
            // Do the same for the randomly selected first team mate
            let teammate_1_available_index = Math.floor(Math.random() * (available_students.length - 1));
            let teammate_1 = available_students[teammate_1_available_index];
            let teammate_1_index = students.findIndex(element => element.name == teammate_1.name);
            students[teammate_1_index].group = group_number;
            available_students.splice(teammate_1_available_index, 1);
            // The same again for the second team mate
            let teammate_2_available_index = Math.floor(Math.random() * (available_students.length - 1));
            let teammate_2 = available_students[teammate_2_available_index];
            let teammate_2_index = students.findIndex(element => element.name == teammate_2.name);
            students[teammate_2_index].group = group_number;
            available_students.splice(teammate_2_available_index, 1);
            // increment the group number
            group_number++;
        }
    } else if (student.group == null && available_students.length > 0) {
        student.group = group_number;
    }
});

var groupBy = function(data, key) { // `data` is an array of objects, `key` is the key (or property accessor) to group by
    // reduce runs this anonymous function on each element of `data` (the `item` parameter,
    // returning the `storage` parameter at the end
    return data.reduce(function(storage, item) {
      // get the first instance of the key by which we're grouping
      var group = item[key];
      
      // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
      storage[group] = storage[group] || [];
      
      // add this item to its group within `storage`
      storage[group].push(item);
      
      // return the updated storage to the reduce function, which will then loop through the next 
      return storage; 
    }, {}); // {} is the initial value of the storage
  };
  const grouped_students = groupBy(students, "group");
  console.log(grouped_students);

